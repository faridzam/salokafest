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
}
