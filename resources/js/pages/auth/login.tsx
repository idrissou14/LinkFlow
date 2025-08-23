import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    return (
        <AuthLayout title="Content de vous revoir" description="Connectez-vous pour accéder à votre Hub.">
            <Head title="Se connecter" />

            <Form method="post" action={route('login')} resetOnSuccess={['password']} className="flex flex-col gap-y-6">
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-gray-300">
                                    Adresse e-mail
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    placeholder="email@example.com"
                                    className="bg-white/5 border-white/20 placeholder:text-gray-400 focus:ring-cyan-500"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password" className="text-gray-300">
                                        Mot de passe
                                    </Label>
                                    {canResetPassword && (
                                        <TextLink
                                            href={route('password.request')}
                                            className="ml-auto text-sm text-cyan-400 hover:underline"
                                            tabIndex={5}
                                        >
                                            Mot de passe oublié ?
                                        </TextLink>
                                    )}
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="••••••••"
                                    className="bg-white/5 border-white/20 placeholder:text-gray-400 focus:ring-cyan-500"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center space-x-3">
                                <Checkbox id="remember" name="remember" tabIndex={3} className="border-white/30" />
                                <Label htmlFor="remember" className="text-gray-300">
                                    Se souvenir de moi
                                </Label>
                            </div>

                            <Button
                                type="submit"
                                className="mt-4 w-full bg-gradient-to-tr from-cyan-500 to-blue-600 text-white font-bold hover:scale-105 transition-transform disabled:opacity-70"
                                tabIndex={4}
                                disabled={processing}
                            >
                                {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                                Se connecter
                            </Button>
                        </div>

                        <div className="text-center text-sm text-gray-400">
                            Pas encore de compte ?{' '}
                            <TextLink href={route('register')} tabIndex={5} className="text-cyan-400 hover:underline">
                                S'inscrire
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>

            {status && <div className="mb-4 text-center text-sm font-medium text-green-400">{status}</div>}
        </AuthLayout>
    );
}
