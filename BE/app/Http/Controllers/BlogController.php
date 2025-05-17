<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class BlogController extends Controller
{
    public function index(Request $request)
    {
        $blogs = Blog::with('category', 'user')
                     ->orderBy('created_at', 'desc') 
                     ->paginate(5);
    
        return response()->json($blogs);
    }
    


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'desc' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'category_id' => 'required|exists:categories,id',
            'user_id' => 'required|exists:users,id', // Kiểm tra user_id có tồn tại trong bảng users
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 0, 'errors' => $validator->errors()], 422);
        }

        $data = $request->only(['title', 'content', 'category_id', 'user_id', 'desc']);
        $data['slug'] = Str::slug($request->title);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $file->storeAs('public/blogs', $fileName);
            $data['image'] = 'storage/blogs/' . $fileName;
        }

        $blog = Blog::create($data);

        return response()->json([
            'status' => 1,
            'message' => 'Thêm bài viết thành công!',
        ], 201);
    }

    public function detail($id)
    {
        $blog = Blog::with('user', 'category')->find($id);

        if (!$blog) {
            return response()->json(["message" => "Bài viết không tồn tại!"], 404);
        }

        return response()->json($blog);
    }

    public function update(Request $request, $id)
    {
        $blog = Blog::find($id);
    
        if (!$blog) {
            return response()->json(["message" => "Bài viết không tồn tại!"], 404);
        }
    
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'desc' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'category_id' => 'required|exists:categories,id',
            'user_id' => 'required|exists:users,id',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['status' => 0, 'errors' => $validator->errors()], 422);
        }
    
        // Lấy dữ liệu cần update, bao gồm desc và user_id
        $data = $request->only(['title', 'content', 'desc', 'category_id', 'user_id']);
        $data['slug'] = Str::slug($request->title);
    
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $file->storeAs('public/blogs', $fileName);
            $data['image'] = 'storage/blogs/' . $fileName;
        }
    
        $blog->update($data);
    
        // Trả về dữ liệu mới nhất sau khi cập nhật
        $blog->refresh();
    
        return response()->json([
            'status' => 1,
            'message' => 'Cập nhật bài viết thành công!',
            'blog' => $blog
        ], 200);
    }
    
    public function userBlog(){
        $blogs = Blog::with('category', 'user')
        ->orderBy('created_at', 'desc') 
        ->paginate(10);

        return response()->json($blogs);
    }
    public function blogSlug($slug){
        $blog = Blog::with('category', 'user')->where('slug', $slug)->first();
        if (!$blog) {
            return response()->json(["message" => "Bài viết không tồn tại!"], 404);
        }
        return response()->json($blog);
    }
}
