<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::get('/users', [UserController::class, 'index']);
Route::delete('/users/{id}', [UserController::class, 'deleteUser']);
Route::post('/users', [UserController::class, 'create']);
Route::get('/users/verify/{token}', [UserController::class, 'verifyEmail']);
Route::post('/users/reset-password', [UserController::class, 'resetPassword']);
Route::post('/users/update-password', [UserController::class, 'updatePassword']);