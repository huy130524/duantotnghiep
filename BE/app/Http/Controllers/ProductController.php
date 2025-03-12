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
    public function ProductDetail($id){
        $product = Product::findOrFail($id);
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


}
