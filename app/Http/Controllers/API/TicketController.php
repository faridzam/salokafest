<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Carbon\Carbon;

use App\Models\event;
use App\Models\ticket;
use App\Models\stock;

class TicketController extends Controller
{
    public function getTicketsByEvent(Request $request){
        $tickets = ticket::where('event_id', $request->event_id)
        ->get();

        foreach ($tickets as $key => $value) {
            $stock = stock::where('ticket_id', $value->id)->first();
            $value['stock_available'] = $stock->stock_available;
            $value['stock_pending'] = $stock->stock_pending;
            $value['stock_bought'] = $stock->stock_bought;
        }

        return response()->json([
            'tickets' => $tickets,
        ]);
    }

    public function checkAvailableStock(Request $request){
        //
        $stock = stock::where('ticket_id', $request->ticket_id)
        ->first();

        return response()->json([
            'stock_available' => $stock->stock_available,
            'stock_pending' => $stock->stock_pending,
            'stock_bought' => $stock->stock_bought,
        ]);
    }
}
