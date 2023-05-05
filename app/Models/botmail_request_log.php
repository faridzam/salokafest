<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class botmail_request_log extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'status',
        'message',
    ];
}
