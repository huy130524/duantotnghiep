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
        Schema::create('address_provinces', function (Blueprint $table) {
            $table->id();
            $table->string('name');  // Tên tỉnh
            $table->string('type');  // Loại (ví dụ: Tỉnh, Thành phố)
            $table->string('slug');  // Slug (dùng cho URL)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('address_provinces');
    }
};
