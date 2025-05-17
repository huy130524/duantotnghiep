<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Blog extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'blogs'; // Nếu bảng tên khác với mặc định (blog -> blogs)

    protected $fillable = [
        'title',
        'content',
        'desc',
        'slug',
        'image',
        'status',
        'category_id',
        'user_id',
    ];

    protected $casts = [
        'status' => 'string',
    ];

    /**
     * Mối quan hệ với User (Người đăng bài)
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Mối quan hệ với Category (Danh mục)
     */
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
}
