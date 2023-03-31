<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class event extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'name',
        'title',
        'subtitle',
        'location',
        'date',
        'time',
        'description',
        'image',
        'available_start',
        'available_end',
    ];
}
