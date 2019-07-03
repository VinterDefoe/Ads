<?php


namespace App\Http\Controllers\Auth;


use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class ApiIdentification
{
    /**
     * @param Request $request
     * @return mixed
     * @throws \App\Exceptions\ModelNotFoundException
     */
    public function identificationByEmail(Request $request)
    {
        $email = $request->input('email');
        $user = User::identificationByEmail($email);
        return Response::json($user);
    }
}