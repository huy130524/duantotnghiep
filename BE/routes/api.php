<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
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

