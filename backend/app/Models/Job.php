<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;

    // Fields that are mass assignable
    protected $fillable = [
        'title',
        'category',
        'mode',
        'location',
        'salary',
        'description',
        'requirements',
        'skills',
        'experience',
        'date_posted',
        'offered_salary',
        'expiry_date',
        'gender',
        'qualification',
    ];

    // Define the relationship with JobCandidate
    public function jobCandidates()
    {
        return $this->hasMany(JobCandidate::class, 'job_id');
    }
}