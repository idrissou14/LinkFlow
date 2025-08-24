import { SplashCursor } from '@/components/ui/splash-cursor';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#232526] text-white flex items-center justify-center p-4">
            <SplashCursor />
            <div className="w-full max-w-md">
                <div className="bg-black/20 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
                    <div className="flex flex-col items-center gap-6">
                        <Link href={route('home')}>
                            <div className="flex items-center text-3xl font-bold">
                                <span className="text-white">Link</span>
                                <span className="ml-1.5 rounded-md bg-cyan-500 px-2 py-1 text-white">Hub</span>
                            </div>
                        </Link>

                        <div className="space-y-2 text-center">
                            <h1 className="text-2xl font-semibold">{title}</h1>
                            <p className="text-center text-sm text-gray-300">{description}</p>
                        </div>
                    </div>

                    <div className="mt-8">{children}</div>
                </div>
            </div>
        </div>
    );
}
