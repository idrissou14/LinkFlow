import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import AppLogo from '@/components/app-logo';
import { ArrowRight, Link as LinkIcon, QrCode, Palette } from 'lucide-react';
import { SplashCursor } from '@/components/ui/splash-cursor';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Bienvenue sur Link-Hub" />
            <SplashCursor />
            <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#232526] text-white">
                {/* Header */}
                <header className="absolute top-0 left-0 right-0 p-6">
                    <div className="container mx-auto flex justify-between items-center">
                                                <div className="flex items-center text-2xl font-bold">
                            <span className="text-white">Link</span>
                            <span className="ml-1.5 rounded-md bg-cyan-500 px-2 py-1 text-white">Flow</span>
                        </div>
                        <nav className="flex items-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('home')}
                                    className="inline-block rounded-lg px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                                >
                                    Tableau de bord
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="inline-block rounded-lg px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                                    >
                                        Se connecter
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-block rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow-lg hover:bg-cyan-600 transition-colors"
                                    >
                                        S'inscrire
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <main className="container mx-auto flex flex-col items-center justify-center min-h-screen px-4 text-center">
                    <div className="max-w-3xl">
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                            Votre Hub de Liens. Centralisé. Simplifié.
                        </h1>
                        <p className="mt-6 text-lg md:text-xl text-gray-300">
                            Rassemblez tous vos liens en un seul endroit et partagez votre profil unique avec le monde entier. Simple, rapide et efficace.
                        </p>
                        <div className="mt-10 flex justify-center gap-4">
                            <Link
                                href={route('register')}
                                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 px-8 py-3 text-lg font-bold text-white shadow-2xl hover:scale-105 transition-transform"
                            >
                                Créer mon Hub <ArrowRight className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                </main>

                {/* Features Section */}
                <section className="py-20 bg-black/10">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">Tout ce dont vous avez besoin</h2>
                        <div className="grid md:grid-cols-3 gap-12 text-center">
                            <div className="flex flex-col items-center">
                                <div className="p-4 bg-white/10 rounded-full mb-4">
                                    <LinkIcon className="h-8 w-8 text-cyan-400" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Centralisez vos liens</h3>
                                <p className="text-gray-400">Regroupez tous vos réseaux sociaux, sites web, et projets sous un seul lien facile à gérer.</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="p-4 bg-white/10 rounded-full mb-4">
                                    <QrCode className="h-8 w-8 text-cyan-400" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Partage Facile</h3>
                                <p className="text-gray-400">Partagez votre profil instantanément grâce à un QR code unique, parfait pour les cartes de visite et les événements.</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="p-4 bg-white/10 rounded-full mb-4">
                                    <Palette className="h-8 w-8 text-cyan-400" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Personnalisation</h3>
                                <p className="text-gray-400">Adaptez l'apparence de votre profil pour qu'il corresponde à votre identité de marque ou à votre style personnel.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="py-8 bg-black/20">
                    <div className="container mx-auto text-center text-gray-500">
                        <p>&copy; {new Date().getFullYear()} Link-Hub. Tous droits réservés.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}