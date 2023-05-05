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

    public function customer()
    {
        return $this->belongsTo(customer::class,'customer_id','id');
    }
    public function payment_method()
    {
        return $this->belongsTo(payment_method::class,'payment_method_id','id');
    }
    public function event()
    {
        return $this->belongsTo(event::class,'event_id','id');
    }
}
