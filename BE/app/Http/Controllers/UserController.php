<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use App\Mail\VerifyEmail;
use App\Mail\ResetPasswordMail;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    public function deleteUser($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(["message" => "User không tồn tại"], 404);
        }
        $user->delete();
        return response()->json(["success" => "Xóa user thành công"]);
    }

    public function create(Request $request)
    {
        $validatedData = $request->validate([
            'fullname' => 'required|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6',
            'avatar' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048',
        ]);

        $validatedData['password'] = Hash::make($validatedData['password']);
        $validatedData['role'] = 'user';
        $validatedData['status'] = 1;
        $validatedData['email_verified_at'] = null;

        if ($request->hasFile('avatar')) {
            $filePath = $request->file('avatar')->store('uploads/Users', 'public');
            $validatedData['avatar'] = $filePath;
        }

        $user = User::create($validatedData);
        $token = Str::random(60);
        Mail::to($user->email)->send(new VerifyEmail($user, $token));

        return response()->json(["success" => "Đăng ký thành công. Kiểm tra email để xác thực."]);
    }

    public function verifyEmail($token)
    {
        $user = User::where('email_verification_token', $token)->first();
        if (!$user) {
            return response()->json(["error" => "Mã xác thực không hợp lệ"]);
        }
        $user->email_verified_at = now();
        $user->save();
        return response()->json(["success" => "Email đã được xác thực"]);
    }

    public function resetPassword(Request $request)
    {
        $validatedData = $request->validate([
            'email' => 'required|email|exists:users,email',
        ]);

        $user = User::where('email', $validatedData['email'])->first();
        $token = Str::random(60);
        Mail::to($user->email)->send(new ResetPassworddMail($token));

        return response()->json(["success" => "Vui lòng kiểm tra email để đặt lại mật khẩu"]);
    }

    public function updatePassword(Request $request)
    {
        $validatedData = $request->validate([
            'token' => 'required',
            'password' => 'required|min:6',
        ]);

        $user = User::where('password_reset_token', $validatedData['token'])->first();
        if (!$user) {
            return response()->json(["error" => "Token không hợp lệ"]);
        }

        $user->password = Hash::make($validatedData['password']);
        $user->save();
        return response()->json(["success" => "Mật khẩu đã được đặt lại thành công"]);
    }
}
