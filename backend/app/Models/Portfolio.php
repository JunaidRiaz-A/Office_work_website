<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Portfolio extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'image',
        'portfolio_category',
    ];

    protected $casts = [
        'portfolio_category' => 'array', // Automatically cast to/from JSON
    ];
}


