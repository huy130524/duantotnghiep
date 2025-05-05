<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderDetail extends Model
{
    use HasFactory;
    protected $fillable = [
        'order_id', 'variant_id', 'price', 'quantity', 'total_price'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function ProductVariant()
    {
        return $this->belongsTo(ProductVariant::class,'variant_id');
    }
    public function variant()
    {
        return $this->belongsTo(ProductVariant::class,'variant_id');
    }

}
