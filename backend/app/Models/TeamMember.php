<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    use HasFactory;

    // Specify the table associated with the model (optional)
    protected $table = 'team_members';

    // Specify the fillable attributes for mass assignment
    protected $fillable = [
        'name',  // Team member's name
        'role',  // Team member's role
        'photo', // Optional: URL or path to the team member's photo
    ];

    // Optionally, you can define hidden attributes
    protected $hidden = [
        'created_at',
        'updated_at',
    ];
}