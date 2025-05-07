<?php

use App\Http\Controllers\BannerController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CategoryController;

use App\Http\Controllers\ColorController;
use App\Http\Controllers\CouponController;
use App\Http\Controllers\SizeController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AddressController;
use App\Http\Controllers\BankAccountController;
use App\Http\Controllers\CartController;
use Illuminate\Support\Facades\Route;





//


// Product

Route::get('/categories/{id}/products', [ProductController::class, 'getProductsByCategory']);

Route::get('/products/size/{size_id}', [ProductController::class, 'filterBySize']);
Route::get('/products/search', [ProductController::class, 'search']);
Route::get('/products/filter', [ProductController::class, 'filterProducts']);
Route::get('products/{slug}',[ProductController::class, 'detail']);


// Đăng ký đăng nhập
Route::post('/change-password/{id}', [UserController::class, 'changePassword']);
Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [UserController::class, 'logout']);


Route::middleware('auth:sanctum')->get('profile', [UserController::class, 'profile']);
Route::middleware('auth:sanctum')->post('updateprofile/{id}',[UserController::class,'UpdateProfile']);

Route::get('blog-user', [BlogController::class, 'userBlog']);



// Liên hệ
Route::get('/contacts', [ContactController::class, 'index']);
Route::post('/contacts/add', [ContactController::class, 'store']);
Route::get('/contacts/detail/{id}', [ContactController::class, 'show']);
Route::post('/contacts/update/{id}', [ContactController::class, 'update']);
Route::delete('/contacts/delete/{id}', [ContactController::class, 'destroy']);

// Api admin
Route::middleware('auth:sanctum')->group(function () {
    // Hủy đơn tại client
    Route::post('/orders/{id}/cancel',[OrderController::class,'cancelOrder'])->middleware('role:admin,staff');



    // Giỏ hàng
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart/add', [CartController::class, 'store']);
    Route::post('/cart/change/{id}', [CartController::class, 'update']);
    Route::delete('/cart/delete/{id}', [CartController::class, 'destroy']);

    // Quản lý địa chỉ
    Route::get('/addresses', [AddressController::class, 'index']);
    Route::post('/addresses/add', [AddressController::class, 'store']);
    Route::get('/addresses/detail/{id}', [AddressController::class, 'show']);
    Route::post('/addresses/update/{id}', [AddressController::class, 'update']);
    Route::delete('/addresses/delete/{id}', [AddressController::class, 'destroy']);

    // Quản lý banner 
    Route::get('/banners', [BannerController::class, 'index'])->middleware('role:admin,staff');
    Route::post('/banner/add', [BannerController::class, 'store'])->middleware('role:admin,staff');
    Route::get('/banner/{id}', [BannerController::class, 'show'])->middleware('role:admin,staff');
    Route::post('/banner/update/{id}', [BannerController::class, 'update'])->middleware('role:admin,staff');
    Route::delete('/banner/delete/{id}', [BannerController::class, 'destroy'])->middleware('role:admin,staff');


    // Comment
    Route::get('/comments', [CommentController::class, 'index']);
    Route::get('/comments/detail/{id}', [CommentController::class, 'detail']);
    Route::post('/comments/send/{order_id}',[CommentController::class,'send']);


    // Thanh toán
    Route::get('getcheckout', [OrderController::class,'getCheckout']);
    Route::post('/orders/tao-don',[OrderController::class,'store']);
    Route::get('/payment/return', [OrderController::class, 'vnpayReturn']);


    // Quản lý User 
    Route::get('/users', [UserController::class, 'index'])->middleware('role:admin,staff');
    Route::post('/users/add', [UserController::class, 'store'])->middleware('role:admin');
    Route::get('/users/show/{id}', [UserController::class, 'show'])->middleware('role:admin,staff');
    Route::post('/users/update/{id}', [UserController::class, 'update'])->middleware('role:admin');
    Route::post('/users/change/{id}', [UserController::class, 'change'])->middleware('role:admin');
    Route::delete('/users/{id}', [UserController::class, 'destroy'])->middleware('role:admin');

    // Quản lý đơn hàng Admin
    Route::get('/admin-orders',[OrderController::class,'admin_index'])->middleware('role:admin,staff');
    Route::get('/admin-orders/detail/{id}',[OrderController::class,'admin_detail'])->middleware('role:admin,staff');
    Route::post('/admin-orders/update/{order}',[OrderController::class,'update'])->middleware('role:admin,staff');
    Route::post('/admin-order-status-update/{id}',[OrderController::class,'updateStatus'])->middleware('role:admin,staff');
    Route::get('/home', [HomeController::class, 'index']);

    
    // Quản lý màu sấc
    Route::get('/colors', [ColorController::class, 'index'])->middleware('role:admin,staff');
    Route::post('/color/add', [ColorController::class, 'store'])->middleware('role:admin,staff');
    Route::get('/color/detail/{id}', [ColorController::class, 'detail'])->middleware('role:admin,staff');
    Route::post('/color/update/{id}', [ColorController::class, 'update'])->middleware('role:admin,staff');

    // Quản lý kích cỡ

    Route::get('/sizes', [SizeController::class, 'index'])->middleware('role:admin,staff');
    Route::post('/size/add', [SizeController::class, 'store'])->middleware('role:admin,staff');
    Route::get('/size/detail/{id}', [SizeController::class, 'detail'])->middleware('role:admin,staff');
    Route::post('/size/update/{id}', [SizeController::class, 'update'])->middleware('role:admin,staff');


    // Quản lý mã giảm giá
    Route::get('/coupons', [CouponController::class, 'index'])->middleware('role:admin');
    Route::post('/coupon/add', [CouponController::class, 'store'])->middleware('role:admin');
    Route::get('/coupon/detail/{id}', [CouponController::class, 'detail'])->middleware('role:admin');
    Route::post('/coupon/update/{id}', [CouponController::class, 'update'])->middleware('role:admin');
    Route::post('/coupon/apply', [OrderController::class, 'checkVC']);

    // Quản lý bài viết

    Route::get('/blogs', [BlogController::class, 'index'])->middleware('role:admin,staff');
    Route::post('/blog/add', [BlogController::class, 'store'])->middleware('role:admin,staff');
    Route::get('/blog/detail/{id}', [BlogController::class, 'detail'])->middleware('role:admin,staff');
    Route::post('/blog/update/{id}', [BlogController::class, 'update'])->middleware('role:admin,staff');
    
    // Quản lý thương hiẹu

    Route::get('/brands', [BrandController::class, 'index'])->middleware('role:admin,staff');
    Route::post('/brand/add', [BrandController::class, 'store'])->middleware('role:admin,staff');
    Route::get('/brand/detail/{id}', [BrandController::class, 'brandDetail'])->middleware('role:admin,staff');
    Route::post('/brand/update/{id}', [BrandController::class, 'update'])->middleware('role:admin,staff');

    // Quản lý sản phẩm
    Route::get('/products', [ProductController::class, 'index'])->middleware('role:admin,staff');
    Route::post('/product/add', [ProductController::class, 'store'])->middleware('role:admin,staff');
    Route::get('/product/detail/{id}', [ProductController::class, 'ProductDetail'])->middleware('role:admin,staff');
    Route::post('/product/update/{id}', [ProductController::class, 'update'])->middleware('role:admin,staff');
    
    // Quản lý danh mục
    Route::get('/categories', [CategoryController::class, 'index'])->middleware('role:admin,staff');
    Route::post('/category/add', [CategoryController::class, 'create'])->middleware('role:admin,staff');
    Route::get('/category/delete/{id}', [CategoryController::class, 'deleteCategory'])->middleware('role:admin,staff');
    Route::get('/category/detail/{id}', [CategoryController::class, 'edit'])->middleware('role:admin,staff');
    Route::post('/category/update/{id}', [CategoryController::class, 'update'])->middleware('role:admin,staff');
    // Dashboard
    Route::get('dashboard',[HomeController::class,'dashboard']);

  // 
  Route::get('/profile/orders-history',[OrderController::class,'getOrderUser']);
  Route::get('/profile/orders-detail/{code}',[OrderController::class,'getOrder']);
});