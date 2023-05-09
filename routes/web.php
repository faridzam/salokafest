<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CheckStatusController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use Carbon\Carbon;

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

// Route::get('/check-status', function () {
//     return Inertia::render('CheckStatus/CheckStatus');
// });

Route::resource('/check-status', CheckStatusController::class);

Route::get('/', function () {

    $startDate = \Carbon\Carbon::createFromFormat('Y-m-d h:i:s','2023-05-10 09:00:00');
    $endDate = \Carbon\Carbon::createFromFormat('Y-m-d h:i:s','2023-06-30 00:00:00');

    if (Carbon::now()->between($startDate, $endDate)) {
        return Inertia::render('GetSession');
    } else {
        return Inertia::render('Sessions/Countdown');
    }
});

Route::get('/faridzamganteng', function () {
    return Inertia::render('GetSession');
});

Route::get('/unauthorized', function () {
    return Inertia::render('Sessions/Unauthorized', [
        'id' => 1,
        'title' => "Ooops!!!",
        'subtitle' => "Kamu tidak ada dalam antrian",
        'text1' => "Antrian dapat kamu akses",
        'text2' => "melalui website salokafest.salokapark.com",
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
Route::get('/busy', function () {
    return Inertia::render('Sessions/Unauthorized', [
        'id' => 3,
        'title' => "Ooops!!!",
        'subtitle' => "Antrian sudah penuh",
        'text1' => "Tunggu beberapa saat",
        'text2' => "dan kunjungi lagi link pembelian",
    ]);
});
Route::get('/success', function () {
    return Inertia::render('Sessions/Unauthorized', [
        'id' => 4,
        'title' => "Yeay!!!",
        'subtitle' => "Pembayaran berhasil",
        'text1' => "Kode booking akan dikirim",
        'text2' => "melalui email kamu, ditunggu...",
    ]);
});

require __DIR__.'/auth.php';
