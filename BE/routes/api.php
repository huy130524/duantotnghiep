<?php

use App\Http\Controllers\CategoryController;
use Illuminate\Support\Facades\Route;


Route::get('/categories', [CategoryController::class,'index']);
Route::post('/create-category', [CategoryController::class,'create']);
Route::get('/delete-category/{id}', [CategoryController::class,'deleteCategory']);
Route::get('/edit-category/{id}', [CategoryController::class,'edit']);
Route::put('/edit-category/{id}', [CategoryController::class,'update']);



// Đăng ký đăng nhập


Route::post('/change-password/{id}', [UserController::class, 'changePassword']);
Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [UserController::class, 'logout']);


Route::get('profile/{id}',[UserController::class,'profile']);
Route::post('updateprofile/{id}',[UserController::class,'UpdateProfile']);