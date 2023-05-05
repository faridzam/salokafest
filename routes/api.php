<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\API\EventController;
use App\Http\Controllers\API\TicketController;
use App\Http\Controllers\API\ReservationController;
use App\Http\Controllers\API\SessionQueueController;
use App\Http\Controllers\API\CheckBotmail;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//events
Route::get('get-events', [EventController::class, 'getMainEvent']);
//tickets
Route::post('get-tickets-by-event', [TicketController::class, 'getTicketsByEvent']);
Route::post('check-available-stock', [TicketController::class, 'checkAvailableStock']);
//reservations
Route::post('create-reservation', [ReservationController::class, 'createReservation']);
//session
Route::post('check-session', [SessionQueueController::class, 'checkSession']);
// midtrans notif handler
Route::post('midtrans-notif-handler', [ReservationController::class, 'midtransNotificationHandler']);

// check botmail
Route::post('check-botmail', [CheckBotmail::class, 'checkBotmail']);