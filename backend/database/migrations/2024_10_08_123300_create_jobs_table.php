<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJobsTable extends Migration
{
    public function up()
    {
        Schema::create('jobs', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // Updated field name
            $table->string('category'); // Updated field name
            $table->string('mode'); // Updated field name
            $table->string('location'); // Updated field name
            $table->decimal('salary', 10, 2)->nullable(); // Updated field name and optional salary field
            $table->text('description'); // Updated field name
            $table->text('requirements'); // Updated field name
            $table->string('skills')->nullable(); // Updated field name for skills and experience
            $table->string('experience'); // Years of experience
            $table->date('date_posted'); // Date job was posted
            $table->decimal('offered_salary', 10, 2)->nullable(); // Offered salary
            $table->date('expiry_date'); // Expiry date of the job listing
            $table->string('gender')->nullable(); // Gender specification
            $table->string('qualification'); // Education qualification
            $table->timestamps(); // Includes created_at and updated_at
        });
    }

    public function down()
    {
        Schema::dropIfExists('jobs');
    }
}
