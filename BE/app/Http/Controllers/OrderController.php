<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    public function postCheckout(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'required|email',
            'address' => 'required|string|max:255',
            'payment' => 'required|string',
            'variant_id' => 'required|array',
            'price' => 'required|array',
            'quantity' => 'required|array',
            'shiping' => 'nullable|numeric|min:0',
            'discount' => 'nullable|numeric|min:0',
            'subtotal' => 'required|numeric|min:0',
        ]);

        if (!Auth::check()) {
            return response()->json(['error' => 'Bạn cần đăng nhập để thanh toán.'], 401);
        }

        DB::beginTransaction();
        try {
            // Tạo đơn hàng
            $order = new Order();
            $order->code = strtoupper(Str::random(6)) . rand(100, 999);
            $order->user_id = Auth::id();
            $order->fullname = $request->name;
            $order->phone = $request->phone;
            $order->email = $request->email;
            $order->address = $request->address;
            $order->shiping = $request->shiping ?? 0;
            $order->discount = $request->discount ?? 0;
            $order->total_price = $request->subtotal;
            $order->payment = $request->payment;
            $order->payment_status = ($request->payment == 'Thanh toán khi nhận hàng') ? 'Chưa thanh toán' : 'Đã thanh toán';
            $order->save();

            // Lưu chi tiết đơn hàng
            foreach ($request->variant_id as $index => $variantId) {
                $quantity = $request->quantity[$index];
                $price = $request->price[$index];

                if ($price < 0 || $quantity < 0) {
                    return response()->json(['error' => 'Giá và số lượng không thể âm.'], 400);
                }
                OrderDetail::create([
                    'order_id' => $order->id,
                    'variant_id' => $variantId,
                    'quantity' => $quantity,
                    'price' => $price,
                    'total_price' => $price * $quantity,
                ]);
            }

            DB::commit();
            return response()->json([
                'message' => 'Đặt hàng thành công!',
                'order_code' => $order->code,
                'order_id' => $order->id
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Lỗi hệ thống: ' . $e->getMessage()], 500);
        }
    }


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
    public function adminChangeOrder($id, Request $request) {}
    public function update(Request $request, Order $order)
    {
        $user = $request->user();

        $request->validate([
            'status' => 'required|string',
            'note' => function ($attribute, $value, $fail) use ($request) {
                if ($request->status === 'Đơn hàng đã hủy' && empty($value)) {
                    $fail('Vui lòng ghi chú lý do hủy đơn hàng.');
                }
            },
        ]);
        $data = [
            'status' => $request->status,
            'note' => $request->note,
        ];
        if ($request->status === 'Đơn hàng đã hủy') {
            $notificationData = [
                'message' => 'Đơn hàng #' . $order->code . ' đã bị hủy, Lí do: ' . $request->note . '.',
                'order_code' => $order->code,
                'order_status' => 'Đã hủy',
                'details_url' => route('order.show', ['code' => $order->code]),
                'product_name' => $order->orderDetails->first()->productVariant->product->name,
                'product_image' => $order->orderDetails->first()->productVariant->product->image,
            ];
        }
        if ($request->status === 'Đã giao hàng') {
            $data['payment_status'] = 'Đã thanh toán';
        }

        try {
            // Cập nhật đơn hàng
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
}
