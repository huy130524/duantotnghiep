<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    public function index()
    {
        $brands = Brand::all();
        return response()->json($brands);
    }
    public function store(Request $request)
    {
        $validator = \Validator::make($request->all(), [
            'name' => 'required|string|max:199',
            'logo' => 'nullable|image|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 0,
                'message' => 'Validation failed.',
                'errors' => $validator->errors()
            ], 422);
        }

        $logoPath = null;
        if ($request->hasFile('logo')) {
            $logoFile = $request->file('logo');
            $logoPath = 'uploads/brands/' . time() . '_' . $logoFile->getClientOriginalName();
            $logoFile->move(public_path('uploads/brands'), $logoPath);
        }

        $brand = Brand::create([
            'name' => $request->name,
            'logo' => $logoPath
        ]);

        return response()->json([
            'status' => 1,
            'message' => 'Brand created successfully.'
           
        ], 201);
    }
    public function brandDetail($id){
        $brand = Brand::find($id);

        if(!$brand){
            return response()->json(["message"=> "Thương hiệu không tồn tai!"]);
        }
        return response()->json($brand);
    }

    public function update(Request $request, $id)
    {
        // Tìm thương hiệu theo ID
        $brand = Brand::find($id);
    
        if (!$brand) {
            return response()->json(["message" => "Thương hiệu không tồn tại!"], 404);
        }
    
        // Xác thực dữ liệu đầu vào
        $validator = \Validator::make($request->all(), [
            'name' => 'required|string|max:199',
            'logo' => 'nullable|image|max:2048',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'status' => 0,
                'message' => 'Validation failed.',
                'errors' => $validator->errors()
            ], 422);
        }
    
        // Xử lý file upload nếu có
        $logoPath = $brand->logo; // Giữ lại logo cũ nếu không có file mới
        if ($request->hasFile('logo')) {
            $logoFile = $request->file('logo');
            $logoPath = 'uploads/brands/' . time() . '_' . $logoFile->getClientOriginalName();
            $logoFile->move(public_path('uploads/brands'), $logoPath);
        }
    
        // Cập nhật thông tin thương hiệu
        $brand->update([
            'name' => $request->name,
            'logo' => $logoPath
        ]);
    
        return response()->json([
            'status' => 1,
            'message' => 'Brand updated successfully.'
        ], 200);
    }
    public function delete($id)
    {
        $brand = Brand::find($id);

        if (!$brand) {
            return response()->json(["message" => "Thương hiệu không tồn tại!"], 404);
        }

        $brand->delete();

        return response()->json([
            'status' => 1,
            'message' => 'Xóa thương hiệu thành công!'
        ], 200);
    }
}
