import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface FormData {
  nom: string;
  email: string;
  sujet: string;
  message: string;
}

interface FormErrors {
  nom?: string;
  email?: string;
  sujet?: string;
  message?: string;
  general?: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ nom: '', email: '', sujet: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.nom.trim()) newErrors.nom = 'Le nom est requis';
    if (!formData.email) newErrors.email = "L'email est requis";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "L'email n'est pas valide";
    if (!formData.sujet.trim()) newErrors.sujet = 'Le sujet est requis';
    if (!formData.message.trim()) newErrors.message = 'Le message est requis';
    else if (formData.message.trim().length < 10) newErrors.message = '10 caractères minimum';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1000));
      setIsSubmitted(true);
      setFormData({ nom: '', email: '', sujet: '', message: '' });
    } catch (e) {
      setErrors({ general: "Erreur d'envoi. Veuillez réessayer." });
    } finally {
      setIsLoading(false);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, margin: "-50px" },
    transition: { staggerChildren: 0.15 }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-neutral-900 pt-24 pb-20 font-sans selection:bg-orange-500/30 overflow-hidden">

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-96 bg-gradient-to-b from-orange-500/5 to-transparent pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div {...fadeInUp} className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold text-xs tracking-widest uppercase mb-2">
            Contactez-nous
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-neutral-900 dark:text-white leading-[1.1]">
            Parlons de vos <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">projets</span>
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed">
            Vous avez des questions sur nos produits d'exception ou besoin d'une assistance particulière ? Notre équipe d'experts est à votre entière disposition.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

          {/* Colonne gauche: cartes d'infos */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {[
              {
                icon: "📍", title: "Adresse Siège Social", desc: "Immeuble Makiti, Quartier Kaloum\nConakry, République de Guinée",
                bg: "bg-orange-50 dark:bg-orange-500/10", text: "text-orange-600 dark:text-orange-400"
              },
              {
                icon: "✉️", title: "Email Professionnel", desc: "support@guineemakiti.com\ncontact@guineemakiti.com",
                bg: "bg-blue-50 dark:bg-blue-500/10", text: "text-blue-600 dark:text-blue-400"
              },
              {
                icon: "📞", title: "Assistance Téléphonique", desc: "+224 620 00 00 00\n+224 664 00 00 00",
                bg: "bg-emerald-50 dark:bg-emerald-500/10", text: "text-emerald-600 dark:text-emerald-400"
              }
            ].map((info, i) => (
              <motion.div key={i} variants={fadeInUp} className="group p-6 rounded-3xl bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 shadow-xl shadow-neutral-100 dark:shadow-none hover:border-orange-200 dark:hover:border-neutral-600 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start gap-5">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${info.bg} ${info.text}`}>
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-1.5">{info.title}</h3>
                    <p className="text-neutral-600 dark:text-neutral-400 font-medium whitespace-pre-line leading-relaxed text-sm">
                      {info.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.div variants={fadeInUp} className="mt-4 rounded-3xl overflow-hidden shadow-2xl shadow-neutral-200/50 dark:shadow-none border border-neutral-100 dark:border-neutral-700 relative group h-48">
              <img
                src="https://images.unsplash.com/photo-1459664018906-085c36f472af?q=80&w=1374&auto=format&fit=crop"
                alt="Localisation"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent flex items-end p-6">
                <p className="text-white font-bold tracking-widest uppercase text-xs">Découvrez la Guinée</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Colonne droite: formulaire */}
          <motion.div {...fadeInUp} className="lg:col-span-3">
            <div className="bg-white dark:bg-neutral-800 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-neutral-200/40 dark:shadow-none border border-neutral-100 dark:border-neutral-700 relative">

              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-bl-[4rem] rounded-tr-[2.5rem] -z-10 blur-2xl" />

              <h3 className="text-2xl md:text-3xl font-black text-neutral-900 dark:text-white mb-2 tracking-tight">Envoyez-nous un message</h3>
              <p className="text-neutral-500 dark:text-neutral-400 font-medium text-sm mb-8">Nous vous répondrons dans un délai de 24h ouvrées maximum.</p>

              {isSubmitted && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 p-4 rounded-2xl flex items-center gap-3 font-medium">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center flex-shrink-0">✓</div>
                  Votre message a été envoyé avec succès ! Nous y accordons la plus grande importance.
                </motion.div>
              )}

              {errors.general && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-400 p-4 rounded-2xl flex items-center gap-3 font-medium">
                  <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-500/20 flex items-center justify-center flex-shrink-0">!</div>
                  {errors.general}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest pl-1">Nom Complet</label>
                    <input
                      type="text"
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      placeholder="Ex: Diallo"
                      className={`w-full px-5 py-4 rounded-2xl border bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white outline-none transition-all placeholder:text-neutral-400 ${errors.nom ? 'border-red-500 focus:ring-2 focus:ring-red-500/20' : 'focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20'
                        }`}
                    />
                    {errors.nom && <p className="text-xs text-red-500 font-medium pl-1">{errors.nom}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest pl-1">Adresse Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="votre@email.com"
                      className={`w-full px-5 py-4 rounded-2xl border bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white outline-none transition-all placeholder:text-neutral-400 ${errors.email ? 'border-red-500 focus:ring-2 focus:ring-red-500/20' : 'focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20'
                        }`}
                    />
                    {errors.email && <p className="text-xs text-red-500 font-medium pl-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest pl-1">Objet de la demande</label>
                  <input
                    type="text"
                    name="sujet"
                    value={formData.sujet}
                    onChange={handleChange}
                    placeholder="Sujet de votre message"
                    className={`w-full px-5 py-4 rounded-2xl border bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white outline-none transition-all placeholder:text-neutral-400 ${errors.sujet ? 'border-red-500 focus:ring-2 focus:ring-red-500/20' : 'focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20'
                      }`}
                  />
                  {errors.sujet && <p className="text-xs text-red-500 font-medium pl-1">{errors.sujet}</p>}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between pl-1 pr-2">
                    <label className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest">Votre Message</label>
                    <span className="text-xs font-medium text-neutral-400">{formData.message.length} / 500</span>
                  </div>
                  <textarea
                    name="message"
                    rows={5}
                    maxLength={500}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Détaillez votre demande ici..."
                    className={`w-full px-5 py-4 rounded-2xl border bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white outline-none transition-all placeholder:text-neutral-400 resize-none ${errors.message ? 'border-red-500 focus:ring-2 focus:ring-red-500/20' : 'focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20'
                      }`}
                  />
                  {errors.message && <p className="text-xs text-red-500 font-medium pl-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full relative group overflow-hidden px-8 py-5 rounded-2xl bg-orange-500 text-white font-black uppercase tracking-widest shadow-xl shadow-orange-500/30 hover:shadow-orange-500/40 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-400 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {isLoading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Envoi en cours
                      </>
                    ) : (
                      <>
                        Transmettre le Message
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </>
                    )}
                  </span>
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
