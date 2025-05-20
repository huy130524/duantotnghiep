<?php

namespace App\Http\Controllers;

use App\Models\Size;
use Illuminate\Http\Request;

class SizeController extends Controller
{
    public function index()
    {
        $sizes = Size::all();
        return response()->json($sizes);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|unique:sizes|max:25',
        ], [
            'name.required' => 'Tên kích thước là trường bắt buộc.',
            'name.unique' => 'Tên kích thước này đã tồn tại, vui lòng chọn tên khác.',
            'name.max' => 'Tên kích thước không được vượt quá :max ký tự.'
        ]);

        Size::query()->create($validated);
        return response()->json([
            'status' => 1,
            'message' => 'Thêm kích cỡ thành công!'
           
        ], 201);
    }
    public function detail($id){
        $size = Size::find($id);

        if(!$size){
            return response()->json(["message"=> "Kích cỡ không tồn tai!"]);
        }
        return response()->json($size);
    }

    public function update(Request $request, $id)
    {
        $size = Size::find($id);

        if(!$size){
            return response()->json(["message"=> "Kích cỡ không tồn tai!"]);
        }
        $validated = $request->validate([
            'name' => 'required|unique:sizes|max:25',
        ], [
            'name.required' => 'Tên kích thước là trường bắt buộc.',
            'name.unique' => 'Tên kích thước này đã tồn tại, vui lòng chọn tên khác.',
            'name.max' => 'Tên kích thước không được vượt quá :max ký tự.'
        ]);

        $size->update($validated);
    
        return response()->json([
            'status' => 1,
            'message' => 'Cập nhật kích cỡ thành công!'
        ], 200);
    }
    public function delete($id)
    {
        $size = Size::find($id);

        if(!$size){
            return response()->json(["message"=> "Kích cỡ không tồn tai!"]);
        }
        $size->delete();
    
        return response()->json([
            'status' => 1,
            'message' => 'Xóa kích cỡ thành công!'
        ], 200);
    }
}
