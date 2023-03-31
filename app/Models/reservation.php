<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'customer_id',
        'payment_method_id',
        'event_id',
        'snap_token',
        'order_id',
        'booking_code',
        'arrival_date',
        'bill',
        'status',
    ];
}
