<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Coupon extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'coupons';

    protected $fillable = [
        'code',
        'discount',
        'discount_type',
        'usage_limit',
        'usage_limit_per_user',
        'used_count',
        'minimum_amount',
        'maximum_amount',
        'start_date',
        'end_date',
        'is_active',
    ];

    protected $casts = [
        'discount' => 'decimal:2',
        'minimum_amount' => 'decimal:2',
        'maximum_amount' => 'decimal:2',
        'start_date' => 'datetime',
        'end_date' => 'datetime',
        'is_active' => 'boolean',
    ];

    public function isExpired()
    {
        return now()->greaterThan($this->end_date);
    }

    public function isValid()
    {
        return $this->is_active && !$this->isExpired();
    }
}
