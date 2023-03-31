<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ticket extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'event_id',
        'name',
        'description',
        'price',
        'min_qty',
        'max_qty',
    ];
}
