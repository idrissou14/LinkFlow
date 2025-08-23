import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

export default function Register() {
    return (
        <AuthLayout title="Créer un compte" description="Entrez vos informations pour créer votre compte.">
            <Head title="S'inscrire" />
            <Form
                method="post"
                action={route('register')}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-y-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name" className="text-gray-300">Nom</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    name="name"
                                    placeholder="Votre nom complet"
                                    className="bg-white/5 border-white/20 placeholder:text-gray-400 focus:ring-cyan-500"
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-gray-300">Adresse e-mail</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
                                    name="email"
                                    placeholder="email@example.com"
                                    className="bg-white/5 border-white/20 placeholder:text-gray-400 focus:ring-cyan-500"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password" className="text-gray-300">Mot de passe</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    tabIndex={3}
                                    autoComplete="new-password"
                                    name="password"
                                    placeholder="••••••••"
                                    className="bg-white/5 border-white/20 placeholder:text-gray-400 focus:ring-cyan-500"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation" className="text-gray-300">Confirmer le mot de passe</Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    required
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    name="password_confirmation"
                                    placeholder="••••••••"
                                    className="bg-white/5 border-white/20 placeholder:text-gray-400 focus:ring-cyan-500"
                                />
                                <InputError message={errors.password_confirmation} />
                            </div>

                            <Button
                                type="submit"
                                className="mt-2 w-full bg-gradient-to-tr from-cyan-500 to-blue-600 text-white font-bold hover:scale-105 transition-transform disabled:opacity-70"
                                tabIndex={5}
                                disabled={processing}
                            >
                                {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                                Créer le compte
                            </Button>
                        </div>

                        <div className="text-center text-sm text-gray-400">
                            Vous avez déjà un compte ?{' '}
                            <TextLink href={route('login')} tabIndex={6} className="text-cyan-400 hover:underline">
                                Se connecter
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
