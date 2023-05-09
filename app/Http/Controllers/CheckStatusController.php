<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\{
    customer,
    reservation,
    reservation_ticket,
    payment_method,
    event
};

class CheckStatusController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        //
        if ($request->query('search')) {
            $search = $request->query('search');
            $customer =  customer::where('email', $search)->pluck('id');
            $reservations = reservation::query()
            ->when($search, function($query, $search) use($customer){
                $query->whereIn('customer_id', $customer);
            })->paginate(15)->through(function ($reservation) {
                $customer = customer::find($reservation->customer_id);
                $payment_method = payment_method::find($reservation->payment_method_id);
                $event = event::find($reservation->event_id);
                return [
                    'id' => $reservation->id,
                    'customer' => $customer,
                    'payment_method' => $payment_method,
                    'event' => $event,
                    'snap_token' => $reservation->snap_token,
                    'order_id' => $reservation->order_id,
                    'booking_code' => $reservation->booking_code,
                    'arrival_date' => $reservation->arrival_date,
                    'bill' => $reservation->bill,
                    'status' => $reservation->status,
                ];
            })->withQueryString();
            $filter = [
                'search' => $search,
            ];
        } else {
            $reservations = [];
            $filter = [
                'search' => '',
            ];
        }

        if ($request->query('selectedID')) {
            $reservation = reservation::with('customer', 'payment_method', 'event')->find($request->query('selectedID'));
            $reservation_ticket = reservation_ticket::where('reservation_id', $reservation->id)->get();

            $filter['selectedID'] = $request->query('selectedID');
        } else {
            //
            $reservation = [];
            $reservation_ticket = [];
            $filter['selectedID'] = '';
        }

        return Inertia::render('CheckStatus/CheckStatus', [
            'reservations' => $reservations,
            'reservationDetail' => $reservation,
            'reservation_ticket' => $reservation_ticket,
            'filter' => $filter
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {

        return Inertia::render('CheckStatus/CheckStatus', [
            'reservation' => $reservation,
            'reservation_ticket' => $reservation_ticket
        ]);
    }
}
