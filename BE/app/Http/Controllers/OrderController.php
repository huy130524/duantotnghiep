<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Mail\OrderCreatedMail;
use App\Models\Coupon;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\ProductVariant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    // List all orders for admin
    public function admin_index()
    {
        $orders = Order::all();
        return response()->json($orders);
    }

    // View order details for admin
    public function admin_detail($id)
    {
        $order = Order::where('id', $id)->with('orderDetails')->get();
        return response()->json($order);
    }

    // Update order status
    public function update(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'required|string',
        ]);

        $data = ['status' => $request->status];

        if ($request->status === 'Đơn hàng đã hủy') {
            $request->validate([
                'note' => 'required|string',
            ]);
            $data['note'] = $request->note;

            $notificationData = [
                'message' => 'Đơn hàng #' . $order->code . ' đã bị hủy, Lí do: ' . $request->note . '.',
                'order_code' => $order->code,
                'order_status' => 'Đã hủy',
                'product_name' => $order->orderDetails->first()->productVariant->product->name,
                'product_image' => $order->orderDetails->first()->productVariant->product->image,
            ];
        }

        if ($request->status === 'Đã giao hàng') {
            $data['payment_status'] = 'Đã thanh toán';
        }

        try {
            $order->update($data);
            return response()->json([
                'message' => 'Cập nhật đơn hàng thành công!',
                'order' => $order,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Có lỗi xảy ra khi cập nhật đơn hàng.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    // Create a new order
    public function store(Request $request)
    {
        // Validate input
        $validator = Validator::make($request->all(), [
            'fullname' => 'required|string|max:50',
            'phone' => 'required|string|max:15',
            'address' => 'required|string|max:199',
            'email' => 'required|string|email|max:199',
            'payment' => 'required|in:Thanh toán khi nhận hàng,Thanh toán bằng thẻ,Thanh toán qua VNPay',
            'payment_status' => 'required|in:Chưa thanh toán,Đã thanh toán',
            'items' => 'required|array',
            'items.*.variant_id' => 'required|exists:product_variants,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        DB::beginTransaction();
        $voucher = null;
        $discountAmount = 0;
        $totalPrice = 0;

        // Calculate total order value before discount
        foreach ($request->items as $item) {
            $variant = ProductVariant::findOrFail($item['variant_id']);
            $totalPrice += $variant->price * $item['quantity'];
        }

        // Check for voucher if available
        if ($request->voucher_code) {
            $voucher = Coupon::where('code', $request->voucher_code)->first();

            // Validate voucher
            if (!$voucher || $voucher->usage_limit <= 0) {
                return response()->json(['errors' => ['voucher_code' => 'Mã voucher không hợp lệ hoặc đã hết hạn']], 400);
            }

            // Calculate discount based on voucher type
            if ($voucher->discount_type === 'fixed') {
                $discountAmount = min($voucher->discount, $voucher->maximum_amount);
            } elseif ($voucher->discount_type === 'percentage') {
                $discountAmount = ($totalPrice * $voucher->discount) / 100;
                $discountAmount = min($discountAmount, $voucher->maximum_amount);
            }

            if ($discountAmount < $voucher->minimum_amount) {
                return response()->json(['errors' => ['voucher_code' => 'Mã voucher không đủ điều kiện áp dụng. Tổng tiền đơn hàng phải lớn hơn hoặc bằng ' . $voucher->minimum_amount]], 400);
            }

            // Decrease voucher usage limit
            $voucher->decrement('usage_limit');
        }

        try {
            // Create the order
            $order = Order::create([
                'code' => 'ORD-' . strtoupper(uniqid()),
                'fullname' => $request->fullname,
                'phone' => $request->phone,
                'address' => $request->address,
                'email' => $request->email,
                'payment' => $request->payment,
                'status' => 'Chờ xác nhận',
                'payment_status' => $request->payment_status,
                'shiping' => $request->shiping ?? 0,
                'discount' => $discountAmount,
                'total_price' => $totalPrice - $discountAmount,
                'note' => $request->note ?? null,
                'user_id' => auth()->id(),
            ]);

            // Add order details
            foreach ($request->items as $item) {
                $variant = ProductVariant::findOrFail($item['variant_id']);
                OrderDetail::create([
                    'order_id' => $order->id,
                    'variant_id' => $variant->id,
                    'price' => $variant->price,
                    'quantity' => $item['quantity'],
                    'total_price' => $variant->price * $item['quantity'],
                ]);
            }

            // Commit transaction
            DB::commit();
            $order->load(['orderDetails.productVariant.product']);
            Mail::to($order->email)->send(new OrderCreatedMail($order));

            // If payment is via VNPay, process VNPay payment
            if ($request->payment == 'Thanh toán qua VNPay') {
                return $this->processVNPayPayment($order);
            }

            return response()->json([
                'message' => 'Order created successfully!',
                'order' => $order
            ], 201);

        } catch (\Exception $e) {
            // Rollback if error occurs
            DB::rollBack();

            return response()->json([
                'error' => 'Something went wrong!',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    // Process VNPay payment
    private function processVNPayPayment($order)
    {
        $vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        $vnp_Returnurl = route('payment.vnpay.return');
        $vnp_TmnCode = env('VNPAY_TMNCODE');
        $vnp_HashSecret = env('VNPAY_HASHSECRET');

        $vnp_TxnRef = $order->code;
        $vnp_OrderInfo = 'Thanh toán đơn hàng ' . $order->code;
        $vnp_Amount = $order->total_price * 100;
        $vnp_IpAddr = request()->ip();

        $inputData = [
            "vnp_Version" => "2.1.0",
            "vnp_TmnCode" => $vnp_TmnCode,
            "vnp_Amount" => $vnp_Amount,
            "vnp_Command" => "pay",
            "vnp_CreateDate" => date('YmdHis'),
            "vnp_CurrCode" => "VND",
            "vnp_IpAddr" => $vnp_IpAddr,
            "vnp_Locale" => 'vn',
            "vnp_OrderInfo" => $vnp_OrderInfo,
            "vnp_OrderType" => 'billpayment',
            "vnp_ReturnUrl" => $vnp_Returnurl,
            "vnp_TxnRef" => $vnp_TxnRef,
        ];

        ksort($inputData);
        $query = "";
        $i = 0;
        $hashdata = "";
        foreach ($inputData as $key => $value) {
            if ($i == 1) {
                $hashdata .= '&' . urlencode($key) . "=" . urlencode($value);
            } else {
                $hashdata .= urlencode($key) . "=" . urlencode($value);
                $i = 1;
            }
            $query .= urlencode($key) . "=" . urlencode($value) . '&';
        }

        $vnp_Url = $vnp_Url . "?" . $query;
        if (isset($vnp_HashSecret)) {
            $vnpSecureHash = hash_hmac('sha512', $hashdata, $vnp_HashSecret);
            $vnp_Url .= 'vnp_SecureHash=' . $vnpSecureHash;
        }

        return response()->json([
            'success' => true,
            'message' => 'Chuyển hướng đến VNPay',
            'payment_url' => $vnp_Url,
        ]);
    }

    // API to handle VNPay return (webhook)
    public function vnpayReturn(Request $request)
    {
        $vnp_ResponseCode = $request->input('vnp_ResponseCode');
        $vnp_TxnRef = $request->input('vnp_TxnRef');

        $order = Order::where('code', $vnp_TxnRef)->first();

        if (!$order) {
            return redirect()->route('payment.failure')->with('error', 'Đơn hàng không tồn tại');
        }

        if ($vnp_ResponseCode == '00') {
            $order->update([
                'payment_status' => 'Đã thanh toán',
                'status' => 'Chờ giao hàng',
            ]);
            return redirect()->route('payment.success')->with('message', 'Thanh toán thành công!');
        } else {
            return redirect()->route('payment.failure')->with('error', 'Thanh toán thất bại!');
        }
    }
}
