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
        Schema::create('cart_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('cart_id')->constrained('carts')->onDelete('cascade');  // Liên kết với bảng carts
            $table->foreignId('variant_id')->constrained('product_variants')->onDelete('cascade');  // Liên kết với bảng product_variants
            $table->integer('quantity');  // Số lượng sản phẩm trong giỏ
            $table->decimal('price_at_purchase', 10, 2);  // Giá sản phẩm tại thời điểm mua
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cart_items');
    }
};
