<?php

namespace App\Http\Controllers;

use App\Models\Color;
use Illuminate\Http\Request;

class ColorController extends Controller
{
    public function index()
    {
        $colors = Color::all();
        return response()->json($colors);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|unique:colors|max:255',
            'color_code' => 'required'
        ], [
            'name.required' => 'Tên màu là trường bắt buộc.',
            'name.unique' => 'Tên màu này đã tồn tại, vui lòng chọn tên khác.',
            'name.max' => 'Tên màu không được vượt quá :max ký tự.',
            'color_code.required' => 'Mã màu là trường bắt buộc.'
        ]);
        Color::query()->create($validated);
        return response()->json([
            'status' => 1,
            'message' => 'Thêm màu thành công!'

        ], 201);
    }
    public function detail($id){
        $color = Color::find($id);

        if(!$color){
            return response()->json(["message"=> "Thương hiệu không tồn tai!"]);
        }
        return response()->json($color);
    }

    public function update(Request $request, $id)
    {
        $color = Color::find($id);

        if(!$color){
            return response()->json(["message"=> "Thương hiệu không tồn tai!"]);
        }
        $validated = $request->validate([
            'name' => 'required|max:255|unique:colors,name,' . $color->id,

            'color_code' => 'required'
        ], [
            'name.required' => 'Tên màu là trường bắt buộc.',
            'name.unique' => 'Tên màu này đã tồn tại, vui lòng chọn tên khác.',
            'name.max' => 'Tên màu không được vượt quá :max ký tự.',
            'color_code.required' => 'Mã màu là trường bắt buộc.'
        ]);

        $color->update($validated);

        return response()->json([
            'status' => 1,
            'message' => 'Cập nhật màu thành công!'
        ], 200);
    }
    public function delete($id)
    {
        $color = Color::find($id);

        if(!$color){
            return response()->json(["message"=> "Thương hiệu không tồn tai!"]);
        }
        $color->delete();

        return response()->json([
            'status' => 1,
            'message' => 'Xóa màu thành công!'
        ], 200);
    }

}
