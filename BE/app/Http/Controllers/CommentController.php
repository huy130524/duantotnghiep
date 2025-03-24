<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Order;
use App\Models\ProductVariant;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function index()
    {
        $comments = Comment::where('status', 'approved')
            ->with(['user', 'product'])
            ->paginate(9);

        return response()->json([
            'success' => true,
            'data' => $comments
        ]);
    }
    public function send(Request $request, $order_id)
    {
        $order = Order::where('id', $order_id)->with('orderDetails')->first();
        if (!$order) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy đơn hàng.'
            ], 404);
        }

        if ($order->status !== 'Đã giao hàng') {
            return response()->json([
                'success' => false,
                'message' => 'Chỉ có thể đánh giá khi đơn hàng đã được giao thành công.'
            ], 400);
        }
        $user = $request->user();
        Comment::create([
            'product_id' => $request->product_id,
            'user_id' => $user->id,
            'content' => $request->content,
            'rating' => $request->rating,
        ]);

        return response()->json([
            "message" => "Đánh giá thành công"
        ]);
    }
    public function detail($id)
    {
        $cmt = Comment::where('id',$id)->with('product','user')->first();
        return response()->json($cmt);
    }

}
