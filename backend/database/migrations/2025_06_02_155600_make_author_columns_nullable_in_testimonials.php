<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class MakeAuthorColumnsNullableInTestimonials extends Migration
{
    public function up()
    {
        Schema::table('testimonials', function (Blueprint $table) {
            $table->string('author_name')->nullable()->change();
            $table->string('author_role')->nullable()->change();
        });
    }

    public function down()
    {
        Schema::table('testimonials', function (Blueprint $table) {
            $table->string('author_name')->nullable(false)->change();
            $table->string('author_role')->nullable(false)->change();
        });
    }
}