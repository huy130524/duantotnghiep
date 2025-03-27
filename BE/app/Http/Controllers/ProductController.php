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
    public function ProductDetail($id)
    {
        $product = Product::with([
            'productVariants',
            'comments'
        ])->findOrFail($id);

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
            'variants' => 'nullable|array', // Mảng biến thể
            'variants.*.color_id' => 'required|exists:colors,id', // Kiểm tra color_id có tồn tại không
            'variants.*.size_id' => 'required|exists:sizes,id', // Kiểm tra size_id có tồn tại không
            'variants.*.price' => 'required|numeric|min:0',
            'variants.*.sale_price' => 'nullable|numeric|min:0',
            'variants.*.quantity' => 'required|integer|min:0',
            'variants.*.image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        // Xử lý upload ảnh sản phẩm chính
        if ($request->hasFile('image')) {
            try {
                $imagePath = $request->file('image')->store('uploads/products', 'public');
                $data['image'] = $imagePath;
            } catch (\Exception $e) {
                return response()->json(["error" => "Lỗi upload ảnh sản phẩm: " . $e->getMessage()], 500);
            }
        }

        DB::beginTransaction();
        try {
            // Tạo sản phẩm
            $product = Product::create($data);

            // Xử lý biến thể nếu có
            if (!empty($data['variants'])) {
                foreach ($data['variants'] as $variant) {
                    // Xử lý ảnh biến thể (nếu có)
                    if (!empty($variant['image']) && $request->hasFile("variants.{$variant['index']}.image")) {
                        try {
                            $variant['image'] = $request->file("variants.{$variant['index']}.image")->store('uploads/variants', 'public');
                        } catch (\Exception $e) {
                            return response()->json(["error" => "Lỗi upload ảnh biến thể: " . $e->getMessage()], 500);
                        }
                    }

                    // Thêm biến thể vào sản phẩm
                    $product->productVariants()->create([
                        'color_id' => $variant['color_id'],
                        'size_id' => $variant['size_id'],
                        'price' => $variant['price'],
                        'sale_price' => $variant['sale_price'] ?? null,
                        'quantity' => $variant['quantity'],
                        'image' => $variant['image'] ?? null,
                    ]);
                }
            }

            DB::commit();
            return response()->json(["success" => "Thêm sản phẩm và biến thể thành công"]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(["error" => "Lỗi khi lưu vào database: " . $e->getMessage()], 500);
        }
    }


    public function update(Request $request, $product_id)
{
    // Validate dữ liệu
    $data = $request->validate([
        'code' => 'required|unique:products,code,' . $product_id,
        'name' => 'required|max:255',
        'slug' => 'required|unique:products,slug,' . $product_id,
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        'description' => 'nullable|string',
        'category_id' => 'required|exists:categories,id',
        'brand_id' => 'required|exists:brands,id',
        'variants' => 'nullable|array',
        'variants.*.id' => 'nullable|exists:product_variants,id', // ID biến thể (nếu có)
        'variants.*.color_id' => 'required|exists:colors,id',
        'variants.*.size_id' => 'required|exists:sizes,id',
        'variants.*.price' => 'required|numeric|min:0',
        'variants.*.sale_price' => 'nullable|numeric|min:0',
        'variants.*.quantity' => 'required|integer|min:0',
        'variants.*.image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
    ]);

    // Tìm sản phẩm cần cập nhật
    $product = Product::find($product_id);
    if (!$product) {
        return response()->json(['status' => 0, "message" => "Product does not exist."]);
    }

    // Xử lý upload ảnh sản phẩm chính (nếu có)
    if ($request->hasFile('image')) {
        try {
            $imagePath = $request->file('image')->store('uploads/products', 'public');
            $data['image'] = $imagePath;
        } catch (\Exception $e) {
            return response()->json(["error" => "Lỗi upload ảnh sản phẩm: " . $e->getMessage()], 500);
        }
    }

    DB::beginTransaction();
    try {
        // Cập nhật thông tin sản phẩm
        $product->update($data);

        // Lưu danh sách ID biến thể từ request
        $variantIds = collect($data['variants'])->pluck('id')->filter()->toArray();

        // Xóa các biến thể không còn trong danh sách
        $product->productVariants()->whereNotIn('id', $variantIds)->delete();

        // Xử lý cập nhật hoặc thêm mới biến thể
        foreach ($data['variants'] as $variant) {
            // Nếu biến thể có ID, cập nhật
            if (!empty($variant['id'])) {
                $existingVariant = ProductVariant::find($variant['id']);
                if ($existingVariant) {
                    $existingVariant->update($variant);
                }
            } else {
                // Nếu không có ID, tạo mới biến thể
                $product->productVariants()->create($variant);
            }

            // Xử lý upload ảnh biến thể (nếu có)
            if (!empty($variant['image']) && $request->hasFile("variants.{$variant['index']}.image")) {
                try {
                    $variant['image'] = $request->file("variants.{$variant['index']}.image")->store('uploads/variants', 'public');
                    ProductVariant::where('id', $variant['id'])->update(['image' => $variant['image']]);
                } catch (\Exception $e) {
                    return response()->json(["error" => "Lỗi upload ảnh biến thể: " . $e->getMessage()], 500);
                }
            }
        }

        DB::commit();
        return response()->json(['status' => 1, "message" => "Cập nhật sản phẩm và biến thể thành công."]);
    } catch (\Exception $e) {
        DB::rollBack();
        return response()->json(["error" => "Lỗi khi cập nhật database: " . $e->getMessage()], 500);
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

    public function getProductsByCategory($id)
    {
        $products = Product::where('category_id', $id)->get();
        $category = Category::where('id',$id)->first();
        if ($products->isEmpty()) {
            return response()->json([
                'message' => 'Không có sản phẩm nào trong danh mục này.'
            ], 404);
        }

        return response()->json([
            'category' => $category->name,
            'products' => $products
        ], 200);
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
    public function filterProducts(Request $request)
{
    $query = Product::query();

    // Lọc theo thời gian tạo (mới nhất, cũ nhất)
    if ($request->has('sort_by')) {
        switch ($request->sort_by) {
            case 'latest':
                $query->orderBy('created_at', 'desc');
                break;
            case 'oldest':
                $query->orderBy('created_at', 'asc');
                break;
            case 'price_asc':
                $query->join('product_variants', 'products.id', '=', 'product_variants.product_id')
                      ->orderBy('product_variants.price', 'asc')
                      ->select('products.*');
                break;
            case 'price_desc':
                $query->join('product_variants', 'products.id', '=', 'product_variants.product_id')
                      ->orderBy('product_variants.price', 'desc')
                      ->select('products.*');
                break;
        }
    }
    $products = $query->paginate(10);

    return response()->json([
        'success' => true,
        'data' => $products
    ]);
}


}
