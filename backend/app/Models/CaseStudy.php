<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CaseStudy extends Model
{
    use HasFactory;

    protected $table = 'case_studies';
    protected $fillable = [
        'category',
        'client',
        'location',
        'completed_date',
        'project_value',
        'manner',
        'designer',
        'title',
        'case_explanation',
        'case_heading',
        'case_paragraph',
        'image_url', // Add this line
    ];

    protected $dates = [
        'completed_date',
    ];
}