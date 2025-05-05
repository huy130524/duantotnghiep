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
        Schema::create('product_variants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');  // Liên kết với bảng products
            $table->foreignId('color_id')->constrained('colors')->onDelete('cascade');  // Liên kết với bảng colors
            $table->foreignId('size_id')->constrained('sizes')->onDelete('cascade');  // Liên kết với bảng sizes
            $table->decimal('price', 10, 2);  // Giá gốc của sản phẩm
            $table->decimal('sale_price', 10, 2)->nullable();  // Giá bán (có thể null nếu không có giảm giá)
            $table->integer('quantity');  // Số lượng sản phẩm trong kho
            $table->string('image')->nullable();  // Hình ảnh của sản phẩm (có thể để trống)
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_variants');
    }
};
