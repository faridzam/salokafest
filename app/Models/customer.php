<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class customer extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'session_code',
        'name',
        'date_of_birth',
        'phone',
        'email',
        'address',
    ];
}
