<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\LinkController;
use App\Http\Controllers\ProfileController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('welcome');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('home', [LinkController::class, 'index'])->name('home');

    Route::resource('links', LinkController::class);
    
});

    //route accessible a tout le monde pour voir le profil d'un utilisateur
    Route::get('/profile/{user}', [ProfileController::class, 'show'])->name('profile.show');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
