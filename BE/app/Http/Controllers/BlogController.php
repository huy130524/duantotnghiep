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
        $query = Blog::with('user', 'category');
        if ($request->has('title')) {
            $title = $request->input('title');
            $query->where('title', 'LIKE', "%$title%");
        }
        if ($request->has('user')) {
            $userName = $request->input('user');
            $query->whereHas('user', function ($q) use ($userName) {
                $q->where('name', 'LIKE', "%$userName%");
            });
        }
        if ($request->has('status')) {
            $query->where('status', $request->input('status'));
        }
        if ($request->has('category_id')) {
            $query->where('category_id', $request->input('category_id'));
        }
        $query->orderBy('created_at', $request->input('sort', 'desc'));
        $blogs = $query->paginate($request->input('limit', 10));

        return response()->json($blogs);
    }


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'category_id' => 'required|exists:categories,id',
            'user_id' => 'required|exists:users,id', // Kiểm tra user_id có tồn tại trong bảng users
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 0, 'errors' => $validator->errors()], 422);
        }

        $data = $request->only(['title', 'content', 'category_id', 'user_id']);
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
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'category_id' => 'required|exists:categories,id',
            'user_id' => 'required|exists:users,id', 
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 0, 'errors' => $validator->errors()], 422);
        }

        $data = $request->only(['title', 'content', 'category_id']);
        $data['slug'] = Str::slug($request->title);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $file->storeAs('public/blogs', $fileName);
            $data['image'] = 'storage/blogs/' . $fileName;
        }

        $blog->update($data);

        return response()->json([
            'status' => 1,
            'message' => 'Cập nhật bài viết thành công!',
            'blog' => $blog
        ], 200);
    }
}
