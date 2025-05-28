<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Http\Request;

class CartController extends Controller
{
   public function index(Request $request)
{
    $userId = $request->user()->id;

    $cartItems = Cart::where('user_id', $userId)
        ->whereHas('product', function ($query) {
            $query->whereNull('deleted_at');
        })
        ->with([
            'product' => function ($query) {
                $query->whereNull('deleted_at');
            },
            'productVariant.size',
            'productVariant.color'
        ])
        ->get();

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
        $productId = $request->product_id;
        $variantId = $request->product_variant_id;
        $quantityToAdd = $request->quantity;

        // Lấy số lượng tồn kho từ ProductVariant nếu có, nếu không thì từ Product
        if ($variantId) {
            $variant = ProductVariant::findOrFail($variantId);
            $availableQuantity = $variant->quantity;
        } else {
            $product = Product::findOrFail($productId);
            $availableQuantity = $product->quantity;
        }

        // Lấy item trong giỏ hàng nếu đã tồn tại
        $cartItem = Cart::where('user_id', $userId)
                        ->where('product_id', $productId)
                        ->where('product_variant_id', $variantId)
                        ->first();

        $currentQuantityInCart = $cartItem ? $cartItem->quantity : 0;

        // Kiểm tra số lượng tồn kho
        if ($currentQuantityInCart + $quantityToAdd > $availableQuantity) {
            return response()->json([
                'message' => 'Số lượng yêu cầu vượt quá số lượng tồn kho hiện tại.',
            ], 422);
        }

        // Cập nhật hoặc tạo mới item trong giỏ hàng
        if ($cartItem) {
            $cartItem->quantity += $quantityToAdd;
            $cartItem->save();
        } else {
            Cart::create([
                'user_id' => $userId,
                'product_id' => $productId,
                'product_variant_id' => $variantId,
                'quantity' => $quantityToAdd,
            ]);
        }

        return response()->json([
            'message' => 'Sản phẩm đã được thêm vào giỏ hàng.',
        ]);
    }


    public function update(Request $request, $id)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cartItem = Cart::where('id', $id)
                        ->where('user_id', $request->user()->id)
                        ->first();

        if (!$cartItem) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy sản phẩm trong giỏ hàng'
            ], 404);
        }

        // Kiểm tra tồn kho
        if ($cartItem->product_variant_id) {
            $variant = ProductVariant::find($cartItem->product_variant_id);
            if (!$variant) {
                return response()->json([
                    'success' => false,
                    'message' => 'Biến thể sản phẩm không tồn tại'
                ], 404);
            }
            $availableQuantity = $variant->quantity;
        } else {
            $product = Product::find($cartItem->product_id);
            if (!$product) {
                return response()->json([
                    'success' => false,
                    'message' => 'Sản phẩm không tồn tại'
                ], 404);
            }
            $availableQuantity = $product->quantity;
        }

        // So sánh với số lượng tồn kho
        if ($request->quantity > $availableQuantity) {
            return response()->json([
                'success' => false,
                'message' => 'Số lượng yêu cầu vượt quá tồn kho hiện tại'
            ], 422);
        }

        // Cập nhật số lượng
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
