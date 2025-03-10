<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ColorController;
use App\Http\Controllers\CouponController;
use App\Http\Controllers\SizeController;
use Illuminate\Support\Facades\Route;


Route::get('/categories', [CategoryController::class,'index']);
Route::post('/create-category', [CategoryController::class,'create']);
Route::get('/delete-category/{id}', [CategoryController::class,'deleteCategory']);
Route::get('/edit-category/{id}', [CategoryController::class,'edit']);
Route::put('/edit-category/{id}', [CategoryController::class,'update']);


// Color 

Route::get('/colors', [ColorController::class, 'index']);
Route::post('/color/add', [ColorController::class, 'store']);
Route::get('/color/detail/{id}', [ColorController::class, 'detail']);
Route::post('/color/update/{id}', [ColorController::class, 'update']);


// Size 

Route::get('/sizes', [SizeController::class, 'index']);
Route::post('/size/add', [SizeController::class, 'store']);
Route::get('/size/detail/{id}', [SizeController::class, 'detail']);
Route::post('/size/update/{id}', [SizeController::class, 'update']);


// Coupon 

Route::get('/coupons', [CouponController::class, 'index']);
Route::post('/coupon/add', [CouponController::class, 'store']);
Route::get('/coupon/detail/{id}', [CouponController::class, 'detail']);
Route::post('/coupon/update/{id}', [CouponController::class, 'update']);
