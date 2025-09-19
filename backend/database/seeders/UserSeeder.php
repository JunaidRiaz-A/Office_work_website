<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run()
    {
        // Create default user if it doesn't exist
        User::firstOrCreate(
            ['email' => 'default@example.com'],
            [
                'id' => 1,
                'name' => 'Default User',
                'email' => 'default@example.com',
                'password' => bcrypt('password'),
            ]
        );

        // Create additional users
        User::firstOrCreate(
            ['email' => 'user2@example.com'],
            [
                'name' => 'User Two',
                'email' => 'user2@example.com',
                'password' => bcrypt('password'),
            ]
        );

        User::firstOrCreate(
            ['email' => 'user3@example.com'],
            [
                'name' => 'User Three',
                'email' => 'user3@example.com',
                'password' => bcrypt('password'),
            ]
        );
    }
}