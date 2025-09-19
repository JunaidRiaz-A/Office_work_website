<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class JobCandidate extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'resume',
        'checked',
        'job_id', // Add job_id to fillable
    ];

    // Define the relationship with the Job model
    public function job()
    {
        return $this->belongsTo(Job::class);
    }
}