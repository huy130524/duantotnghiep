<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        $banners = Banner::where('is_active', 1)->get();
        $categories = Category::where('is_active', 1)->get();

        $newProducts = Product::orderBy('created_at', 'desc')
                              ->with('productVariants')
                              ->take(10)
                              ->get();

        return response()->json([
            'banners' => $banners,
            'categories' => $categories,
            'new_products' => $newProducts
        ], 200);
    }
}
