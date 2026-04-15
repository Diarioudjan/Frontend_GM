import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { orderService, formatCurrency } from '../../services/api';
import { CartItem, User } from '../../types';

const Paiement: React.FC = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const { user } = useAuth() as { user: User | null };
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('Orange Money');

    const [formData, setFormData] = useState({
        firstName: user?.prenom || '',
        lastName: user?.nom || '',
        email: user?.email || '',
        phone: user?.telephone || '',
        address: user?.adresses?.[0]?.rue || '',
        city: user?.adresses?.[0]?.ville || '',
        region: user?.adresses?.[0]?.region || 'Conakry',
        postalCode: user?.adresses?.[0]?.codePostal || ''
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (cartItems.length === 0) {
            navigate('/panier');
        }
    }, [cartItems, navigate]);

    const itemsPrice = cartTotal;
    const shippingPrice = itemsPrice > 500000 ? 0 : 25000;
    const taxPrice = itemsPrice * 0.15;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validateStep1 = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.firstName) newErrors.firstName = 'Requis';
        if (!formData.lastName) newErrors.lastName = 'Requis';
        if (!formData.phone) newErrors.phone = 'Requis';
        if (!formData.address) newErrors.address = 'Requis';
        if (!formData.city) newErrors.city = 'Requis';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const orderData = {
                orderItems: cartItems.map((item: CartItem) => ({
                    product: item.product._id || item.product.id,
                    name: item.product.nom,
                    quantity: item.quantity,
                    price: item.product.prix,
                    image: item.product.images?.[0] || ''
                })),
                shippingAddress: {
                    prenom: formData.firstName,
                    nom: formData.lastName,
                    rue: formData.address,
                    ville: formData.city,
                    pays: 'Guinée'
                },
                paymentMethod: paymentMethod,
                taxPrice,
                shippingPrice,
                totalPrice
            };

            const response = await orderService.createOrder(orderData);
            if (response.status === 'success' || response.data) {
                clearCart();
                const orderId = response.data?._id || (response.data as any)?.id || (response as any).data?.id;
                navigate(`/commande/${orderId}`);
            }
        } catch (error) {
            console.error('Erreur commande:', error);
            alert('Une erreur est survenue lors de la validation.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 lg:p-6 pb-20 animate-fade-in max-w-7xl mx-auto">
            <header className="mb-8 text-center">
                <p className="text-[9px] font-black text-primary-500 uppercase tracking-[0.4em] mb-2">Finalisation Sécurisée</p>
                <h1 className="text-2xl font-black text-neutral-900 dark:text-white uppercase tracking-tighter leading-none mb-6">
                    Caisse <span className="text-neutral-300 dark:text-neutral-800 ml-2">Checkout</span>
                </h1>

                {/* Stepper */}
                <div className="flex items-center justify-center space-x-3">
                    <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-primary-500' : 'text-neutral-400'}`}>
                        <span className={`w-7 h-7 rounded-lg border flex items-center justify-center font-black text-[10px] ${step >= 1 ? 'border-primary-500 bg-primary-500/10' : 'border-neutral-200 dark:border-neutral-800'}`}>1</span>
                        <span className="text-[8px] font-black uppercase tracking-widest hidden sm:block">Livraison</span>
                    </div>
                    <div className="w-8 h-px bg-neutral-200 dark:bg-neutral-800"></div>
                    <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-primary-500' : 'text-neutral-400'}`}>
                        <span className={`w-7 h-7 rounded-lg border flex items-center justify-center font-black text-[10px] ${step >= 2 ? 'border-primary-500 bg-primary-500/10' : 'border-neutral-200 dark:border-neutral-800'}`}>2</span>
                        <span className="text-[8px] font-black uppercase tracking-widest hidden sm:block">Paiement</span>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                {/* Form Area */}
                <div className="lg:col-span-3">
                    <div className="bg-white dark:bg-[#0a0a0a] rounded-2xl border border-neutral-200 dark:border-[#1a1a1a] p-6 shadow-soft">
                        {step === 1 ? (
                            <div className="space-y-6 animate-fade-in">
                                <h2 className="text-[10px] font-black text-neutral-900 dark:text-white uppercase tracking-[0.3em] mb-6">Destinataire & Adresse</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[8px] font-black text-neutral-400 uppercase tracking-widest">Prénom</label>
                                        <input
                                            name="firstName" value={formData.firstName} onChange={handleInputChange}
                                            className="w-full bg-transparent border-b border-neutral-100 dark:border-neutral-900 py-1.5 text-xs text-neutral-900 dark:text-white focus:border-primary-500 outline-none transition-colors font-bold"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[8px] font-black text-neutral-400 uppercase tracking-widest">Nom</label>
                                        <input
                                            name="lastName" value={formData.lastName} onChange={handleInputChange}
                                            className="w-full bg-transparent border-b border-neutral-100 dark:border-neutral-900 py-1.5 text-xs text-neutral-900 dark:text-white focus:border-primary-500 outline-none transition-colors font-bold"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[8px] font-black text-neutral-400 uppercase tracking-widest">Téléphone</label>
                                    <input
                                        name="phone" value={formData.phone} onChange={handleInputChange}
                                        className="w-full bg-transparent border-b border-neutral-100 dark:border-neutral-900 py-1.5 text-xs text-neutral-900 dark:text-white focus:border-primary-500 outline-none transition-colors font-bold"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[8px] font-black text-neutral-400 uppercase tracking-widest">Adresse Complète</label>
                                    <input
                                        name="address" value={formData.address} onChange={handleInputChange}
                                        className="w-full bg-transparent border-b border-neutral-100 dark:border-neutral-900 py-1.5 text-xs text-neutral-900 dark:text-white focus:border-primary-500 outline-none transition-colors font-bold"
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[8px] font-black text-neutral-400 uppercase tracking-widest">Ville</label>
                                        <input
                                            name="city" value={formData.city} onChange={handleInputChange}
                                            className="w-full bg-transparent border-b border-neutral-100 dark:border-neutral-900 py-1.5 text-xs text-neutral-900 dark:text-white focus:border-primary-500 outline-none transition-colors font-bold"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[8px] font-black text-neutral-400 uppercase tracking-widest">Région</label>
                                        <select
                                            name="region" value={formData.region} onChange={handleInputChange}
                                            className="w-full bg-transparent border-b border-neutral-100 dark:border-neutral-900 py-1.5 text-xs text-neutral-900 dark:text-white focus:border-primary-500 outline-none appearance-none font-bold"
                                        >
                                            <option value="Conakry">Conakry</option>
                                            <option value="Kindia">Kindia</option>
                                            <option value="Labé">Labé</option>
                                            <option value="Kankan">Kankan</option>
                                            <option value="Nzérékoré">Nzérékoré</option>
                                        </select>
                                    </div>
                                </div>
                                <button
                                    onClick={() => validateStep1() && setStep(2)}
                                    className="w-full bg-[#f27405] text-white rounded-xl py-3.5 text-[9px] font-black uppercase tracking-widest hover:scale-[1.01] transition-all shadow-lg shadow-primary-500/20"
                                >
                                    Suivant: Paiement
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-6 animate-fade-in">
                                <h2 className="text-[10px] font-black text-neutral-900 dark:text-white uppercase tracking-[0.3em] mb-6">Mode de Paiement</h2>
                                <div className="space-y-3">
                                    {[
                                        { id: 'Orange Money', label: 'Orange Money', icon: '🟠', sub: 'Confirmation par téléphone' },
                                        { id: 'MTN MoMo', label: 'MTN Mobile Money', icon: '🟡', sub: 'Réseau MTN' },
                                        { id: 'Cash', label: 'Cash à la livraison', icon: '🤝', sub: 'Conakry uniquement' }
                                    ].map((m) => (
                                        <button
                                            key={m.id}
                                            onClick={() => setPaymentMethod(m.id)}
                                            className={`w-full p-4 flex items-center justify-between rounded-2xl border-2 transition-all group ${paymentMethod === m.id ? 'border-primary-500 bg-primary-500/5' : 'border-neutral-100 dark:border-neutral-900 hover:border-primary-500/30'}`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <span className="text-xl group-hover:scale-110 transition-transform">{m.icon}</span>
                                                <div className="text-left">
                                                    <p className="text-xs font-black text-neutral-900 dark:text-white uppercase leading-none">{m.label}</p>
                                                    <p className="text-[8px] text-neutral-400 font-bold uppercase tracking-widest mt-0.5">{m.sub}</p>
                                                </div>
                                            </div>
                                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === m.id ? 'border-primary-500 bg-primary-500' : 'border-neutral-200 dark:border-neutral-800'}`}>
                                                {paymentMethod === m.id && <div className="w-1 h-1 bg-white rounded-full"></div>}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                                <div className="flex gap-4 pt-2">
                                    <button
                                        onClick={() => setStep(1)}
                                        className="w-1/3 bg-neutral-100 dark:bg-neutral-900 text-neutral-500 rounded-xl py-3.5 text-[9px] font-black uppercase tracking-widest hover:text-neutral-900 dark:hover:text-white transition-all"
                                    >Retour</button>
                                    <button
                                        onClick={handleSubmit}
                                        disabled={loading}
                                        className="w-2/3 bg-[#f27405] text-white rounded-xl py-3.5 text-[9px] font-black uppercase tracking-widest shadow-lg shadow-primary-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center"
                                    >
                                        {loading && <div className="animate-spin h-3.5 w-3.5 border-2 border-white/30 border-t-white rounded-full mr-2"></div>}
                                        Confirmer
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Summary Sidebar */}
                <div className="lg:col-span-2">
                    <div className="bg-neutral-50/50 dark:bg-[#080808] rounded-2xl border border-neutral-100 dark:border-neutral-900 p-6 sticky top-20 shadow-soft">
                        <h2 className="text-[10px] font-black text-neutral-900 dark:text-white uppercase tracking-[0.3em] mb-6">Articles</h2>
                        <div className="space-y-4 max-h-[250px] overflow-y-auto pr-2 mb-6 divide-y divide-neutral-100 dark:divide-neutral-900">
                            {cartItems.map((item: CartItem, idx: number) => (
                                <div key={idx} className="flex gap-3 pt-4 first:pt-0">
                                    <div className="h-12 w-12 bg-white dark:bg-black rounded-lg overflow-hidden border border-neutral-100 dark:border-neutral-900 shrink-0">
                                        <img src={item.product.images?.[0] || ''} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-[9px] font-black text-neutral-900 dark:text-white uppercase tracking-tight truncate">{item.product.nom}</h4>
                                        <p className="text-[8px] text-neutral-400 font-bold uppercase mt-0.5">Qté: {item.quantity}</p>
                                        <p className="text-[11px] font-black text-neutral-900 dark:text-white mt-0.5 tabular-nums leading-none">{formatCurrency(item.product.prix * item.quantity)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-3 pt-6 border-t border-neutral-100 dark:border-neutral-900">
                            <div className="flex justify-between items-center text-[9px] font-bold text-neutral-500 uppercase tracking-widest">
                                <span>Sous-total HT</span>
                                <span className="text-neutral-900 dark:text-white tabular-nums font-black">{formatCurrency(itemsPrice)}</span>
                            </div>
                            <div className="flex justify-between items-center text-[9px] font-bold text-neutral-500 uppercase tracking-widest">
                                <span>Livraison</span>
                                <span className="text-neutral-900 dark:text-white tabular-nums font-black">{shippingPrice === 0 ? 'Gratuit' : formatCurrency(shippingPrice)}</span>
                            </div>
                            <div className="flex justify-between items-center text-[9px] font-bold text-neutral-500 uppercase tracking-widest opacity-40 italic">
                                <span>TVA (15%)</span>
                                <span className="text-neutral-900 dark:text-white tabular-nums font-black">{formatCurrency(taxPrice)}</span>
                            </div>
                            <div className="pt-4 mt-4 border-t border-dashed border-neutral-200 dark:border-neutral-800">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-black text-neutral-900 dark:text-white uppercase tracking-[0.2em]">Total TTC</span>
                                    <span className="text-2xl font-black text-primary-500 tabular-nums tracking-tighter">{formatCurrency(totalPrice)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Paiement;

