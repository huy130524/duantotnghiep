<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('order_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained('orders')->onDelete('cascade');  // Liên kết với bảng orders
            $table->foreignId('variant_id')->constrained('product_variants')->onDelete('cascade');  // Liên kết với bảng product_variants
            $table->decimal('price', 10, 2);  // Giá của sản phẩm tại thời điểm mua
            $table->integer('quantity');  // Số lượng sản phẩm trong đơn hàng
            $table->decimal('total_price', 10, 2);  // Tổng giá trị cho sản phẩm trong đơn hàng (price * quantity)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_details');
    }
};
