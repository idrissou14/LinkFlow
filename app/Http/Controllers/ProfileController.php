<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function show(User $user)
    {
        //charger les liens de l'utilisateur avec la relation "links"
        $user->load('links');

        //retourner la vue avec les données de l'utilisateur et ses liens
        return Inertia::render('screens/userProfile', [
            'profileUser' => $user,
            'links' => $user->links,
        ]);
    }
}