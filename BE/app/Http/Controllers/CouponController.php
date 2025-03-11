<?php

namespace App\Http\Controllers;

use App\Models\Coupon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CouponController extends Controller
{
    public function index(Request $request)
{
    $coupons = Coupon::paginate(5);
    return response()->json($coupons);
}

public function store(Request $request)
{
    $validator = Validator::make($request->all(), [
        'code' => 'required|string|unique:coupons|max:255',
        'discount' => 'required|numeric|min:0',
        'discount_type' => 'required|in:fixed,percentage',
        'usage_limit' => 'nullable|integer|min:1',
        'usage_limit_per_user' => 'nullable|integer|min:1',
        'minimum_amount' => 'nullable|numeric|min:0',
        'maximum_amount' => 'nullable|numeric|min:0',
        'start_date' => 'required|date',
        'end_date' => 'required|date|after:start_date',
        'is_active' => 'boolean',
    ]);

    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }

    $coupon = Coupon::create($request->all());

    return response()->json([
        'message' => 'Tạo mã giảm giá thành công!',
    ], 201);
}

    public function detail($id){
        $coupon = Coupon::find($id);

        if(!$coupon){
            return response()->json(["message"=> "Mã giảm giá không tồn tại không tồn tai!"]);
        }
        return response()->json($coupon);
    }

    public function update(Request $request, $id)
    {
        $coupon = Coupon::findOrFail($id);
    
        $validator = Validator::make($request->all(), [
            'code' => 'required|string|max:255|unique:coupons,code,' . $id,
            'discount' => 'required|numeric|min:0',
            'discount_type' => 'required|in:fixed,percentage',
            'usage_limit' => 'nullable|integer|min:1',
            'usage_limit_per_user' => 'nullable|integer|min:1',
            'minimum_amount' => 'nullable|numeric|min:0',
            'maximum_amount' => 'nullable|numeric|min:0',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'is_active' => 'boolean',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
    
        $coupon->update($request->all());
    
        return response()->json(['message' => 'Cập nhật mã giảm giá thành công!', 'coupon' => $coupon], 200);
    }
    
}
