<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ColorController;
use App\Http\Controllers\CouponController;
use App\Http\Controllers\SizeController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;

use Illuminate\Support\Facades\Route;


// Category

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

// Blog 

Route::get('/blogs', [BlogController::class, 'index']);
Route::post('/blog/add', [BlogController::class, 'store']);
Route::get('/blog/detail/{id}', [BlogController::class, 'detail']);
Route::post('/blog/update/{id}', [BlogController::class, 'update']);

Route::post('/category/add', [CategoryController::class,'create']);
Route::get('/category/delete/{id}', [CategoryController::class,'deleteCategory']);
Route::get('/category/detail/{id}', [CategoryController::class,'edit']);
Route::post('/category/update/{id}', [CategoryController::class,'update']);

// Product

Route::get('/products', [ProductController::class, 'index']);
Route::post('/product/add', [ProductController::class, 'store']);
Route::get('/product/detail/{id}', [ProductController::class, 'ProductDetail']);
Route::post('/product/update/{id}', [ProductController::class, 'update']);

// Brand 

Route::get('/brands', [BrandController::class, 'index']);
Route::post('/brand/add', [BrandController::class, 'store']);
Route::get('/brand/detail/{id}', [BrandController::class, 'brandDetail']);
Route::post('/brand/update/{id}', [BrandController::class, 'update']);

// Đăng ký đăng nhập
Route::post('/change-password/{id}', [UserController::class, 'changePassword']);
Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [UserController::class, 'logout']);


Route::get('profile/{id}',[UserController::class,'profile']);
Route::post('updateprofile/{id}',[UserController::class,'UpdateProfile']);
