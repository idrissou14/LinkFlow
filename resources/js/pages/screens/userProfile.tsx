import React from 'react';
import { usePage } from '@inertiajs/react';
import { SplashCursor } from "@/components/ui/splash-cursor"

// Ces interfaces définissent la structure des données attendues par la page.
// Elles devraient idéalement se trouver dans un fichier de types partagé.
interface User {
    id: number;
    name: string;
    email: string; // L'email est utilisé pour générer l'avatar, mais ne sera pas affiché.
    bio: string;
}

interface Link {
    id: number;
    title: string;
    url: string;
}

// Les props de la page, fournies par le contrôleur Laravel.
interface PageProps {
    profileUser: User;
    links: Link[];
    [key: string]: any;
}

/**
 * Affiche le profil public d'un utilisateur.
 * Ce composant est "passif", il ne fait qu'afficher les données reçues.
 */
export default function UserProfile() {
    // Récupère les données de l'utilisateur et ses liens passées par le contrôleur Inertia.
    const { profileUser: user, links } = usePage<PageProps>().props;

    return (
        <>
            {/* effet au deplacement du curseur de la souris */}
            <SplashCursor />

            <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#232526] flex items-center justify-center px-4 py-8">
                <div className="relative w-full max-w-lg">
                    {/* Carte Utilisateur */}
                    <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 flex flex-col items-center border border-white/20 text-center">
                        <div className="relative mb-6">
                            <img
                                className="w-28 h-28 rounded-full border-4 border-cyan-400 shadow-lg object-cover"
                                src={'https://api.dicebear.com/7.x/identicon/svg?seed=' + encodeURIComponent(user.email)}
                                alt="Avatar de l'utilisateur"
                            />
                        </div>
                        <h1 className="text-2xl font-extrabold text-white tracking-tight">{user.name}</h1>
                        <h1 className="text-2xl font-extrabold text-gray tracking-tight">{user.email}</h1>
                        <p className="text-gray-300 text-center mt-3 text-base">{user.bio}</p>
                    </div>

                    {/* Liste des Liens */}
                    <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20">
                        <h2 className="text-lg font-semibold text-cyan-200 mb-4 tracking-wide text-center">Liens</h2>
                        <ul className="space-y-3">
                            {links.length === 0 ? (
                                <li className="text-gray-400 text-center py-8">Cet utilisateur n'a pas encore ajouté de liens.</li>
                            ) : (
                                links.map((link) => (
                                    <li
                                        key={link.id}
                                        className="flex items-center justify-center bg-white/5 hover:bg-cyan-900/30 transition rounded-xl px-4 py-3 group"
                                    >
                                        <a
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 text-cyan-100 font-medium truncate hover:underline text-center"
                                        >
                                            {link.title}
                                        </a>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
