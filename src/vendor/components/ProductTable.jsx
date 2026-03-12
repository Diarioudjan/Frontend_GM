import React from 'react';
import { formatCurrency } from '../../services/api';

const ProductTable = ({ products, onEdit, onDelete }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-3">
                <thead>
                    <tr className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.2em] h-12">
                        <th className="px-6">Produit</th>
                        <th className="px-6">Catégorie</th>
                        <th className="px-6">Prix</th>
                        <th className="px-6">Stock</th>
                        <th className="px-6 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product._id} className="bg-[#2d241e]/20 hover:bg-[#2d241e]/40 transition-colors group">
                            <td className="px-6 py-4 first:rounded-l-[20px]">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-neutral-800 overflow-hidden border border-[#3d3129]">
                                        {product.images?.[0] ? (
                                            <img src={product.images[0]} alt={product.nom} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-neutral-600">📦</div>
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-white font-bold text-sm tracking-tight">{product.nom}</p>
                                        <p className="text-neutral-500 text-[10px] line-clamp-1 max-w-[200px]">{product.description}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="bg-[#1a1512] px-3 py-1 rounded-full text-[10px] font-bold text-primary-500 uppercase border border-primary-500/10">
                                    {product.categorie}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <span className="text-white font-black text-sm">{formatCurrency(product.prix)}</span>
                            </td>
                            <td className="px-6 py-4 text-sm">
                                <span className={product.stock <= 5 ? 'text-red-500 font-black' : 'text-neutral-300 font-bold'}>
                                    {product.stock}
                                </span>
                            </td>
                            <td className="px-6 py-4 last:rounded-r-[20px] text-right">
                                <div className="flex justify-end gap-2">
                                    <button onClick={() => onEdit(product)} className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-all">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                    </button>
                                    <button onClick={() => onDelete(product._id)} className="p-2 text-neutral-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;
