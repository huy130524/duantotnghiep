<?php

use App\Http\Controllers\CategoryController;
=======
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


// Category

Route::get('/categories', [CategoryController::class,'index']);
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


Route::middleware('auth:sanctum')->get('profile', [UserController::class, 'profile']);
Route::post('updateprofile/{id}',[UserController::class,'UpdateProfile']);