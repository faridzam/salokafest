<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Carbon\Carbon;

use App\Models\event;
use App\Models\ticket;

class EventController extends Controller
{
    public function getMainEvent(Request $request){
        $events = event::where('available_start', '<=', Carbon::today())
        ->where('available_end', '>=', Carbon::today())
        ->get();

        foreach ($events as $key => $event) {
            $ticket = ticket::where('event_id', $event->id)
            ->orderBy('price', 'asc')
            ->first();

            $event['start_from'] = $ticket->price;
        }

        return response()->json([
            'events' => $events,
        ]);
    }
}
