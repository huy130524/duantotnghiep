<?php

use App\Http\Controllers\CategoryController;
use Illuminate\Support\Facades\Route;


// Category

Route::get('/categories', [CategoryController::class,'index']);
Route::post('/category/add', [CategoryController::class,'create']);
Route::get('/category/delete/{id}', [CategoryController::class,'deleteCategory']);
Route::get('/category/detail/{id}', [CategoryController::class,'edit']);
Route::post('/category/update/{id}', [CategoryController::class,'update']);

