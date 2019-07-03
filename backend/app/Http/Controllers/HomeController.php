<?php


namespace App\Http\Controllers;


use App\Events\TestEvent;
use App\Jobs\AddUserJob;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\View;

class HomeController
{
    public function index(Request $request)
    {

        Redis::set('name', 'Viadnteadra');

        $name = Redis::get('name');

        $user = User::findOrFail(1);

        event(new TestEvent($user));
    }
}