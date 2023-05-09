<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Http\Request;

use Carbon\Carbon;

use App\Models\event;
use App\Models\ticket;
use App\Models\stock;
use App\Models\customer;
use App\Models\payment_method;
use App\Models\reservation;
use App\Models\reservation_ticket;
use App\Models\botmail_request_log;

class ReservationController extends Controller
{

    // sandbox
    // public function __construct(){
    //     $this->serverKey = 'SB-Mid-server-Mcyaglb-OqsipP7H_PPvHnLD';
    //     $this->isProduction = false;
    //     $this->isSanitized = true;
    //     $this->is3ds = true;
    //     $this->appendNotifUrl = "https://example.com/test1,https://example.com/test2";
    //     $this->overrideNotifUrl = "https://salokafest-staging.salokapark.com/api/midtrans-notif-handler";
    // }

    // production
    public function __construct(){
        $this->serverKey = 'Mid-server-vDvFh0-mEQcapYlBhoNayo4E';
        $this->isProduction = true;
        $this->isSanitized = true;
        $this->is3ds = true;
        $this->appendNotifUrl = "https://example.com/test1,https://example.com/test2";
        $this->overrideNotifUrl = "https://salokafest.salokapark.com/api/midtrans-notif-handler";
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
            'session_id' => request('session_id'),
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

        $totalBill = $totalBill + 6000;

        $sex = reservation::count();

        $reservation = reservation::create([
            'customer_id' => $customer->id,
            'event_id' => $request->event_id,
            'order_id' => "sf-".$customer->id.Carbon::now()->format('y').sprintf('%05d', substr(strval($sex), -5)),
            'arrival_date' => $bookingDate,
            'bill' => $totalBill,
            'status' => "created",
        ]);

        $itemDetails = [];

        foreach ($request->ticketOrder as $key => $value) {
            $subtotalBill = 6000;
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

                reservation_ticket::create([
                    'reservation_id' => $reservation->id,
                    'ticket_id' => $value['id'],
                    'qty' => $value['qty'],
                    'subtotal' => $ticket->price*$value['qty'],
                ]);

            }
        };
        $expireInMinutes = 10;

        $params = array(
            'transaction_details' => array(
                'order_id' => $reservation->order_id,
                'gross_amount' => $totalBill,
            ),
            // 'item_details' => $itemDetails,
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
            'id' => $reservation->id,
            'token' => $reservation->snap_token,
            'total_bill' => $totalBill,
        ]);
    }

    public function midtransNotificationHandler(Request $request) {
        \Midtrans\Config::$isProduction = $this->isProduction;
        \Midtrans\Config::$serverKey = $this->serverKey;
        $notif = new \Midtrans\Notification();

        $transaction = $notif->transaction_status;
        $type = $notif->payment_type;
        $order_id = $notif->order_id;
        $fraud = $notif->fraud_status;
        $grossAmount = $notif->gross_amount;

        switch ($type) {
            case 'gopay':
                $reservation = reservation::where('order_id', $order_id)
                ->update([
                    'payment_method_id' => 1,
                ]);
                break;
            case 'qris':
                $reservation = reservation::where('order_id', $order_id)
                ->update([
                    'payment_method_id' => 2,
                ]);
                break;
            case 'cstore':

                if ($notif->store = 'alfamart') {
                    $reservation = reservation::where('order_id', $order_id)
                    ->update([
                        'payment_method_id' => 3,
                    ]);
                } elseif ($notif->store = 'indomaret') {
                    $reservation = reservation::where('order_id', $order_id)
                    ->update([
                        'payment_method_id' => 4,
                    ]);
                }
                break;
            case 'bank_transfer':

                if ($notif->permata_va_number) {
                    $reservation = reservation::where('order_id', $order_id)
                    ->update([
                        'payment_method_id' => 9,
                    ]);
                } elseif ($notif->va_numbers[0]->bank) {
                    switch ($notif->va_numbers[0]->bank) {
                        case 'bca':
                            $reservation = reservation::where('order_id', $order_id)
                            ->update([
                                'payment_method_id' => 5,
                            ]);
                            break;
                        case 'bni':
                            $reservation = reservation::where('order_id', $order_id)
                            ->update([
                                'payment_method_id' => 6,
                            ]);
                            break;
                        case 'bri':
                            $reservation = reservation::where('order_id', $order_id)
                            ->update([
                                'payment_method_id' => 7,
                            ]);
                            break;

                        default:
                            # code...
                            break;
                    }
                }
                break;
            case 'echannel':
                $reservation = reservation::where('order_id', $order_id)
                ->update([
                    'payment_method_id' => 8,
                ]);
                break;

            default:
                # code...
                break;
        }

        if ($transaction == 'capture') {
            // For credit card transaction, we need to check whether transaction is challenge by FDS or not
            if ($type == 'credit_card'){
                if($fraud == 'challenge'){
                    // TODO set payment status in merchant's database to 'Challenge by FDS'
                    // TODO merchant should decide whether this transaction is authorized or not in MAP
                    echo "Transaction order_id: " . $order_id ." is challenged by FDS";
                }
                else {
                    // TODO set payment status in merchant's database to 'Success'
                    echo "Transaction order_id: " . $order_id ." successfully captured using " . $type;
                }
                }
            }
            else if ($transaction == 'settlement'){
                // TODO set payment status in merchant's database to 'Settlement'
                $reservationData = reservation::with('customer', 'payment_method', 'event')->where('order_id', $order_id)->first();
                $bookingCode = date('Ymd', strtotime( $reservationData->arrival_date )).$reservationData->payment_method_id.$reservationData->customer_id.$reservationData->id;

                $reservation = reservation::where('order_id', $order_id)
                ->update([
                    'booking_code' => $bookingCode,
                    'status' => 'settlement',
                ]);

                // $reserved = reserved::create([
                //     'reservation_id' => $reservationData->id,
                //     'customer_id' => $reservationData->customer_id,
                //     'status' => 0,
                // ]);

                $reservationTicket = reservation_ticket::with('reservation', 'ticket')->where('reservation_id', $reservationData->id)
                ->get();

                $client = new Client([
                    'headers' => [
                        'User-Agent' => 'postman-request',
                        'Content-Type' => 'application/json',
                        'Accept' => 'application/json',
                    ]
                ]);

                foreach ($reservationTicket as $key => $value) {
                    $reservation_ticket_update = reservation_ticket::find($value->id);
                    $reservation_ticket_update->unique_code = $bookingCode.sprintf('%02d', $value->qty).$value->id;
                    $reservation_ticket_update->update();

                    $stock = stock::where('ticket_id', $value->ticket_id)->first();
                    $stock_update = stock::find($stock->id);
                    $stock_update->stock_pending -= $value->qty;
                    $stock_update->stock_bought += $value->qty;
                    $stock_update->update();

                    if ((double)$grossAmount === $reservationData->bill) {
                        $count = reservation::whereDate('created_at', Carbon::today())
                        ->where('status', 'settlement')
                        ->count();
    
                        if ($count < 1950) {
                            $response = $client->post('https://botmail.salokapark.app/api/data/salokafest', [
                                'json' => [
                                    'event_name' => $reservationData->event->name,
                                    'ticket_type' => $value->ticket->name,
                                    'event_date' => strval(Carbon::parse($reservationData->event->date)->formatLocalized('%A %d %B %Y')),
                                    'event_time' => $reservationData->event->time,
                                    'event_subtitle' => $reservationData->event->subtitle,
                                    'ticket_qty' => strval($value->qty),
                                    'invoice' => strval($bookingCode.sprintf('%02d', $value->qty).$value->id),
                                    'cust_name' => $reservationData->customer->name,
                                    'email' => $reservationData->customer->email,
                                    'qrcode' => $reservationData->booking_code,
                                    'resv_date' => strval(Carbon::parse($reservationData->arrival_date)->formatLocalized('%A %d %B %Y')),
                                    'resv_paytime' => strval(Carbon::parse($reservationData->updated_at)->formatLocalized('%A %d %B %Y')),
                                    'status' => 100,
                                    'mail_sender' => 1
                                ]
                            ]);
                            $log = new botmail_request_log;
                            $log->status = $response->getStatusCode();
                            $log->message = $response->getBody(true);
                            $log->save();
                        } else {
                            $response = $client->post('https://botmail.salokapark.app/api/data/salokafest', [
                                'json' => [
                                    'event_name' => $reservationData->event->name,
                                    'ticket_type' => $value->ticket->name,
                                    'event_date' => strval(Carbon::parse($reservationData->event->date)->formatLocalized('%A %d %B %Y')),
                                    'event_time' => $reservationData->event->time,
                                    'event_subtitle' => $reservationData->event->subtitle,
                                    'ticket_qty' => strval($value->qty),
                                    'invoice' => strval($bookingCode.sprintf('%02d', $value->qty).$value->id),
                                    'cust_name' => $reservationData->customer->name,
                                    'email' => $reservationData->customer->email,
                                    'qrcode' => $reservationData->booking_code,
                                    'resv_date' => strval(Carbon::parse($reservationData->arrival_date)->formatLocalized('%A %d %B %Y')),
                                    'resv_paytime' => strval(Carbon::parse($reservationData->updated_at)->formatLocalized('%A %d %B %Y')),
                                    'status' => 100,
                                    'mail_sender' => 2
                                ]
                            ]);
                            $log = new botmail_request_log;
                            $log->status = $reponse->getStatusCode();
                            $log->message = $reponse->getBody(true);
                            $log->save();
                        }
                    }
                    
                }

                // $affiliateID = '571343950';
                // $zealsCallback = Http::post('https://demo.zeals.asia/apiv1/AMPcallback/', [
                //     'encrypted_code' => $reservationData->zeals_code,
                //     'aff_id' => $affiliateID,
                //     'unique_random_code' => $order_id,
                //     'transaction_value' => $reservationData->bill
                // ])
                // ->throw()
                // ->json();

                // $customer = customer::find($reservationData->customer_id);
                // $reservationBill = $reservationData->bill;

                // if(is_null($reservationData->zeals_code)){
                //     //
                // } else {
                //     $response = $client->post('https://app.zeals.asia/apiv1/AMPcallback', [
                //         'json' => [
                //             'encrypted_code' => $reservationData->zeals_code,
                //             'aff_id' => $affiliateID,
                //             'unique_random_code' => $order_id,
                //             'transaction_value' => $reservationData->bill
                //         ]
                //     ]);
                //     $data = json_decode($response->getBody(), true);

                //     zeals_callback_history::create([
                //         'response' => $response->getBody()->getContents(),
                //         'status_code' => $response->getStatusCode(),
                //     ]);
                // }

                // $opts = array('http'=>array('header' => "User-Agent:MyAgent/1.0\r\n"));
                // $context = stream_context_create($opts);
                // // $header = file_get_contents('https://www.example.com',false,$context);
                // $header = file_get_contents('https://demo.zeals.asia/platform/api/AMPcallback/'.$affiliateID.'/CMP00000050', false, $context);

            }
            else if($transaction == 'pending'){
                // TODO set payment status in merchant's database to 'Pending'
                $reservation = reservation::where('order_id', $order_id)
                ->update([
                    'status' => 'pending',
                ]);
                $reservationData = reservation::where('order_id', $order_id)->first();
                $reservationTicket = reservation_ticket::where('reservation_id', $reservationData->id)
                ->get();
                foreach ($reservationTicket as $key => $value) {

                    $stock = stock::where('ticket_id', $value->ticket_id)->first();
                    $stock_update = stock::find($stock->id);
                    $stock_update->stock_available -= $value->qty;
                    $stock_update->stock_pending += $value->qty;
                    $stock_update->update();
                }
            }
            else if ($transaction == 'deny') {
                // TODO set payment status in merchant's database to 'Denied'
                $reservation = reservation::where('order_id', $order_id)
                ->update([
                    'status' => 'deny',
                ]);

                $reservationData = reservation::where('order_id', $order_id)->first();
                $reservationTicket = reservation_ticket::where('reservation_id', $reservationData->id)
                ->get();

                foreach ($reservationTicket as $key => $value) {

                    $stock = stock::where('ticket_id', $value->ticket_id)->first();
                    $stock_update = stock::find($stock->id);
                    $stock_update->stock_pending -= $value->qty;
                    $stock_update->stock_available += $value->qty;
                    $stock_update->update();
                }

            }
            else if ($transaction == 'expire') {
                // TODO set payment status in merchant's database to 'expire'

                $reservationData = reservation::where('order_id', $order_id)->first();
                $reservationTicket = reservation_ticket::where('reservation_id', $reservationData->id)
                ->get();

                if($reservationData->status === 'pending'){
                    foreach ($reservationTicket as $key => $value) {
                        $stock = stock::where('ticket_id', $value->ticket_id)->first();
                        $stock_update = stock::find($stock->id);
                        $stock_update->stock_pending -= $value->qty;
                        $stock_update->stock_available += $value->qty;
                        $stock_update->update();
                    }
                }

                $reservation = reservation::where('order_id', $order_id)
                ->update([
                    'status' => 'expire',
                ]);

            }
            else if ($transaction == 'cancel') {
                // TODO set payment status in merchant's database to 'Denied'
                $reservation = reservation::where('order_id', $order_id)
                ->update([
                    'status' => 'cancel',
                ]);

                $reservationData = reservation::where('order_id', $order_id)->first();
                $reservationTicket = reservation_ticket::where('reservation_id', $reservationData->id)
                ->get();

                foreach ($reservationTicket as $key => $value) {

                    $stock = stock::where('ticket_id', $value->ticket_id)->first();
                    $stock_update = stock::find($stock->id);
                    $stock_update->stock_pending -= $value->qty;
                    $stock_update->stock_available += $value->qty;
                    $stock_update->update();
                }
            }

    }


    public function LoopEmail(Request $request) {

        $client = new Client([
            'headers' => [
                'User-Agent' => 'postman-request',
                'Content-Type' => 'application/json',
                'Accept' => 'application/json',
            ]
        ]);
        for ($i=0 ; $i <= 500; $i++) {
            $response = $client->post('https://botmail.salokapark.app/api/data/salokafest', [
                'json' => [
                    'event_name' => "sunatan",
                    'ticket_type' => "sunatan",
                    'event_date' => "sunatan",
                    'event_time' => "sunatan",
                    'event_subtitle' =>"sunatan",
                    'ticket_qty' => "sunatan",
                    'invoice' => "sunatan",
                    'cust_name' =>"sunatan",
                    'email' => "skinel123@gmail.com",
                    'qrcode' => "sunatan",
                    'resv_date' => "sunatan",
                    'resv_paytime' => "sunatan",
                    'status' => 100,
                    'mail_sender' => 1
                ]
            ]);
        }
        for ($i=0 ; $i >= 500; $i++) {
            $response = $client->post('https://botmail.salokapark.app/api/data/salokafest', [
                'json' => [
                    'event_name' => "sunatan",
                    'ticket_type' => "sunatan",
                    'event_date' => "sunatan",
                    'event_time' => "sunatan",
                    'event_subtitle' =>"sunatan",
                    'ticket_qty' => "sunatan",
                    'invoice' => "sunatan",
                    'cust_name' =>"sunatan",
                    'email' => "mishbahul09munir@gmail.com",
                    'qrcode' => "sunatan",
                    'resv_date' => "sunatan",
                    'resv_paytime' => "sunatan",
                    'status' => 100,
                    'mail_sender' => 2
                ]
            ]);
        }
    }
}
