<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCaseStudiesTable extends Migration
{
    public function up()
    {
        Schema::create('case_studies', function (Blueprint $table) {
            $table->id();
            $table->string('category');
            $table->string('client');
            $table->string('location');
            $table->date('completed_date');
            $table->decimal('project_value', 10, 2);
            $table->string('manner');
            $table->string('designer');
            $table->string('title');
            $table->text('case_explanation');
            $table->string('case_heading');
            $table->text('case_paragraph');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('case_studies');
    }
}
