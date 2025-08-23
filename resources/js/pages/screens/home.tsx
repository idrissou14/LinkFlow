import React , {useState}from 'react';
import { Plus, QrCode, Settings } from 'lucide-react';
import { usePage, useForm, router } from '@inertiajs/react';
import { Button } from '@headlessui/react';

interface User {
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
    
    // recuperer et afficher les infos de l'utilisateur
    const { user, links } = usePage<PageProps>().props;

    //initialisation du formulaire avec useForm
    const { data, setData, post, processing, reset, errors } = useForm({
        title: '',
        url: '',
    });   

    //initialisation du formulaire de modification
    const {data: editData, setData: setEditData, put, processing: editing, reset: resetEditForm} = useForm({
        id: null as number | null,
        title: '',
        url: '',
    });

    const handleAddLink = () =>{
        setShowModal(true);
    }

    const handleShowQrcode = () => {
        setShowQrcode(true);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        //envoi des donner du formulaire vers le controller avec la methode post d'inertia
        post(route('links.store'),{
            onSuccess: () => {
                //cette fonction est appelee si la soumission est reussie
                setShowModal(false);
                reset(); //reinitialiser les champs du formulaire
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
        if (!editData.id) return; // Sécurité : on ne fait rien si pas d'id
        // Logique de mise à jour du lien ici
        put(route('links.update', editData.id),{
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
        if(window.confirm('Suppremer ?')){
            router.delete(route('links.destroy', id), {
                preserveScroll: true,
            });
        }
    };

    
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 max-w-md w-full text-center transform transition-all duration-300 hover:scale-105">
                <img
                    className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-blue-500 dark:border-blue-400 object-cover"
                    src={'https://via.placeholder.com/150'} // Use user.avatar if available, otherwise a placeholder
                    
                />
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{user.name}</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">{user.email}</p>
                <p className="text-md text-gray-700 dark:text-gray-200 leading-relaxed">{user.bio}</p>
                <h2 className="text-xl font-semibold mt-6 mb-4">Mes liens</h2>
                <ul className="space-y-2">
                    {links.map((link, index) => (
                        <li key={index} className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                            <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{link.title}</a>
                            <button className='ml-4 text-sm text-gray-600 dark:text-gray-400 hover:underline'
                                    onClick={() => handleEditLink(link)} >
                                        modifier
                            </button>
                            <button className='ml-4 text-sm text-gray-600 dark:text-gray-400 hover:underline'
                                    onClick={() => handleDeleteLink(link.id)} >
                                        supprimer
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Floating Buttons */}
            <div className="fixed bottom-4 left-4 flex space-x-4">
                <button className="p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-200"
                        onClick={handleAddLink}
                >
                    <Plus size={24} />
                </button>
                <button className="p-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors duration-200"
                        onClick={handleShowQrcode}
                >
                    <QrCode size={24} />
                </button>
                <button className="p-3 bg-gray-700 text-white rounded-full shadow-lg hover:bg-gray-800 transition-colors duration-200">
                    <Settings size={24} />
                </button>

                {/* modale pour ajouter un lien */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg relative w-full max-w-md">
                            <button
                                className="absolute top-2 right-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                                onClick={() => setShowModal(false)}
                            >
                                &times;
                            </button>
                            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Ajouter un nouveau lien</h2>
                            <form onSubmit={handleSubmit}>
                                <input
                                    type='text'
                                    placeholder='Titre'
                                    className="border p-2 mb-2 w-full rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                                    value={data.title}
                                    onChange={(e) => setData('title',e.target.value)}
                                    required
                                />
                                <input
                                    type='url'
                                    placeholder='URL'
                                    className="border p-2 mb-4 w-full rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                                    value={data.url}
                                    onChange={(e) => setData('url',e.target.value)} 
                                    required
                                />
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50">
                                   {processing? 'Ajout en cours...' : 'Ajouter'}
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* modale pour afficher le qrcode */}
                {showQrcode && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg relative w-full max-w-md text-center">
                            <button
                                className="absolute top-2 right-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                                onClick={() => setShowQrcode(false)}
                            >
                                &times;
                            </button>
                            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Mon QR Code</h2>
                            <p className="text-gray-700 dark:text-gray-300">Le QR code sera affiché ici.</p>
                            {/* Ici, vous inséreriez l'image du QR code */}
                            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-center" style={{ minHeight: '150px' }}>
                                <p className="text-gray-500 dark:text-gray-400">[Placeholder QR Code]</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* modale pour modifier un lien */}
                {editId !== null && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg relative w-full max-w-md">
                            <button
                                className="absolute top-2 right-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                                onClick={() => setEditId(null)}
                            >
                                &times;
                            </button>
                            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Modifier le lien</h2>
                            <form onSubmit={handleUpdateLink}>
                                <input
                                    type='text'
                                    placeholder='Titre'
                                    className="border p-2 mb-2 w-full rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                                    value={editData.title}
                                    onChange={(e) => setEditData('title', e.target.value)}
                                    required
                                />
                                <input
                                    type='url'
                                    placeholder='URL'
                                    className="border p-2 mb-4 w-full rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                                    value={editData.url}
                                    onChange={(e) => setEditData('url', e.target.value)} 
                                    required
                                />
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50">
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