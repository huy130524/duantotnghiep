<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ColorController;
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
