<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{

    public function index(Request $request)
    {
        $users = User::where('id', auth()->user()->id)->filter($request->all())->paginate(1);
        return UserResource::collection($users);
    }

    public function store(Request $request)
    {
        $data = $request->all();
        if($data['password']){
            $data['password'] = bcrypt($data['password']);
        }
        $user = User::create($data);
        return new UserResource($user);

    }

    public function show(User $user)
    {
        $user->where('id', auth()->user()->id);
        return new UserResource($user);
    }

    public function update(UserRequest $request, User $user)
    {
        $data = $request->all();
        if(isset($data['password']) && $data['password'] != ""){
            $data['password'] = bcrypt($data['password']);
        }else{
            $data['password'] = $user->password;
        }
        $user->update($data);
        return new UserResource($user);
    }

    public function delete(User $user)
    {
        $user->delete();
        return response()->json(null, 204);
    }

}
