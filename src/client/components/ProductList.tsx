import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../../types';

interface ProductListProps {
    products: Product[];
    title?: string;
    subtitle?: string;
    layout?: 'grid' | 'horizontal';
    loading?: boolean;
}

const ProductList: React.FC<ProductListProps> = ({ 
    products, 
    title, 
    subtitle, 
    layout = 'grid', 
    loading = false 
}) => {
    if (loading) {
        return (
            <div className="py-10 text-center uppercase text-[10px] font-black tracking-widest text-neutral-400 animate-pulse">
                Chargement des pépites...
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="py-10 text-center uppercase text-[10px] font-black tracking-widest text-neutral-400">
                Aucun produit trouvé dans cette sélection.
            </div>
        );
    }

    return (
        <section className="py-12">
            {(title || subtitle) && (
                <div className="flex justify-between items-end mb-10">
                    <div>
                        {subtitle && (
                            <span className="text-[10px] font-black text-primary-600 uppercase tracking-[0.2em] mb-2 block">
                                {subtitle}
                            </span>
                        )}
                        {title && (
                            <h2 className="text-3xl font-black text-neutral-900 dark:text-white tracking-tighter">
                                {title}
                            </h2>
                        )}
                    </div>
                </div>
            )}

            {layout === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {products.map((product, index) => (
                        <ProductCard key={product._id || product.id || index} product={product} />
                    ))}
                </div>
            ) : (
                <div className="flex gap-6 overflow-x-auto pb-10 scrollbar-hide snap-x snap-mandatory">
                    {products.map((product, index) => (
                        <div key={product._id || product.id || index} className="min-w-[280px] md:min-w-[320px] snap-start">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default ProductList;



