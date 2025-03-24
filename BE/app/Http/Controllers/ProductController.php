<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    public function index(){
        $products = Product::all();
        return response()->json($products);
    }
    public function ProductDetail($id){
        $product = Product::findOrFail($id);
        return response()->json($product);
    }
    public function store(Request $request)
    {
        $data = $request->validate([
            'code' => 'required|unique:products,code',
            'name' => 'required|max:255',
            'slug' => 'required|unique:products,slug',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'description' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
            'brand_id' => 'required|exists:brands,id',
            'variants' => 'nullable|array',
            'variants.*.color_id' => 'required|exists:colors,id',
            'variants.*.size_id' => 'required|exists:sizes,id',
            'variants.*.price' => 'required|numeric|min:0',
            'variants.*.sale_price' => 'nullable|numeric|min:0',
            'variants.*.quantity' => 'required|integer|min:0',
            'variants.*.image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        DB::beginTransaction();
        try {
            $product = Product::create($data);
            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('uploads/products', 'public');
                $product->update(['image' => $imagePath]);
            }
            if (!empty($request->variants)) {
                foreach ($request->variants as $variant) {
                    $variantData = [
                        'product_id' => $product->id,
                        'color_id' => $variant['color_id'],
                        'size_id' => $variant['size_id'],
                        'price' => $variant['price'],
                        'sale_price' => $variant['sale_price'] ?? null,
                        'quantity' => $variant['quantity'],
                    ];
                    if (!empty($variant['image'])) {
                        $variantData['image'] = $variant['image']->store('uploads/variants', 'public');
                    }

                    ProductVariant::create($variantData);
                }
            }

            DB::commit();
            return response()->json(["success" => "Thêm sản phẩm và biến thể thành công"], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(["error" => "Lỗi: " . $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'code' => 'required|unique:products,code,' . $id,
            'name' => 'required|max:255',
            'slug' => 'required|unique:products,slug,' . $id,
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'description' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
            'brand_id' => 'required|exists:brands,id',
            'variants' => 'nullable|array',
            'variants.*.id' => 'nullable|exists:product_variants,id',
            'variants.*.color_id' => 'required|exists:colors,id',
            'variants.*.size_id' => 'required|exists:sizes,id',
            'variants.*.price' => 'required|numeric|min:0',
            'variants.*.sale_price' => 'nullable|numeric|min:0',
            'variants.*.quantity' => 'required|integer|min:0',
            'variants.*.image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        DB::beginTransaction();
        try {
            $product = Product::findOrFail($id);
            $product->update($data);
            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('uploads/products', 'public');
                $product->update(['image' => $imagePath]);
            }
            if (!empty($request->variants)) {
                foreach ($request->variants as $variant) {
                    $variantData = [
                        'product_id' => $product->id,
                        'color_id' => $variant['color_id'],
                        'size_id' => $variant['size_id'],
                        'price' => $variant['price'],
                        'sale_price' => $variant['sale_price'] ?? null,
                        'quantity' => $variant['quantity'],
                    ];
                    if (!empty($variant['image'])) {
                        $variantData['image'] = $variant['image']->store('uploads/variants', 'public');
                    }

                    if (!empty($variant['id'])) {
                        ProductVariant::where('id', $variant['id'])->update($variantData);
                    } else {
                        ProductVariant::create($variantData);
                    }
                }
            }

            DB::commit();
            return response()->json(["success" => "Cập nhật sản phẩm và biến thể thành công"], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(["error" => "Lỗi: " . $e->getMessage()], 500);
        }
    }
    public function getByCategory($category_id)
    {
        $category = Category::find($category_id);
        if (!$category) {
            return response()->json(['message' => 'Danh mục không tồn tại'], 404);
        }
        $products = Product::where('category_id', $category_id)->paginate(10);
        return response()->json([
            'category' => $category->name,
            'products' => $products,
        ]);
    }
    public function filterBySize($size_id)
    {
        $products = Product::whereHas('productVariants', function ($query) use ($size_id) {
            $query->where('size_id', $size_id);
        })->with(['productVariants' => function ($query) use ($size_id) {
            $query->where('size_id', $size_id);
        }])->paginate(10);

        if ($products->isEmpty()) {
            return response()->json([
                'message' => 'Không có sản phẩm nào với size này.'
            ], 404);
        }

        return response()->json($products);
    }
    public function search(Request $request)
    {
        $query = Product::query();

        // Tìm kiếm theo tên sản phẩm
        if ($request->has('name')) {
            $query->where('name', 'LIKE', '%' . $request->name . '%');
        }
        // Tìm kiếm theo khoảng giá
        if ($request->has('min_price') || $request->has('max_price')) {
            $query->whereHas('productVariants', function ($q) use ($request) {
                if ($request->has('min_price')) {
                    $q->where('price', '>=', $request->min_price);
                }
                if ($request->has('max_price')) {
                    $q->where('price', '<=', $request->max_price);
                }
            });
        }
        // Phân trang kết quả
        $products = $query->paginate(10);

        return response()->json([
            'success' => true,
            'data' => $products
        ]);
    }

}
