<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    protected $fillable = [
        'text',
        'image',
        'author_name',
        'author_role',
    ];
}