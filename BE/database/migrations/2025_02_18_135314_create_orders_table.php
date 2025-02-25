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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();  // Mã đơn hàng
            $table->string('fullname');  // Tên đầy đủ của khách hàng
            $table->string('phone');  // Số điện thoại của khách hàng
            $table->text('address');  // Địa chỉ giao hàng
            $table->string('email');  // Email của khách hàng
            $table->string('payment');  // Phương thức thanh toán (ví dụ: "credit_card", "paypal", "COD",...)
            $table->enum('status', ['pending', 'processing', 'completed', 'canceled']);  // Trạng thái đơn hàng
            $table->text('note')->nullable();  // Ghi chú thêm
            $table->enum('payment_status', ['pending', 'paid', 'failed']);  // Trạng thái thanh toán
            $table->decimal('total_price', 10, 2);  // Tổng giá trị đơn hàng
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');  // Liên kết với bảng users
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
