<?php


namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;


class Order extends Model
{
    use HasFactory;
    protected $fillable = [
        'code', 'fullname', 'phone', 'address', 'email', 'payment', 'status',
        'payment_status', 'shiping', 'discount', 'voucher_code', 'total_price', 'note', 'user_id'
    ];
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    public function orderDetails()
    {
        return $this->hasMany(OrderDetail::class);
    }
    public function product()
    {
        return $this->belongsTo(Product::class);
    }


    // public function comments()
    // {
    //     return $this->hasMany(Comment::class,'order_id');
    // }
}
