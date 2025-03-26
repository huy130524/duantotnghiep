<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BannerController extends Controller
{
    // Lấy danh sách banner
    public function index()
    {
        $banners = Banner::orderBy('created_at', 'desc')->limit(3);
        return response()->json($banners);
    }

    // Thêm banner mới
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'image' => 'required|string|max:255',
            'link' => 'nullable|string|max:255',
            'is_active' => 'required|boolean',
            'location' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $banner = Banner::create($request->all());
        return response()->json(['message' => 'Banner created successfully', 'banner' => $banner], 201);
    }

    // Lấy chi tiết một banner
    public function show($id)
    {
        $banner = Banner::find($id);
        if (!$banner) {
            return response()->json(['message' => 'Banner not found'], 404);
        }
        return response()->json($banner);
    }

    // Cập nhật banner
    public function update(Request $request, $id)
    {
        $banner = Banner::find($id);
        if (!$banner) {
            return response()->json(['message' => 'Banner not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|string|max:255',
            'image' => 'sometimes|string|max:255',
            'link' => 'nullable|string|max:255',
            'is_active' => 'sometimes|boolean',
            'location' => 'sometimes|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $banner->update($request->all());
        return response()->json(['message' => 'Banner updated successfully', 'banner' => $banner]);
    }

    // Xóa banner
    public function destroy($id)
    {
        $banner = Banner::find($id);
        if (!$banner) {
            return response()->json(['message' => 'Banner not found'], 404);
        }

        $banner->delete();
        return response()->json(['message' => 'Banner deleted successfully']);
    }
}
