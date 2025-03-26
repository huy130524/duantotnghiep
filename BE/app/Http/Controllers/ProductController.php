<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

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
            'code' =>'required|unique:products,code',
            'name' => 'required|max:255',
            'slug' => 'required|unique:products,slug',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'description' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
            'brand_id' => 'required|exists:brands,id'
        ]);
    
        // Xử lý upload ảnh
        if ($request->hasFile('image')) {
            try {
                $imagePath = $request->file('image')->store('uploads/products', 'public');
                $data['image'] = $imagePath;
            } catch (\Exception $e) {
                return response()->json(["error" => "Lỗi upload ảnh: " . $e->getMessage()], 500);
            }
        }
    
        // Lưu vào database
        try {
            Product::create($data);
            return response()->json(["success" => "Thêm thành công"]);
        } catch (\Exception $e) {
            return response()->json(["error" => "Lỗi khi lưu vào database: " . $e->getMessage()], 500);
        }
    }
    
    public function update($product_id, Request $request)
    {
        $data = $request->post();
        $validator = \Validator::make($data, Product::$rules);

        if ($validator->fails()) {
            return response()->json(['status' => 0, "message" => "Data invalid.",  "errors" => $validator->errors()]);
            
        }

        $product = Product::find($product_id);

        if (empty($product)) {
            return response()->json(['status' => 0, "message" => "Product does not exist."]);
        }

        $product->update($data) ;
        return response()->json(['status' => 1, "message" => "Success."]);
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
