<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class session_queue extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'session_id',
        'session_ex',
        'public_ip',
        'isActive',
    ];
}
