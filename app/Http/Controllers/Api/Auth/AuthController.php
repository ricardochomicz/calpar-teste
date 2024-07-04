<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('authToken')->plainTextToken;

            return response()->json(['token' => $token]);
        } else {
            return response()->json(['error' => 'Credenciais Inválidas.'], 401);
        }
    }
//    public function login(Request $request){
//        $loginUserData = $request->validate([
//            'email'=>'required|string|email',
//            'password'=>'required'
//        ]);
//        $user = User::where('email',$loginUserData['email'])->first();
//        if(!$user || !Hash::check($loginUserData['password'],$user->password)){
//            return response()->json([
//                'message' => 'Invalid Credentials'
//            ],401);
//        }
//        $token = $user->createToken($user->name.'-AuthToken')->plainTextToken;
//        return response()->json([
//            'token' => $token,
//        ]);
//    }

    public function logout(Request $request)
    {

        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }
}
