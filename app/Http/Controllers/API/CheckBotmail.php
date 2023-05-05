<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Carbon\Carbon;

use App\Models\reservation;

class CheckBotmail extends Controller
{
    //

    public function checkBotmail(Request $request){

        try {
            $client = new Client([
                'headers' => ['Content-Type' => 'application/json']
            ]);

            $count = reservation::whereDate('created_at', Carbon::today())
            ->where('status', 'settlement')
            ->count();

            if ($count < 1950) {
                $responseMail = $client->post('https://botmail.salokapark.app/api/data/salokafest', [
                    'json' => [
                        'event_name' => "event_name_test",
                        'ticket_type' => "ticket_type_test",
                        'event_date' => "event_date_test",
                        'event_time' => "event_time_test",
                        'event_subtitle' => "event_subtitle_test",
                        'ticket_qty' => "ticket_qty_test",
                        'invoice' => "invoice_test",
                        'cust_name' => "cust_name_test",
                        'email' => "email_test",
                        'qrcode' => "qrcode_test",
                        'resv_date' => "resv_date",
                        'resv_paytime' => "resv_paytime",
                        'status' => 100,
                        'mail_sender' => 1,
                    ]
                ]);
            } else {
                $responseMail = $client->post('https://botmail.salokapark.app/api/data/salokafest', [
                    'json' => [
                        'event_name' => "event_name_test",
                        'ticket_type' => "ticket_type_test",
                        'event_date' => "event_date_test",
                        'event_time' => "event_time_test",
                        'event_subtitle' => "event_subtitle_test",
                        'ticket_qty' => "ticket_qty_test",
                        'invoice' => "invoice_test",
                        'cust_name' => "cust_name_test",
                        'email' => "email_test",
                        'qrcode' => "qrcode_test",
                        'resv_date' => "resv_date",
                        'resv_paytime' => "resv_paytime",
                        'status' => 100,
                        'mail_sender' => 2,
                    ]
                ]);
            }
    
            return response()->json([
                'responseMail' => $responseMail,
            ]);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                'error' => $th,
            ]);
        }
    }
}
