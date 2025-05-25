<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'fullname' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed'
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 0, 'errors' => $validator->errors()], 422);
        }

        $user = User::create([
            'fullname' => $request->fullname,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'status' => 1,
            'message' => 'Đăng ký thành công!',
            'user' => $user
        ], 201);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 0, 'errors' => $validator->errors()], 422);
        }

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['status' => 0, 'message' => 'Sai tài khoản hoặc mật khẩu!'], 404);
        }

        $user = Auth::user();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'status' => 1,
            'message' => 'Đăng nhập thành công!',
            'user' => $user,
            'token' => $token
        ], 200);
    }
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json([
            'status' => 1,
            'message' => 'Đăng xuất thành công!'
        ], 200);
    }
    public function changePassword(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'Người dùng không tồn tại'], 404);
        }
        $request->validate([
            'current_password' => 'required',
            'new_password' => 'required|min:6|confirmed',
        ]);

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['message' => 'Mật khẩu hiện tại không đúng'], 400);
        }

        $user->password = Hash::make($request->new_password);
        $user->save();

        return response()->json(['message' => 'Đổi mật khẩu thành công']);
    }
    public function profile(Request $request)
    {
        $user = $request->user();
        if (!$user) {
            return response()->json(["message" => "Tài khoản không tồn tại"]);
        }
        $user->avatar = $user->avatar ? asset('storage/' . $user->avatar) : null;
        return response()->json($user);
    }
    
    public function updateProfile(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        $user->fullname = $request->fullname ?? $user->fullname;
        $user->phone = $request->phone ?? $user->phone;
        $user->email = $request->email ?? $user->email;
        $user->gender = $request->gender ?? $user->gender;
        $user->address = $request->address ?? $user->address;
        $user->birthday = $request->birthday ?? $user->birthday;
        $user->bio = $request->bio ?? $user->birthday;

        if ($request->hasFile('avatar')) {
            $avatarPath = $request->file('avatar')->store('avatars', 'public');
            $user->avatar = $avatarPath;
        }

        $user->save();

        return response()->json(['message' => 'Profile updated successfully', 'user' => $user]);
    }
    public function index()
    {
        return response()->json(User::all());
    }

      public function store(Request $request)
      {
          $data = $request->validate([
              'fullname' => 'required|string|max:255',
              'email' => 'required|email|unique:users,email',
              'password' => 'required|string|min:8',
              'role' => 'required|in:admin,staff,user',
              'phone' => 'nullable|string|max:15',
              'avatar' => 'nullable|url',
              'gender' => 'nullable|in:male,female,other',
              'birthday' => 'nullable|date',
          ]);
          $data['password'] = Hash::make($data['password']);
          $user = User::create($data);
          return response()->json([
              'message' => 'Tạo người dùng thành công',
              'user' => $user
          ], 201);
      }
      public function show($id)
      {
          $user = User::findOrFail($id);
          return response()->json($user);
      }
  
      public function update(Request $request, $id)
      {
          $user = User::findOrFail($id);
  
          $data = $request->validate([
              'fullname' => 'nullable|string|max:255',
              'email' => 'nullable|email|unique:users,email,' . $id,
              'password' => 'nullable|string|min:8',
              'role' => 'nullable|in:admin,staff,user',
              'phone' => 'nullable|string|max:15',
              'avatar' => 'nullable|url',
              'gender' => 'nullable|in:male,female,other',
              'birthday' => 'nullable|date',
          ]);
          if (isset($data['password'])) {
              $data['password'] = Hash::make($data['password']);
          }
          $user->update($data);
          return response()->json([
            "message"=> "Cập nhật thành công !",
            "user"=> $user,
        ]);
      }
  
      public function delete($id)
      {
          $user = User::findOrFail($id);
          $user->delete();
          return response()->json(['message' => 'Đã xoá user']);
      }
      public function change($id)
      {
          $user = User::find($id);
      
          if (!$user) {
              return response()->json([
                  'message' => 'User not found.'
              ], 404);
          }
      
          // Chuyển đổi giữa "active" và "inactive"
          $user->status = $user->status === 'active' ? 'inactive' : 'active';
          $user->save();
      
          return response()->json([
              'message' => 'Thay đổi thành công!',
              'status' => $user->status,
              'user' => $user,
          ]);
      }
      
}
