<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class BannerController extends Controller
{
    // Lấy danh sách banner
    public function index()
    {
        $banners = Banner::orderBy('created_at', 'desc')->get();
        return response()->json($banners);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'link' => 'nullable|string|max:255',
            'is_active' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $imagePath = $request->file('image')->store('banners', 'public');

        $banner = Banner::create([
            'title' => $request->title,
            'image' => '/storage/' . $imagePath,
            'link' => $request->link,
            'is_active' => $request->is_active,
        ]);

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

    public function update(Request $request, $id)
{
    $banner = Banner::find($id);
    if (!$banner) {
        return response()->json(['message' => 'Banner not found'], 404);
    }

    $validator = Validator::make($request->all(), [
        'title' => 'sometimes|string|max:255',
        'image' => 'sometimes|image|mimes:jpeg,png,jpg,gif|max:2048',
        'link' => 'nullable|string|max:255',
        'is_active' => 'integer',
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }
    $data = $request->only(['title', 'link', 'is_active']);
    if ($request->hasFile('image')) {
        if ($banner->image && Storage::disk('public')->exists(str_replace('/storage/', '', $banner->image))) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $banner->image));
        }

        $path = $request->file('image')->store('banners', 'public');
        $data['image'] = '/storage/' . $path;
    }

    $banner->update($data);

    return response()->json([
        'message' => 'Banner updated successfully',
        'banner' => $banner
    ]);
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
