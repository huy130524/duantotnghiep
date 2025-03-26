<?php

namespace App\Http\Controllers;

use App\Models\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AddressController extends Controller
{
    /**
     * Lấy danh sách địa chỉ của người dùng hiện tại (dựa vào token)
     */
    public function index(Request $request)
    {
        $user = $request->user(); // Lấy user từ token

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $addresses = Address::where('user_id', $user->id)->get();
        return response()->json($addresses);
    }

    /**
     * Thêm mới địa chỉ cho người dùng hiện tại
     */
    public function store(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'street' => 'required|string|max:255',
            'district' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'phone' => 'required|string|max:15',
            'is_default' => 'boolean',
        ]);

        $address = Address::create([
            'user_id' => $user->id,
            'street' => $request->street,
            'district' => $request->district,
            'city' => $request->city,
            'phone' => $request->phone,
            'is_default' => $request->is_default ?? false,
        ]);

        return response()->json(["message" => "Thêm thành công", "address" => $address], 201);
    }

    /**
     * Lấy thông tin một địa chỉ cụ thể của người dùng hiện tại
     */
    public function show(Request $request, $id)
    {
        $user = $request->user();

        $address = Address::where('user_id', $user->id)->findOrFail($id);
        return response()->json($address);
    }

    /**
     * Cập nhật địa chỉ theo ID (chỉ cập nhật địa chỉ thuộc về người dùng)
     */
    public function update(Request $request, $id)
    {
        $user = $request->user();

        $request->validate([
            'street' => 'string|max:255',
            'district' => 'string|max:255',
            'city' => 'string|max:255',
            'phone' => 'string|max:15',
            'is_default' => 'boolean',
        ]);

        $address = Address::where('user_id', $user->id)->findOrFail($id);
        $address->update($request->only(['street', 'district', 'city', 'phone', 'is_default']));

        return response()->json(["message" => "Cập nhật thành công!", "address" => $address]);
    }

    /**
     * Xóa địa chỉ theo ID (chỉ xóa địa chỉ thuộc về người dùng)
     */
    public function destroy(Request $request, $id)
    {
        $user = $request->user();

        $address = Address::where('user_id', $user->id)->findOrFail($id);
        $address->delete();

        return response()->json(['message' => 'Địa chỉ đã được xóa thành công']);
    }
}
