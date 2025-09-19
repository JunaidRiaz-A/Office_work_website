<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJobCandidatesTable extends Migration
{
    public function up()
    {
        Schema::create('job_candidates', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('phone');
            $table->string('resume')->nullable();
            $table->boolean('checked')->default(false);
            $table->unsignedBigInteger('job_id')->nullable(); // Add job_id column
            $table->foreign('job_id')->references('id')->on('jobs')->onDelete('cascade'); // Foreign key to jobs table
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('job_candidates');
    }
}