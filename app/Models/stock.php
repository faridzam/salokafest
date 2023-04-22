<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class stock extends Model
{
    use HasFactory;
    protected $fillable = [
        'id',
        'ticket_id',
        'stock_available',
        'stock_pending',
        'stock_bought',
    ];
}
