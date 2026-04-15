import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Support: React.FC = () => {
    const navigate = useNavigate();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [activeTab, setActiveTab] = useState('contact');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        category: 'general',
        message: '',
        priority: 'medium'
    });
    const [isLoading, setIsLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            setSubmitted(true);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const quickHelp = [
        { icon: '📦', title: 'Suivi de Commande', desc: 'Localisez votre colis en temps réel.', action: () => navigate('/commandes') },
        { icon: '💳', title: 'Paiements', desc: 'Orange Money, MTN MoMo & Cartes.', action: () => { } },
        { icon: '🔄', title: 'Retours', desc: 'Conditions et procédures de retour.', action: () => { } },
        { icon: '📋', title: 'FAQ', desc: 'Réponses à vos questions fréquentes.', action: () => navigate('/faq') }
    ];

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-black font-inter pb-20">
            {/* Search & Hero Hero */}
            <header className="bg-white dark:bg-[#0a0a0a] border-b border-neutral-100 dark:border-[#111111] py-20 px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-[10px] font-black text-primary-500 uppercase tracking-[0.4em] mb-4">Centre d'assistance Guinée Makiti</p>
                    <h1 className="text-4xl md:text-5xl font-black text-neutral-900 dark:text-white uppercase tracking-tighter mb-8 italic">
                        Comment pouvons-nous <br /> <span className="text-primary-500 not-italic">vous aider ?</span>
                    </h1>

                    <div className="relative max-w-2xl mx-auto group">
                        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-xl group-focus-within:text-primary-500 transition-colors">🔍</div>
                        <input
                            type="text"
                            placeholder="Recherchez un problème, une commande, une aide..."
                            className="w-full bg-neutral-50 dark:bg-[#080808] border border-neutral-200 dark:border-[#1a1a1a] rounded-3xl py-5 pl-16 pr-8 text-sm outline-none focus:border-primary-500 transition-all shadow-soft group-hover:shadow-lg"
                        />
                    </div>
                </div>
            </header>

            <div className="max-w-6xl mx-auto px-8 py-16">
                {/* Quick Actions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {quickHelp.map((item, index) => (
                        <button
                            key={index}
                            onClick={item.action}
                            className="group bg-white dark:bg-[#0a0a0a] p-8 rounded-3xl border border-neutral-200 dark:border-[#1a1a1a] text-left hover:border-primary-500/30 transition-all duration-500 shadow-soft hover:shadow-xl hover:-translate-y-1"
                        >
                            <div className="text-3xl mb-6 group-hover:scale-110 transition-transform duration-500">{item.icon}</div>
                            <h3 className="text-[11px] font-black text-neutral-900 dark:text-white uppercase tracking-widest mb-2">{item.title}</h3>
                            <p className="text-[10px] text-neutral-500 font-medium mb-6 uppercase tracking-tight">{item.desc}</p>
                            <div className="text-[9px] font-black text-primary-500 uppercase tracking-widest flex items-center">
                                Consulter <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Support Suite */}
                <div className="bg-white dark:bg-[#0a0a0a] rounded-[2.5rem] border border-neutral-200 dark:border-[#1a1a1a] overflow-hidden shadow-soft-xl">
                    <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-neutral-100 dark:divide-[#111111]">

                        {/* Left Info Panel */}
                        <div className="lg:w-1/3 p-10 lg:p-14 bg-neutral-50/50 dark:bg-[#080808]">
                            <h2 className="text-[12px] font-black text-neutral-900 dark:text-white uppercase tracking-[0.3em] mb-12">Assistance Directe</h2>

                            <div className="space-y-12">
                                <div className="flex items-start space-x-6">
                                    <div className="h-12 w-12 rounded-2xl bg-primary-500 text-white flex items-center justify-center text-xl shadow-soft-orange">💬</div>
                                    <div>
                                        <h4 className="text-[10px] font-black uppercase tracking-widest mb-2">Chat en direct</h4>
                                        <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-tighter mb-4 italic">Réponse en moins de 2 min</p>
                                        <button className="text-[9px] font-black uppercase tracking-widest bg-neutral-900 dark:bg-white text-white dark:text-black px-6 py-2.5 rounded-xl hover:scale-105 transition-all">Lancer le chat</button>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-6">
                                    <div className="h-12 w-12 rounded-2xl bg-neutral-900 dark:bg-white text-white dark:text-black flex items-center justify-center text-xl">📞</div>
                                    <div>
                                        <h4 className="text-[10px] font-black uppercase tracking-widest mb-2">Téléphone</h4>
                                        <p className="text-base font-black text-neutral-900 dark:text-white tabular-nums tracking-tighter">+224 620 00 00 00</p>
                                        <p className="text-[9px] text-neutral-500 font-bold uppercase tracking-widest mt-1">Lun - Sam | 8h - 20h</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-6">
                                    <div className="h-12 w-12 rounded-2xl bg-primary-500/10 text-primary-500 border border-primary-500 flex items-center justify-center text-xl">📍</div>
                                    <div>
                                        <h4 className="text-[10px] font-black uppercase tracking-widest mb-2">Bureaux</h4>
                                        <p className="text-[10px] text-neutral-900 dark:text-white font-black uppercase tracking-tight">Cité de l'Air, Conakry</p>
                                        <p className="text-[9px] text-neutral-500 font-bold uppercase tracking-widest mt-1 italic">Siège Social Guinée Makiti</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Form Panel */}
                        <div className="lg:w-2/3 p-10 lg:p-14">
                            {submitted ? (
                                <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in py-12">
                                    <div className="text-7xl mb-8">🚀</div>
                                    <h2 className="text-2xl font-black text-neutral-900 dark:text-white uppercase tracking-tighter mb-4">Message Envoyé !</h2>
                                    <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest max-w-sm mx-auto mb-10 leading-relaxed">
                                        Votre demande a été enregistrée. Notre équipe de techniciens vous répondra par email dans les plus brefs délais.
                                    </p>
                                    <button
                                        onClick={() => setSubmitted(false)}
                                        className="bg-primary-500 text-white px-10 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-soft-orange hover:scale-105 transition-all"
                                    >
                                        Nouveau message
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <h2 className="text-[12px] font-black text-neutral-900 dark:text-white uppercase tracking-[0.3em] mb-12">Ouvrir un Ticket</h2>
                                    <form onSubmit={handleSubmit} className="space-y-10">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                            <div className="space-y-2">
                                                <label className="text-[9px] font-black text-neutral-400 uppercase tracking-widest">Nom Complet</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full bg-transparent border-b border-neutral-200 dark:border-neutral-800 py-2 text-sm text-neutral-900 dark:text-white focus:border-primary-500 transition-all outline-none"
                                                    placeholder="Ex: Alseny Bangoura"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[9px] font-black text-neutral-400 uppercase tracking-widest">Email de contact</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full bg-transparent border-b border-neutral-200 dark:border-neutral-800 py-2 text-sm text-neutral-900 dark:text-white focus:border-primary-500 transition-all outline-none"
                                                    placeholder="votre@email.com"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                            <div className="space-y-2">
                                                <label className="text-[9px] font-black text-neutral-400 uppercase tracking-widest">Objet</label>
                                                <input
                                                    type="text"
                                                    name="subject"
                                                    value={formData.subject}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="w-full bg-transparent border-b border-neutral-200 dark:border-neutral-800 py-2 text-sm text-neutral-900 dark:text-white focus:border-primary-500 transition-all outline-none"
                                                    placeholder="En quelques mots..."
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[9px] font-black text-neutral-400 uppercase tracking-widest">Priorité</label>
                                                <select
                                                    name="priority"
                                                    value={formData.priority}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-transparent border-b border-neutral-200 dark:border-neutral-800 py-2 text-sm text-neutral-900 dark:text-white focus:border-primary-500 transition-all outline-none appearance-none"
                                                >
                                                    <option value="low">Standard</option>
                                                    <option value="medium">Moyenne</option>
                                                    <option value="high">Haute</option>
                                                    <option value="urgent">Urgente 🔥</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-[9px] font-black text-neutral-400 uppercase tracking-widest">Message détaillé</label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                required
                                                rows={5}
                                                className="w-full bg-neutral-50 dark:bg-[#080808] border border-neutral-200 dark:border-[#1a1a1a] rounded-2xl p-6 text-sm text-neutral-900 dark:text-white focus:border-primary-500 transition-all outline-none"
                                                placeholder="Décrivez votre problème en détail..."
                                            />
                                        </div>

                                        <div className="flex justify-end pt-4">
                                            <button
                                                type="submit"
                                                disabled={isLoading}
                                                className="bg-primary-500 text-white px-12 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-soft-orange hover:scale-105 active:scale-95 transition-all flex items-center disabled:opacity-50"
                                            >
                                                {isLoading && <div className="animate-spin h-3 w-3 border-2 border-white/30 border-t-white rounded-full mr-3"></div>}
                                                Envoyer le Ticket
                                            </button>
                                        </div>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Bottom Resources */}
                <div className="mt-20 text-center">
                    <p className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em] mb-8 italic">Guinée Makiti Premium Support</p>
                    <div className="flex flex-wrap justify-center gap-12 font-black text-[9px] uppercase tracking-widest text-neutral-500">
                        <button className="hover:text-primary-500 transition-colors underline decoration-primary-500/20 underline-offset-8">Base de connaissances</button>
                        <button className="hover:text-primary-500 transition-colors underline decoration-primary-500/20 underline-offset-8">Conditions de service</button>
                        <button className="hover:text-primary-500 transition-colors underline decoration-primary-500/20 underline-offset-8">Politique de confidentialité</button>
                        <button className="hover:text-primary-500 transition-colors underline decoration-primary-500/20 underline-offset-8">Garantie Makiti</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Support;

