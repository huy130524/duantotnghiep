<?php

namespace App\Http\Controllers\Manage;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


class ProductController extends Controller
{
    public function index(){
        $products = Product::All();
        return response()->json($products);
    }
}
