<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Nabil',
            'email' => 'karanabil@gmail.com',
            'password' => bcrypt('karanabil2004'),
            'email_verified_at' => now(),
        ]);
        Project::factory()
            ->count(30)
            ->hasTasks(30)
            ->create();
    }
}
