import React, { useState } from 'react';
import { Plus, QrCode, Settings } from 'lucide-react';
import { Link, useForm, usePage, router } from '@inertiajs/react';
import QRCode from 'react-qr-code';

interface User {
    id: number;
    name: string;
    email: string;
    bio: string;
}

interface Link {
    id: number;
    title: string;
    url: string;
}

interface PageProps {
    user: User;
    links: Link[];
    [key: string]: any;
}

export default function Home() {
    const [showModal, setShowModal] = useState(false);
    const [showQrcode, setShowQrcode] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);

    const { user, links } = usePage<PageProps>().props;
    //url for qrcode test
    const profileUrl = `${window.location.origin}/profile/${user.id}`;

    const { data, setData, post, processing, reset, errors } = useForm({
        title: '',
        url: '',
    });

    const { data: editData, setData: setEditData, put, processing: editing, reset: resetEditForm } = useForm({
        id: null as number | null,
        title: '',
        url: '',
    });

    const handleAddLink = () => setShowModal(true);
    const handleShowQrcode = () => {setShowQrcode(true)
        console.log(profileUrl);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('links.store'), {
            onSuccess: () => {
                setShowModal(false);
                reset();
            },
            onError: (errors) => {
                console.error('Erreurs de validation :', errors);
            }
        });
    };

    const handleEditLink = (link: Link) => {
        setEditId(link.id);
        setEditData(link);
    };

    const handleUpdateLink = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editData.id) return;
        put(route('links.update', editData.id), {
            onSuccess: () => {
                setEditId(null);
                resetEditForm();
            },
            onError: (errors) => {
                console.error('Erreurs de validation :', errors);
            }
        });
    };

    const handleDeleteLink = (id: number) => {
        if (window.confirm('Supprimer ce lien ?')) {
            router.delete(route('links.destroy', id), {
                preserveScroll: true,
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#232526] flex items-center justify-center px-4">
            <div className="relative w-full max-w-lg">
                {/* Carte utilisateur */}
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 flex flex-col items-center border border-white/20">
                    <div className="relative mb-6">
                        <img
                            className="w-28 h-28 rounded-full border-4 border-cyan-400 shadow-lg object-cover"
                            src={'https://api.dicebear.com/7.x/identicon/svg?seed=' + encodeURIComponent(user.email)}
                            alt="avatar"
                        />
                        <span className="absolute bottom-2 right-2 w-4 h-4 bg-gradient-to-tr from-green-400 to-cyan-400 rounded-full border-2 border-white"></span>
                    </div>
                    <h1 className="text-2xl font-extrabold text-white tracking-tight">{user.name}</h1>
                    <p className="text-cyan-200 text-sm mt-1">{user.email}</p>
                    <p className="text-gray-300 text-center mt-3 text-base">{user.bio}</p>
                </div>

                {/* Liste des liens */}
                <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20">
                    <h2 className="text-lg font-semibold text-cyan-200 mb-4 tracking-wide">Mes liens</h2>
                    <ul className="space-y-3">
                        {links.length === 0 && (
                            <li className="text-gray-400 text-center py-8">Aucun lien pour le moment.</li>
                        )}
                        {links.map((link) => (
                            <li
                                key={link.id}
                                className="flex items-center justify-between bg-white/5 hover:bg-cyan-900/30 transition rounded-xl px-4 py-3 group"
                            >
                                <a
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 text-cyan-100 font-medium truncate hover:underline"
                                >
                                    {link.title}
                                </a>
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
                                    <button
                                        className="p-1 rounded hover:bg-cyan-700/30 transition"
                                        title="Modifier"
                                        onClick={() => handleEditLink(link)}
                                    >
                                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" className="text-cyan-300">
                                            <path d="M15.232 5.232l-2.464-2.464a2 2 0 00-2.828 0l-6.364 6.364a2 2 0 000 2.828l2.464 2.464a2 2 0 002.828 0l6.364-6.364a2 2 0 000-2.828z" />
                                            <path d="M11 7l2 2" />
                                        </svg>
                                    </button>
                                    <button
                                        className="p-1 rounded hover:bg-red-700/30 transition"
                                        title="Supprimer"
                                        onClick={() => handleDeleteLink(link.id)}
                                    >
                                        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-400">
                                            <path d="M3 6h12M9 6v8m-4 0a2 2 0 002 2h4a2 2 0 002-2V6m-6 0V4a2 2 0 012-2h0a2 2 0 012 2v2" />
                                        </svg>
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Boutons flottants */}
                <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-50">
                    <button
                        className="p-4 bg-gradient-to-tr from-cyan-500 to-blue-600 text-white rounded-full shadow-xl hover:scale-110 transition"
                        onClick={handleAddLink}
                        title="Ajouter un lien"
                    >
                        <Plus size={28} />
                    </button>
                    <button
                        className="p-4 bg-gradient-to-tr from-green-400 to-cyan-500 text-white rounded-full shadow-xl hover:scale-110 transition"
                        onClick={handleShowQrcode}
                        title="Afficher le QR Code"
                    >
                        <QrCode size={28} />
                    </button>
                    <Link
                        href={route('profile.edit')}
                        className="block p-4 bg-gradient-to-tr from-gray-700 to-gray-900 text-white rounded-full shadow-xl hover:scale-110 transition"
                        title="Paramètres"
                    >
                        <Settings size={28} />
                    </Link>
                </div>

                {/* Modale : Ajouter un lien */}
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                        <div className="bg-[#181f2a] p-8 rounded-2xl shadow-2xl w-full max-w-md relative border border-cyan-700/30">
                            <button
                                className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl"
                                onClick={() => setShowModal(false)}
                            >
                                &times;
                            </button>
                            <h2 className="text-xl font-bold mb-6 text-cyan-200">Ajouter un nouveau lien</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Titre"
                                    className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-cyan-400/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder:text-cyan-300"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    required
                                />
                                <input
                                    type="url"
                                    placeholder="URL"
                                    className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-cyan-400/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder:text-cyan-300"
                                    value={data.url}
                                    onChange={(e) => setData('url', e.target.value)}
                                    required
                                />
                                <button
                                    type="submit"
                                    className="w-full py-2 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 text-white font-semibold hover:scale-105 transition disabled:opacity-60"
                                    disabled={processing}
                                >
                                    {processing ? 'Ajout en cours...' : 'Ajouter'}
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* Modale : QR Code */}
                {showQrcode && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                        <div className="bg-[#181f2a] p-8 rounded-2xl shadow-2xl w-full max-w-md relative border border-cyan-700/30 text-center">
                            <button
                                className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl"
                                onClick={() => setShowQrcode(false)}
                            >
                                &times;
                            </button>
                            <h2 className="text-xl font-bold mb-6 text-cyan-200">Mon QR Code</h2>
                            <div className="flex items-center justify-center min-h-[150px] bg-white/10 rounded-lg">
                                <QrCode values={profileUrl} size={250} />
                            </div>
                        </div>
                    </div>
                )}

                {/* Modale : Modifier un lien */}
                {editId !== null && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                        <div className="bg-[#181f2a] p-8 rounded-2xl shadow-2xl w-full max-w-md relative border border-cyan-700/30">
                            <button
                                className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl"
                                onClick={() => setEditId(null)}
                            >
                                &times;
                            </button>
                            <h2 className="text-xl font-bold mb-6 text-cyan-200">Modifier le lien</h2>
                            <form onSubmit={handleUpdateLink} className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Titre"
                                    className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-cyan-400/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder:text-cyan-300"
                                    value={editData.title}
                                    onChange={(e) => setEditData('title', e.target.value)}
                                    required
                                />
                                <input
                                    type="url"
                                    placeholder="URL"
                                    className="w-full px-4 py-2 rounded-lg bg-white/10 text-white border border-cyan-400/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder:text-cyan-300"
                                    value={editData.url}
                                    onChange={(e) => setEditData('url', e.target.value)}
                                    required
                                />
                                <button
                                    type="submit"
                                    className="w-full py-2 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 text-white font-semibold hover:scale-105 transition disabled:opacity-60"
                                    disabled={editing}
                                >
                                    {editing ? 'Enregistrement...' : 'Enregistrer les modifications'}
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}