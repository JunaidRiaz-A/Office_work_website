<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CaseStudy;

class CaseStudySeeder extends Seeder
{
    public function run()
    {
        CaseStudy::create([
            'category' => 'Technology',
            'client' => 'TechCorp',
            'location' => 'New York',
            'completed_date' => '2025-06-01',
            'project_value' => 50000,
            'manner' => 'Innovative',
            'designer' => 'John Doe',
            'title' => 'Virtual Court System',
            'case_explanation' => 'Necessity may give us our best virtual court system.',
            'case_heading' => 'Virtual Court System',
            'case_paragraph' => 'We denounce with righteous indignation and dislike men who are so beguiled...',
            'image_url' => 'images/virtual-court-system.jpg', // Placeholder image URL
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        CaseStudy::create([
            'category' => 'Healthcare',
            'client' => 'HealthInc',
            'location' => 'Los Angeles',
            'completed_date' => '2025-06-05',
            'project_value' => 75000,
            'manner' => 'Efficient',
            'designer' => 'Jane Smith',
            'title' => 'Telemedicine Platform',
            'case_explanation' => 'Revolutionizing healthcare with remote consultations.',
            'case_heading' => 'Telemedicine Platform',
            'case_paragraph' => 'This platform has transformed patient care with innovative technology...',
            'image_url' => 'images/telemedicine-platform.jpg', // Placeholder image URL
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        CaseStudy::create([
            'category' => 'Education',
            'client' => 'EduTech',
            'location' => 'Chicago',
            'completed_date' => '2025-06-08',
            'project_value' => 30000,
            'manner' => 'Creative',
            'designer' => 'Alice Johnson',
            'title' => 'Online Learning Hub',
            'case_explanation' => 'Enhancing education through digital platforms.',
            'case_heading' => 'Online Learning Hub',
            'case_paragraph' => 'A robust solution for remote learning and engagement...',
            'image_url' => 'images/online-learning-hub.jpg', // Placeholder image URL
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}