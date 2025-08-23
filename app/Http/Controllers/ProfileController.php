<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function show(User $user)
    {   
        //charger les liens de l'utilisateur avec la relation "links"S
        
        $user->load('links');
        
        if(!$user){
            abort(403, 'User not found');
        }
        //retourner la vue avec les données de l'utilisateur et ses liens
        return Inertia::render('screens/userProfile', [
            'profileUser' => $user,
            'links' => $user->links,
        ]);
    }
}
