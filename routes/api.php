<?php

use App\Http\Controllers\Api\Auth\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::post('login', [AuthController::class, 'login']);
Route::post('register', [\App\Http\Controllers\Api\Auth\RegisterController::class, 'register']);
Route::middleware('auth:api')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::resource('users', 'App\Http\Controllers\Api\UserController');
    Route::resource('contacts', 'App\Http\Controllers\Api\ContactController');

    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});


