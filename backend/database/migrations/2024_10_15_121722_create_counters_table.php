<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('counters', function (Blueprint $table) {
        $table->id();
        $table->integer('smart_solutions')->default(0);
        $table->integer('satisfied_clients')->default(0);
        $table->integer('it_specialists')->default(0);
        $table->integer('projects_completed')->default(0);
        $table->timestamps();
    });
}

public function down()
{
    Schema::dropIfExists('counters');
}

};
