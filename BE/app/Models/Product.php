<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'products';

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

    public static $rules = [
        'name' => 'required|string|max:255',
        'category_id' => 'required|exists:categories,id',
        'brand_id' => 'nullable|exists:brands,id',
        'is_active' => 'boolean'
    ];
    
    protected $casts = [
        'views' => 'integer',
        'is_active' => 'boolean',
        'status' => 'string',
    ];

    // Quan hệ với Category
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // Quan hệ với Brand
    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }
}
