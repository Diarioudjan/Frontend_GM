import React from 'react';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiHeart, FiEye } from 'react-icons/fi';
import { Product } from '../../types';
import { formatCurrency } from '../../services/api';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart } = useCart();

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        await addToCart(product);
    };

    return (
        <motion.div 
            whileHover={{ y: -10 }}
            className="group relative bg-white dark:bg-[#111] rounded-3xl overflow-hidden border border-neutral-100 dark:border-neutral-800 shadow-sm hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-500"
        >
            {/* Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden bg-neutral-50 dark:bg-neutral-900 group">
                {product.image ? (
                    <img 
                        src={product.image} 
                        alt={product.nom} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-300">
                        <span className="text-4xl">📦</span>
                    </div>
                )}
                
                {/* Floating Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.categorie && (
                        <span className="px-3 py-1 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-full text-[8px] font-black uppercase tracking-widest text-primary-600 shadow-sm">
                            {product.categorie}
                        </span>
                    )}
                </div>

                {/* Hover Actions Group */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    <button className="w-10 h-10 rounded-xl bg-white dark:bg-[#111] text-neutral-600 dark:text-neutral-400 flex items-center justify-center shadow-lg hover:bg-orange-500 hover:text-white transition-all active:scale-95">
                        <FiHeart size={18} />
                    </button>
                    <button className="w-10 h-10 rounded-xl bg-white dark:bg-[#111] text-neutral-600 dark:text-neutral-400 flex items-center justify-center shadow-lg hover:bg-primary-600 hover:text-white transition-all active:scale-95">
                        <FiEye size={18} />
                    </button>
                    <button 
                        onClick={handleAddToCart}
                        className="w-10 h-10 rounded-xl bg-primary-600 text-white flex items-center justify-center shadow-lg hover:bg-primary-700 transition-all active:scale-95"
                    >
                        <FiShoppingCart size={18} />
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1 opacity-60">Guinée Makiti</p>
                        <h3 className="text-sm font-black text-neutral-900 dark:text-white truncate max-w-[150px] group-hover:text-primary-600 transition-colors">
                            {product.nom}
                        </h3>
                    </div>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                    <div className="flex flex-col">
                        <span className="text-lg font-black text-primary-600">
                            {formatCurrency(product.prix)}
                        </span>
                    </div>
                    {/* Add to Cart Minimalist Button (Alternative to Hover) */}
                    <button 
                        onClick={handleAddToCart}
                        className="p-2 border border-neutral-100 dark:border-neutral-800 rounded-xl text-neutral-400 hover:text-white hover:bg-primary-600 hover:border-primary-600 transition-all active:scale-90 lg:hidden"
                    >
                        <FiShoppingCart size={18} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;


