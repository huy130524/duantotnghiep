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
    public static function roles()
    {
        return [
            'admin' => 'Admin',
            'staff' => 'Staff',
            'user' => 'User',
        ];
    }
    public function rules()
    {
        return [
            'fullname' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'role' => 'required|in:admin,staff,user',
            'phone' => 'nullable|string|max:15',
            'avatar' => 'nullable|url',
            'gender' => 'nullable|in:male,female,other',
            'birthday' => 'nullable|date',
        ];
    }

    public function messages()
    {
        return [
            'password.min' => 'Mật khẩu phải có ít nhất 8 ký tự.',
            'email.unique' => 'Email đã tồn tại trong hệ thống.',
            'role.in' => 'Vai trò phải là admin, staff hoặc user.',
        ];
    }
}
