<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Link;

class LinkController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        $links = [];

        if ($user) {
            $links = $user->links;
        }

        return inertia('screens/home', ['links' => $links, 'user' => $user]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => ['required','string','max:255'],
            'url' =>  ['required','url','max:255'],
        ]);

        Link::create([
            'title' => $validatedData['title'],
            'url' => $validatedData['url'],
            'user_id' => auth()->id(),
        ]);

        return redirect()->back()->with('success', 'Link created successfully.');
        
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $link = Link::findOrFail($id);

        if($link->user_id !== auth()->id()){
            abord(403, 'erreur unauthorized action');
        }

        $validatedData = $request->validate([
            'title' => ['required','string','max:255'],
            'url' =>  ['required','url','max:255'],
        ]);

        $link->update($validatedData);
         return redirect()->back()->with('success', 'Link created successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $link = Link::findOrFail($id);
        $link->delete();
    }
}
