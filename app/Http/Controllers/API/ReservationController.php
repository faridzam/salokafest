<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Carbon\Carbon;

use App\Models\event;
use App\Models\ticket;
use App\Models\stock;
use App\Models\customer;
use App\Models\payment_method;
use App\Models\reservation;
use App\Models\reservation_ticket;

class ReservationController extends Controller
{

    public function __construct(){
        $this->serverKey = 'SB-Mid-server-Mcyaglb-OqsipP7H_PPvHnLD';
        $this->isProduction = false;
        $this->isSanitized = true;
        $this->is3ds = true;
        $this->appendNotifUrl = "https://example.com/test1,https://example.com/test2";
        $this->overrideNotifUrl = "https://example.com/test1";
    }

    public function createReservation(Request $request){
        //

        // Set your Merchant Server Key
        \Midtrans\Config::$serverKey = $this->serverKey;
        // Set to Development/Sandbox Environment (default). Set to true for Production Environment (accept real transaction).
        \Midtrans\Config::$isProduction = $this->isProduction;
        // Set sanitization on (default)
        \Midtrans\Config::$isSanitized = $this->isSanitized;
        // Set 3DS transaction for credit card to true
        \Midtrans\Config::$is3ds = $this->is3ds;
        // Add new notification url(s) alongside the settings on Midtrans Dashboard Portal (MAP)
        // Config::$appendNotifUrl = $this->appendNotifUrl;
        // Use new notification url(s) disregarding the settings on Midtrans Dashboard Portal (MAP)
        \Midtrans\Config::$overrideNotifUrl = $this->overrideNotifUrl;

        $bookingDate = event::find($request->event_id)->date;
        $dateOfBirth = date('Y-m-d', strtotime($request->dateOfBirth));

        $customer = customer::create([
            'session_code' => request('session_code'),
            'name' => request('name'),
            'date_of_birth' => $dateOfBirth,
            'phone' => request('phone'),
            'email' => request('email'),
            'address' => request('address'),
        ]);

        $totalBill = 0;

        foreach ($request->ticketOrder as $key => $value) {
            if ($value['qty'] > 0) {
                $totalBill += ($value['qty'] * $value['price']);
            }
        };

        $sex = reservation::count();

        $reservation = reservation::create([
            'customer_id' => $customer->id,
            'event_id' => $request->event_id,
            'order_id' => "sf-test-local".Carbon::now()->format('y').sprintf('%05d', substr(strval($sex), -5)),
            'arrival_date' => $bookingDate,
            'bill' => $totalBill,
            'status' => "created",
        ]);

        $itemDetails = [];

        foreach ($request->ticketOrder as $key => $value) {
            $subtotalBill = 0;
            if ($value['qty'] > 0) {
                $ticket = ticket::find($value['id']);

                $subtotalBill += ($value['qty'] * $ticket->price);
                array_push($itemDetails, [
                    'id' => $value['id'],
                    'name' => $value['name'],
                    'quantity' => $value['qty'],
                    'price' => $ticket->price,
                    // 'subtotal' => $subtotalBill,
                ]);
            }
        };

        $expireInMinutes = 5;

        $params = array(
            'transaction_details' => array(
                'order_id' => $reservation->order_id,
                'gross_amount' => $totalBill,
            ),
            'item_details' => $itemDetails,
            'credit_card' => array(
                'secure' => true,
            ),
            'customer_details' => array(
                'first_name' => $request->name,
                'last_name' => "",
                'phone' => $request->phone,
                'email' => $request->email,
            ),
            "expiry" => array(
                "start_time" => Carbon::now()->format('Y-m-d H:i:s')." +0700",
                "unit" => "minutes",
                "duration" => $expireInMinutes,
            )
        );

        $reservation = reservation::find($reservation->id);

        if (!$reservation->snap_token) {

            $snapToken = \Midtrans\Snap::getSnapToken($params);
            $reservation->snap_token = $snapToken;
            $reservation->updated_at = Carbon::now();
            $reservation->update();

        } else {
            $snapToken = $reservation->snapToken;
        }

        return response()->json([
            'token' => $reservation->snap_token,
        ]);
    }
}
