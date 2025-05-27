<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{
    public function home()
    {
        $categories = Category::all()->map(function ($category) {
            $category->image = $category->image ? asset('storage/' . $category->image) : null;
            return $category;
        });

        return response()->json($categories);
    }
    public function index()
    {
        $categories = Category::all()->map(function ($category) {
            $category->image = $category->image ? asset('storage/' . $category->image) : null;
            return $category;
        });
    
        return response()->json($categories);
    }
    
    public function deleteCategory($id)
    {
        $category = Category::find($id);
        if (empty($category)) {
            return response()->json(["message" => "Danh mục không tồn tại"]);
        }
        $category->delete();

        return response()->json(["success" => "Xóa thành công!"]);
    }
    public function create(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|max:255',
                'image' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
            ]);
            if ($request->hasFile('image')) {
                $filePath = $request->file('image')->store('uploads/Categories', 'public');
                $validatedData['image'] = $filePath;
            }

            Category::create($validatedData);

            return response()->json(["success" => "Thêm danh mục thành công"], 201);
        } catch (\Exception $e) {
            return response()->json(["error" => "Lỗi: " . $e->getMessage()], 500);
        }
    }

    public function edit($id)
    {
        $category = Category::find($id);
        return response()->json($category);
    }
    public function update(Request $request, $id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json(["error" => "Danh mục không tồn tại"], 404);
        }

        try {
            $validatedData = $request->validate([
                'name' => 'required|max:255',
                'image' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
            ]);

            if ($request->hasFile('image')) {
                if ($category->image) {
                    Storage::disk('public')->delete($category->image);
                }
                $filePath = $request->file('image')->store('uploads/Categories', 'public');
                $validatedData['image'] = $filePath;
            }
            $category->update($validatedData);
            return response()->json(["success" => "Cập nhật danh mục thành công"], 200);
        } catch (\Exception $e) {
            return response()->json(["error" => "Lỗi: " . $e->getMessage()], 500);
        }
    }

    public function delete($id)
    {
        $category = Category::find($id);
        if (!$category) {
            return response()->json(["error" => "Danh mục không tồn tại"], 404);
        }

        if ($category->image) {
            Storage::disk('public')->delete($category->image);
        }

        $category->delete();
        return response()->json(["success" => "Xóa danh mục thành công"], 200);
    }

}
