<?php


namespace App\Http\Controllers;


use App\Http\Controllers\Controller;
use App\Mail\OrderCreatedMail;
use App\Models\BankAccount;
use App\Models\Cart;
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
    public function admin_index()
    {
        $orders = Order::latest()
        ->with([
            'orderDetails.variant.product',
            'orderDetails.variant.color',
            'orderDetails.variant.size',
        ])
        ->get();
        return response()->json($orders);
    }
    

    public function admin_detail($id)
    {
        $order = Order::where('id', $id)
        ->with([
            'orderDetails.variant.product',
            'orderDetails.variant.color',
            'orderDetails.variant.size',
        ])
        
            ->first(); 
    
        if(empty($order)){
            return response()->json(["message"=>"Không có đơn hàng nào"]);
        }
        return response()->json($order);
    }

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


    public function updateStatus(Request $request, $id)
    {
        $order = Order::findOrFail($id);
   
        if (in_array($order->status, ['Đã giao hàng', 'Đơn hàng đã hủy'])) {
            return response()->json([
                'message' => 'Không thể thay đổi trạng thái của đơn hàng đã giao hoặc đã hủy!',
            ], 400);
        }
   
        $request->validate([
            'status' => 'nullable|in:Chờ xác nhận,Đã xác nhận,Đang chuẩn bị hàng,Đang giao hàng,Đã giao hàng,Đơn hàng đã hủy',
            'payment_status' => 'nullable|in:Chưa thanh toán,Đã thanh toán',
        ]);
   
        if ($request->has('status')) {
            if ($request->input('status') === 'Đã giao hàng') {
                $order->payment_status = 'Đã thanh toán';
            }
            $order->status = $request->input('status');
        }
   
        if ($request->has('payment_status')) {
            $order->payment_status = $request->input('payment_status');
        }
   
        $order->save();
   
        return response()->json([
            'message' => 'Cập nhật thành công!',
            'order' => $order
        ]);
    }
   
    public function cancelOrder(Request $request, $id)
    {
        $order = Order::findOrFail($id);
        if ($order->status === 'Chờ xác nhận') {
            foreach ($order->orderDetails as $orderDetail) {
                $productVariant = $orderDetail->variant;
                $productVariant->quantity += $orderDetail->quantity;
                $productVariant->save();
            }
            $order->status = 'Đơn hàng đã hủy';
            $order->save();
            return response()->json([
                'message' => 'Đơn hàng đã hủy thành công và số lượng sản phẩm đã được hoàn lại!',
                'order' => $order
            ]);
        }
        return response()->json([
            'message' => 'Không thể hủy đơn hàng vì trạng thái không cho phép!',
        ], 400);
    }


    public function checkVC(Request $request)
    {
        $request->validate([
            'code' => 'required|string',
            'amount' => 'required|numeric'
        ]);


        $coupon = Coupon::where('code', $request->code)->first();


        if (!$coupon || !$coupon->is_active) {
            return response()->json(['message' => 'Mã giảm giá không hợp lệ.'], 400);
        }
       
        if ($coupon->start_date > now()) {
            return response()->json(['message' => 'Mã giảm giá chưa bắt đầu.'], 400);
        }
       
        if ($coupon->end_date < now()) {
            return response()->json(['message' => 'Mã giảm giá đã hết hạn.'], 400);
        }
        if ($request->amount < $coupon->minimum_amount) {
            return response()->json(['message' => 'Số tiền thanh toán chưa đủ để áp dụng mã giảm giá.'], 400);
        }
        return response()->json([
            'message' => 'Mã hợp lệ',
            'discount_type' => $coupon->discount_type,
            'discount' => $coupon->discount,
            'minimum_amount' => $coupon->minimum_amount,
            'maximum_amount' => $coupon->maximum_amount,
        ]);
    }
   
    public function getCheckout(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'voucher_code' => 'nullable|string'
        ]);
   
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
   
        $userId = auth()->id();
   
        $cartItems = Cart::where('user_id', $userId)
            ->with(['productVariant.product'])
            ->get();
   
        if ($cartItems->isEmpty()) {
            return response()->json(['message' => 'Không tìm thấy sản phẩm trong giỏ hàng.'], 400);
        }
   
        $totalPrice = 0;
        $discount = 0;
        $totalQuantity = 0;
        $items = [];
   
        foreach ($cartItems as $item) {
            $variant = $item->productVariant;
            $product = $variant->product;
   
            $items[] = [
                'image'=> $product->image,
                'product_name' => $product->name . ' - Size: ' . ($variant->size->name ?? 'N/A') . ' - Màu: ' . ($variant->color->name ?? 'N/A'),
                'price' => $variant->price,
                'quantity' => $item->quantity,
                'total_price' => $variant->price * $item->quantity,
            ];
   
            $totalPrice += $variant->price * $item->quantity;
            $totalQuantity += $item->quantity;
        }
   
        if ($request->filled('voucher_code')) {
            $voucher = Coupon::where('code', $request->voucher_code)
                ->where('is_active', true)
                ->where('start_date', '<=', now())
                ->where('end_date', '>=', now())
                ->first();
   
            if ($voucher) {
                if ($voucher->discount_type === 'percentage') {
                    $discount = $totalPrice * ($voucher->discount / 100);
                } elseif ($voucher->discount_type === 'fixed') {
                    $discount = $voucher->discount;
                }
                $discount = min($discount, $totalPrice);
            } else {
                return response()->json(['message' => 'Mã voucher không hợp lệ hoặc đã hết hạn.'], 400);
            }
        }
   
        $totalPriceAfterDiscount = $totalPrice - $discount;
   
        return response()->json([
            'items' => $items,
            'discount' => $discount,
            'price_before_apply' => $totalPrice,
            'total_price_checkout' => $totalPriceAfterDiscount,
            'total_quantity' => $totalQuantity,
        ]);
    }


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'fullname' => 'required|string|max:50',
            'phone' => 'required|string|max:15',
            'address' => 'required|string|max:199',
            'email' => 'required|string|email|max:199',
            'payment' => 'required|in:Thanh toán khi nhận hàng,Thanh toán bằng thẻ,Thanh toán qua VNPay',
            'discount' => 'nullable|numeric|min:0',
            'total_price' => 'required|numeric|min:0',
            'items' => 'required|array',
        ]);
   
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }
   
        DB::beginTransaction();
        try {
            $orderCode = 'ORD-' . Str::upper(Str::random(8));
   
            $order = Order::create([
                'code' => $orderCode,
                'fullname' => $request->fullname,
                'phone' => $request->phone,
                'address' => $request->address,
                'email' => $request->email,
                'payment' => $request->payment,
                'status' => 'Chờ xác nhận',
                'payment_status' => 'Chưa thanh toán',
                'discount' => $request->discount ?? 0,
                'voucher_code' => $request->voucher_code ?? null,
                'total_price' => $request->total_price,
                'user_id' => auth()->id(),
            ]);
   
            foreach ($request->items as $item) {
                OrderDetail::create([
                    'order_id' => $order->id,
                    'variant_id' => $item['variant_id'],
                    'price' => $item['price'],
                    'quantity' => $item['quantity'],
                    'total_price' => $item['total_price'],
                ]);
            }
   
            if ($request->payment == 'Thanh toán qua VNPay') {
                $qrCodeData = $this->VNPAY($request, $order);
                DB::commit();
   
                return response()->json([
                    'message' => 'Đặt hàng thành công!',
                    'order' => $order,
                    'payment_url' => $qrCodeData['payment_url'],
                    'order_code' => $qrCodeData['order_code'],
                ], 201);
            }
   
          Cart::where('user_id', $order->user_id)->forceDelete();
            DB::commit();
            return response()->json([
                'message' => 'Đặt hàng thành công!',
                'order' => $order,
            ], 201);
   
        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error('Order Store Error: ' . $e->getMessage(), ['trace' => $e->getTraceAsString()]);
            return response()->json(['error' => 'Có lỗi xảy ra.'], 500);
        }
    }
   


 
    public function VNPAY(Request $request, Order $order)
    {
        $vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        $vnp_Returnurl = " http://localhost:5173/vnpay-return";
        $vnp_TmnCode = "OXAW03IW";
        $vnp_HashSecret = "0GXPKQFPJA8NE2VE2LO0WYO575TFRTAZ";
       
        $vnp_TxnRef = $order->code;
        $vnp_OrderInfo = "Thanh toán hóa đơn";
        $vnp_OrderType = "Bee Sneaker";
        $vnp_Amount = $order->total_price * 100;
        $vnp_Locale = "vn";
        $vnp_BankCode = "NCB";
        $vnp_IpAddr = $request->ip();


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
            "vnp_TxnRef" => $vnp_TxnRef
        ];
       
        if (!empty($vnp_BankCode)) {
            $inputData['vnp_BankCode'] = $vnp_BankCode;
        }
        ksort($inputData);
        $query = "";
        $hashdata = "";
        $i = 0;
        foreach ($inputData as $key => $value) {
            $query .= urlencode($key) . "=" . urlencode($value) . '&';
            $hashdata .= ($i++ ? '&' : '') . urlencode($key) . "=" . urlencode($value);
        }
   
        $vnpSecureHash = hash_hmac('sha512', $hashdata, $vnp_HashSecret);
       
        $paymentUrl = $vnp_Url . '?' . $query . 'vnp_SecureHash=' . $vnpSecureHash;
   
        return [
            'payment_url' => $paymentUrl,
            'order_code' => $order->code
        ];
    }
   
    public function vnpayReturn(Request $request)
    {
        $vnp_ResponseCode = $request->input('vnp_ResponseCode');
        $orderCode = $request->input('vnp_TxnRef');


        $order = Order::where('code', $orderCode)->first();
        if (!$order) {
            return response()->json([
                'status' => false,
                'message' => 'Đơn hàng không tồn tại.'
            ], 404);
        }


        if ($vnp_ResponseCode == '00') {
            $order->payment_status = 'Đã thanh toán';  
            $order->status = 'Đã xác nhận';  
            $order->save();
          Cart::where('user_id', $order->user_id)->forceDelete();
            return response()->json([
                'status' => true,
                'message' => 'Thanh toán thành công!',
                'order_code' => $order->code
            ], 200);  
        } else {
            $order->payment_status = 'Thanh toán thất bại';
            $order->status = 'Đơn hàng đã hủy';
            $order->save();
            Cart::where('user_id', $order->user_id)->forceDelete();
            return response()->json([
                'status' => false,
                'message' => 'Thanh toán bị hủy. Đơn hàng chưa được xử lý.',
                'order_code' => $order->code
            ], 400);  
        }
    }

    public function getOrderUser(Request $request){
        $user = $request->user(); 
        $order = Order::where('user_id', $user->id)
        ->orderBy('created_at', 'desc')
        ->with([
            'orderDetails.variant.product',
            'orderDetails.variant.color',
            'orderDetails.variant.size',
        ])
        
        ->get(); 

    if(empty($order)){
        return response()->json(["message"=>"Không có đơn hàng nào"]);
    }

    return response()->json($order);
    }
    public function getOrder(Request $request, $code){
        $user = $request->user(); 
        $order = Order::where('user_id', $user->id)
        ->where('code', $code)
        ->with([
            'orderDetails.variant.product',
            'orderDetails.variant.color',
            'orderDetails.variant.size',
        ])
        
        ->first(); 

    if(empty($order)){
        return response()->json(["message"=>"Không có đơn hàng nào"]);
    }
    return response()->json($order);
    }
    
   
   
}