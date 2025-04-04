<?php


namespace App\Http\Controllers;


use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\ProductVariant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;


class OrderController extends Controller
{



    public function admin_index()
    {
        $order = Order::all();
        return response()->json($order);
    }
    public function admin_detail($id)
    {
        $order = Order::where('id', $id)->with('orderDetails')->get();
        return response()->json($order);
    }
    public function update(Request $request, Order $order)
    {
        $user = $request->user();
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
            // Trả về thông báo lỗi nếu có
            return response()->json([
                'message' => 'Có lỗi xảy ra khi cập nhật đơn hàng.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
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
            'total_price' => 'required|numeric',
            'items' => 'required|array',
            'items.*.variant_id' => 'required|exists:product_variants,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        // Begin a database transaction to ensure data consistency
        DB::beginTransaction();

        try {
            // Create a new order
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
                'discount' => $request->discount ?? 0,
                'total_price' => $request->total_price,
                'note' => $request->note ?? null,
                'user_id' => auth()->id(), // Assuming authenticated user
            ]);

            // Loop through order items and add to order_details
            foreach ($request->items as $item) {
                $variant = ProductVariant::findOrFail($item['variant_id']);
                OrderDetail::create([
                    'order_id' => $order->id,
                    'variant_id' => $variant->id,
                    'price' => $variant->price, // Assuming product_variant has price field
                    'quantity' => $item['quantity'],
                    'total_price' => $variant->price * $item['quantity'],
                ]);
            }

            // Commit the transaction
            DB::commit();

            // Nếu người dùng chọn VNPay, gọi hàm xử lý thanh toán
            if ($request->payment == 'Thanh toán qua VNPay') {
                return $this->processVNPayPayment($order);
            }

            return response()->json([
                'message' => 'Order created successfully!',
                'order' => $order
            ], 201);

        } catch (\Exception $e) {
            // Rollback if any error occurs
            DB::rollBack();

            return response()->json([
                'error' => 'Something went wrong!',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
    private function processVNPayPayment($order)
    {
        // Tham số VNPay
        $vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        $vnp_Returnurl = route('payment.vnpay.return');
        $vnp_TmnCode = env('VNPAY_TMNCODE');
        $vnp_HashSecret = env('VNPAY_HASHSECRET');

        $vnp_TxnRef = $order->code;
        $vnp_OrderInfo = 'Thanh toán đơn hàng ' . $order->code;
        $vnp_OrderType = 'billpayment';
        $vnp_Amount = $order->total_price * 100;
        $vnp_Locale = 'vn';
        $vnp_IpAddr = request()->ip();

        $inputData = [
            "vnp_Version" => "2.1.0",
            "vnp_TmnCode" => $vnp_TmnCode,
            "vnp_Amount" => $vnp_Amount,
            "vnp_Command" => "pay",
            "vnp_CreateDate" => date('YmdHis'),
            "vnp_CurrCode" => "VND",
            "vnp_IpAddr" => $vnp_IpAddr,
            "vnp_Locale" => $vnp_Locale,
            "vnp_OrderInfo" => $vnp_OrderInfo,
            "vnp_OrderType" => $vnp_OrderType,
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

// API xác nhận thanh toán VNPay (webhook)
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
            'status' => 'Đã xác nhận',
        ]);

        return redirect()->route('payment.success')->with('success', 'Thanh toán thành công');
    }

    return redirect()->route('payment.failure')->with('error', 'Thanh toán thất bại');
}



}



