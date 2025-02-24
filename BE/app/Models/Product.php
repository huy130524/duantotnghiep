<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'products'; // Tên bảng

    protected $fillable = [
        'code',
        'name',
        'slug',
        'image',
        'description',
        'views',
        'status',
        'is_active',
        'category_id',
        'brand_id',
    ];

    protected $casts = [
        'views' => 'integer',
        'is_active' => 'boolean',
        'status' => 'string',
    ];

    protected $dates = ['deleted_at'];


    public function category()
    {
        return $this->belongsTo(Category::class);
    }


    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }
}
