<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Carbon\Carbon;

use App\Models\session_queue;

class SessionQueueController extends Controller
{
    public function checkSession(Request $request){

        // check is busy
        $session_active = session_queue::where('created_at', '>=', Carbon::now()->subMinutes(60))
        ->where('isActive', true)
        ->count();
        // create new session
        if ($session_active <= 100) {

            if (request('id') === '08993011870') {
                $session_created = 'existing';
            } else {
                $session_queue = session_queue::create([
                    'session_id' => request('id'),
                    'session_ex' => Carbon::parse(request('ex'), 'UTC')->setTimezone('Asia/Jakarta'),
                    'public_ip' => $request->ip(),
                    'isActive' => 1,
                ]);

                $session_created = $session_queue->id;
            }

        } else {
            $session_created = 'penuh';
        }

        return response()->json([
            'session_active' => $session_active,
            'session_created' => $session_created,
        ]);
    }
}
