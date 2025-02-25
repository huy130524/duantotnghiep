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
        Schema::create('coupons', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->decimal('discount', 8, 2);  // Số tiền hoặc phần trăm giảm giá
            $table->enum('discount_type', ['fixed', 'percentage']);  // Kiểu giảm giá: cố định hoặc phần trăm
            $table->integer('usage_limit')->nullable();  // Số lần sử dụng tối đa của coupon
            $table->integer('usage_limit_per_user')->nullable();  // Số lần sử dụng tối đa của coupon mỗi người
            $table->integer('used_count')->default(0);  // Số lần coupon đã được sử dụng
            $table->decimal('minimum_amount', 8, 2)->nullable();  // Số tiền tối thiểu để áp dụng coupon
            $table->decimal('maximum_amount', 8, 2)->nullable();  // Số tiền tối đa mà coupon có thể giảm
            $table->dateTime('start_date');  // Ngày bắt đầu của coupon
            $table->dateTime('end_date');  // Ngày kết thúc của coupon
            $table->boolean('is_active')->default(true);  // Trạng thái hoạt động của coupon
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('coupons');
    }
};
