<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('cookie_consents', function (Blueprint $table) {
            $table->id();
            $table->enum('consent', ['accepted', 'rejected']);
            $table->text('user_agent')->nullable();
            $table->text('page_url')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('cookie_consents');
    }
};

