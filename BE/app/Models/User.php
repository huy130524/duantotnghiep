<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    protected $table = 'users'; // Tên bảng

    protected $primaryKey = 'id'; // Khóa chính

    protected $fillable = [
        'fullname',
        'avatar',
        'phone',
        'address',
        'email',
        'email_verified_at',
        'password',
        'role',
        'status',
        'otp',
        'remember_token',
        'gender',
        'birthday',
        'language',
        'bio',
    ];

    protected $hidden = [
        'password',
        'remember_token',
        'otp',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'birthday' => 'date',
        'role' => 'string',
        'status' => 'string',
        'gender' => 'string',
        'deleted_at' => 'datetime',
    ];
}
