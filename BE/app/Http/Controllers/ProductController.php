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
        $products = Product::with([
            'productVariants',
            'comments',
            'brand',
            'category',

        ])->get();
        return response()->json($products);
    }
    public function ProductDetail($id)
    {
        $product = Product::with([
            'productVariants',
            'comments',
            'brand',
            'category',

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
            'variants' => 'nullable|array',
            'variants.*.color_id' => 'required|exists:colors,id',
            'variants.*.size_id' => 'required|exists:sizes,id',
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
                foreach ($data['variants'] as $index => $variant) {

                    // Xử lý ảnh biến thể nếu có
                    if ($request->hasFile("variants.$index.image")) {
                        try {
                            $variantImagePath = $request->file("variants.$index.image")->store('uploads/variants', 'public');
                            $variant['image'] = $variantImagePath;
                        } catch (\Exception $e) {
                            DB::rollBack();
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
        'variants.*.id' => 'nullable|exists:product_variants,id',
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

    // Xử lý ảnh sản phẩm chính
    if ($request->hasFile('image')) {
        try {
            $data['image'] = $request->file('image')->store('uploads/products', 'public');
        } catch (\Exception $e) {
            return response()->json(["error" => "Lỗi upload ảnh sản phẩm: " . $e->getMessage()], 500);
        }
    }

    DB::beginTransaction();
    try {
        // Cập nhật sản phẩm
        $product->update($data);

        // Danh sách ID các biến thể hiện có trong request (nếu có)
        $variantIds = collect($data['variants'] ?? [])->pluck('id')->filter()->toArray();
        $product->productVariants()->whereNotIn('id', $variantIds)->delete();

        // Lặp qua từng biến thể
        foreach ($data['variants'] ?? [] as $i => $variant) {
            $variantData = $variant;

            // Xử lý ảnh biến thể nếu có
            if ($request->hasFile("variants.$i.image")) {
                try {
                    $variantImagePath = $request->file("variants.$i.image")->store('uploads/variants', 'public');
                    $variantData['image'] = $variantImagePath;
                } catch (\Exception $e) {
                    DB::rollBack();
                    return response()->json(["error" => "Lỗi upload ảnh biến thể: " . $e->getMessage()], 500);
                }
            }

            // Cập nhật hoặc thêm mới biến thể
            if (!empty($variant['id'])) {
                $existingVariant = ProductVariant::find($variant['id']);
                if ($existingVariant) {
                    $existingVariant->update($variantData);
                }
            } else {
                $product->productVariants()->create($variantData);
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
        $products = Product::where('category_id', $id)->with('productVariants')->get();
        $category = Category::where('id',$id)->first();
        if ($products->isEmpty()) {
            return response()->json([

                'products' => $products,
                'category' => $category->name,
            ], 200);
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
    $query = $request->input('query');


    if (!$query) {
        return response()->json([
            'success' => false,
            'message' => 'Query parameter is required'
        ], 400);
    }


    $products = Product::where('name', 'LIKE', "%{$query}%")->with('productVariants')->get();


    return response()->json([
        'success' => true,
        'data' => $products
    ]);
}


    public function filterProducts(Request $request)
    {
        $query = Product::query();

        if ($request->has('sort_by')) {
            switch ($request->sort_by) {
                case 'latest':
                    $query->orderBy('created_at', 'desc');
                    break;
                case 'oldest':
                    $query->orderBy('created_at', 'asc');
                    break;
                case 'price_asc':
                    $query->orderBy(
                        DB::raw('(SELECT MIN(price) FROM product_variants WHERE product_variants.product_id = products.id)'),
                        'asc'
                    );
                    break;
                
                case 'price_desc':
                    $query->orderBy(
                        DB::raw('(SELECT MAX(price) FROM product_variants WHERE product_variants.product_id = products.id)'),
                        'desc'
                    );
                    break;
                    
    }
        }
        $products = $query->with('productVariants')->paginate(10);

        return response()->json([
            'success' => true,
            'data' => $products
        ]);
    }
public function detail($slug){
    $product = Product::where('slug',$slug)->with(['productVariants.size', 'productVariants.color', 'category', 'comments.user'])->first();
    if(!$product){
        return response()->json(["message"=>"Sản phẩm không tồn tại"]);
    }
    $relatedProducts = Product::where('category_id', $product->category_id)
        ->where('id', '!=', $product->id)
        ->with('productVariants','category')
        ->get();

    return response()->json([
        'product' => $product,
        'related_products' => $relatedProducts
    ]);
}
    public function delete($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json(["message" => "Sản phẩm không tồn tại!"], 404);
        }
        $product->delete();
        return response()->json(["message" => "Xóa sản phẩm thành công!"]);
    }


}
