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
        Schema::create('address_communes', function (Blueprint $table) {
            $table->id();
            $table->string('name');  // Tên xã/phường
            $table->string('type');  // Loại (ví dụ: Xã, Phường)
            $table->foreignId('district_id')->constrained('address_districts')->onDelete('cascade');  // Liên kết với bảng address_districts
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('address_communes');
    }
};
