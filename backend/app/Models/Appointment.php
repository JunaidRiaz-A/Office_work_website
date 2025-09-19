<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone_number',
        'website',
        'date_selected',
        'check', // Added check to fillable array
    ];

    protected $dates = ['date_selected'];
}