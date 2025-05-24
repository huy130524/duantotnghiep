<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Models\Blog;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    public function index()
    {
        $banners = Banner::where('is_active', 1)->get();
        $categories = Category::where('is_active', 1)->get();
        $blogs = Blog::where('status', 'published')
        ->orderBy('created_at', 'desc') // hoặc 'updated_at'
        ->get();
        $newProducts = Product::orderBy('created_at', 'desc')
                              ->with('productVariants')
                              ->take(10)
                              ->get();

        return response()->json([
            'banners' => $banners,
            'blogs' => $blogs,
            'categories' => $categories,
            'new_products' => $newProducts
        ], 200);
    }
    public function dashboard(Request $request)
    {
        $totalUser = User::where('role', 'user')
                            ->where('status', 'active')
                            ->count();
        $totalProduct = Product::where('is_active', 1)->count();
        $totalBrand = Brand::count();

        $filter = $request->input('filter', 'month');
        $startDateInput = $request->input('start_date');
        $endDateInput = $request->input('end_date');
        $now = Carbon::now();

        if ($startDateInput && $endDateInput) {
            // Ưu tiên lọc theo ngày truyền vào
            $startDate = Carbon::parse($startDateInput)->startOfDay();
            $endDate = Carbon::parse($endDateInput)->endOfDay();
            $filter = 'custom'; // để hiển thị rằng đang dùng custom date
        } else {
            switch ($filter) {
                case 'week':
                    $startDate = $now->copy()->startOfWeek();
                    $endDate = $now->copy()->endOfWeek();
                    break;
                case 'year':
                    $startDate = $now->copy()->startOfYear();
                    $endDate = $now->copy()->endOfYear();
                    break;
                case 'month':
                default:
                    $startDate = $now->copy()->startOfMonth();
                    $endDate = $now->copy()->endOfMonth();
                    break;
            }
        }

        // Lấy đơn hàng trong khoảng thời gian lọc
        $orders = DB::table('orders')
            ->whereBetween('created_at', [$startDate, $endDate])
            ->get();

        $totalRevenue = $orders->where('payment_status', 'Đã thanh toán')->sum('total_price');
        $totalOrders = $orders->count();
        $pendingOrders = $orders->where('status', 'Chờ xác nhận')->count();
        $confirmedOrders = $orders->where('status', 'Đã xác nhận')->count();
        $preparingOrders = $orders->where('status', 'Đang chuẩn bị hàng')->count();
        $shippingOrders = $orders->where('status', 'Đang giao hàng')->count();
        $deliveredOrders = $orders->where('status', 'Đã giao hàng')->count();
        $canceledOrders = $orders->where('status', 'Đơn hàng đã hủy')->count();

        $rawMonthly = DB::table('orders')
            ->select(
                DB::raw('MONTH(created_at) as month'),
                DB::raw('SUM(total_price) as revenue')
            )
            ->whereYear('created_at', $now->year)
            ->where('payment_status', 'Đã thanh toán')
            ->groupBy(DB::raw('MONTH(created_at)'))
            ->pluck('revenue', 'month');

        $monthlyRevenue = [];
        for ($i = 1; $i <= 12; $i++) {
            $monthlyRevenue[$i] = isset($rawMonthly[$i]) ? $rawMonthly[$i] : 0;
        }


        return response()->json([
            'filter' => $filter,
            'start_date' => $startDate->toDateString(),
            'end_date' => $endDate->toDateString(),
            'total_user' => $totalUser,
            'total_product' => $totalProduct,
            'total_brand' => $totalBrand,
            'monthly_revenue' => $monthlyRevenue,
            'total_revenue' => $totalRevenue,
            'total_orders' => $totalOrders,

            'orders' => [
                'Chờ xác nhận' => $pendingOrders,
                'Đã xác nhận' => $confirmedOrders,
                'Đang chuẩn bị hàng' => $preparingOrders,
                'Đang giao hàng' => $shippingOrders,
                'Đã giao hàng' => $deliveredOrders,
                'Đơn hàng đã hủy' => $canceledOrders,
            ],

        ]);
    }

    
    
}
