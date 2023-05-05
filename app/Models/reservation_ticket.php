<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class reservation_ticket extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'reservation_id',
        'ticket_id',
        'qty',
        'subtotal',
        'unique_code',
    ];

    public function reservation()
    {
        return $this->belongsTo(reservation::class,'reservation_id','id');
    }
    public function ticket()
    {
        return $this->belongsTo(ticket::class,'ticket_id','id');
    }
}
