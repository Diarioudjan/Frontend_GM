import React from 'react';
import { motion } from 'framer-motion';

const Banner: React.FC = () => {
    return (
        <section className="relative w-full rounded-xl md:rounded-2xl overflow-hidden bg-gradient-to-br from-primary-600 via-primary-500 to-orange-500 shadow-lg shadow-primary-500/15">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[180px] h-[180px] rounded-full bg-white/20 blur-3xl"></div>
                <div className="absolute bottom-[20%] right-[30%] w-[90px] h-[90px] rounded-full bg-orange-300/30 blur-2xl"></div>
            </div>

            <div className="relative z-10 px-5 py-4 md:px-8 md:py-5 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="max-w-xl text-center md:text-left">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-2.5 py-0.5 rounded-full bg-white/10 text-white text-[8px] font-black uppercase tracking-[0.15em] mb-2.5 backdrop-blur-md border border-white/10"
                    >
                        Offre spéciale
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg md:text-2xl lg:text-3xl font-black text-white leading-[1.1] mb-2.5 tracking-tight"
                    >
                        Boostez votre <span className="text-orange-200">quotidien</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-white/80 text-[11px] md:text-sm font-medium mb-3.5 max-w-md leading-relaxed"
                    >
                        Découvrez les meilleures pépites locales livrées chez vous.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap gap-2 justify-center md:justify-start"
                    >
                        <button className="px-4 py-2 bg-white text-primary-600 rounded-lg font-black uppercase tracking-widest text-[9px] hover:shadow-xl hover:scale-105 active:scale-95 transition-all">
                            Découvrir
                        </button>
                        <button className="px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg font-black uppercase tracking-widest text-[9px] backdrop-blur-md hover:bg-white/20 transition-all">
                            Pro
                        </button>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, x: 50, rotate: 5 }}
                    animate={{ opacity: 1, x: 0, rotate: 0 }}
                    transition={{ type: 'spring', damping: 15, delay: 0.4 }}
                    className="relative hidden lg:block w-[280px]"
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 to-transparent rounded-2xl"></div>
                    <img
                        src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=800"
                        alt="Shopping"
                        className="w-full h-[220px] object-cover rounded-xl shadow-xl skew-x-[-1deg]"
                    />
                    <div className="absolute -bottom-3 -left-3 bg-white p-2 rounded-lg shadow-lg animate-bounce-gentle">
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center text-white text-[10px] font-black">OK</div>
                            <div>
                                <p className="text-[8px] font-black text-neutral-400 uppercase tracking-widest">Qualité</p>
                                <p className="text-[10px] font-black text-neutral-900">Garanti</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Banner;
