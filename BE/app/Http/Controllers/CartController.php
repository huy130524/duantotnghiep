<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->user()->id;
        $cartItems = Cart::where('user_id', $userId)->with(['product', 'productVariant'])->get();
        return response()->json([
            'cart' => $cartItems
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'product_variant_id' => 'nullable|exists:product_variants,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $userId = $request->user()->id;

        $cartItem = Cart::where('user_id', $userId)
                        ->where('product_id', $request->product_id)
                        ->where('product_variant_id', $request->product_variant_id)
                        ->first();

        if ($cartItem) {
            $cartItem->quantity += $request->quantity;
            $cartItem->save();
        } else {
            Cart::create([
                'user_id' => $userId,
                'product_id' => $request->product_id,
                'product_variant_id' => $request->product_variant_id,
                'quantity' => $request->quantity,
            ]);
        }

        return response()->json([
            'message' => 'Sản phẩm đã được thêm vào giỏ hàng',
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cartItem = Cart::where('id', $id)->where('user_id', $request->user()->id)->first();
        if (!$cartItem) {
            return response()->json(['success' => false, 'message' => 'Không tìm thấy sản phẩm trong giỏ hàng'], 404);
        }

        $cartItem->update(['quantity' => $request->quantity]);

        return response()->json([
            'message' => 'Cập nhật số lượng thành công',
            'data' => $cartItem
        ]);
    }

    public function destroy(Request $request, $id)
    {
        $cartItem = Cart::where('id', $id)->where('user_id', $request->user()->id)->first();
        if (!$cartItem) {
            return response()->json(['success' => false, 'message' => 'Không tìm thấy sản phẩm trong giỏ hàng'], 404);
        }

        $cartItem->delete();

        return response()->json([
            'success' => true,
            'message' => 'Sản phẩm đã được xóa khỏi giỏ hàng'
        ]);
    }
}
