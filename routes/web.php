<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/reservation', function () {
    return Inertia::render('Welcome');
});

Route::get('/check-status', function () {
    return Inertia::render('CheckStatus/CheckStatus');
});

Route::get('/', function () {
    return Inertia::render('GetSession');
});

Route::get('/unauthorized', function () {
    return Inertia::render('Sessions/Unauthorized', [
        'id' => 1,
        'title' => "Ooops!!!",
        'subtitle' => "Kamu tidak ada dalam antrian",
        'text1' => "Antrian dapat kamu akses",
        'text2' => "melalui website salokapark.com",
    ]);
});
Route::get('/expired', function () {
    return Inertia::render('Sessions/Unauthorized', [
        'id' => 2,
        'title' => "Ooops!!!",
        'subtitle' => "Sesi kamu sudah berakhir.",
        'text1' => "Masuk ke halaman",
        'text2' => "pembelian tiket lagi yaaa...",
    ]);
});

require __DIR__.'/auth.php';
