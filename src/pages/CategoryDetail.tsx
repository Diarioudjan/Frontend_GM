import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { formatCurrency } from '../services/api';
import { Product } from '../types';

interface CategoryData {
    id: string;
    name: string;
    description: string;
    icon: string;
    totalProducts: number;
    totalSales: number;
    averageRating: number;
    popularRegions: string[];
}

const CategoryDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    // Initialize with null but cast or handle loading state to avoid null checks everywhere if possible, 
    // or use optional chaining.
    const [category, setCategory] = useState<CategoryData | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [filter, setFilter] = useState<string>('all');
    const [sortBy, setSortBy] = useState<string>('name');

    useEffect(() => {
        // Simuler le chargement des données de la catégorie
        if (!id) return;

        setTimeout(() => {
            const categoryData: CategoryData = {
                id: id,
                name: getCategoryName(id),
                description: getCategoryDescription(id),
                icon: getCategoryIcon(id),
                totalProducts: 78,
                totalSales: 1250000,
                averageRating: 4.3,
                popularRegions: getCategoryRegions(id)
            };

            const productsData = getCategoryProducts(id);

            setCategory(categoryData);
            setProducts(productsData);
            setLoading(false);
        }, 1000);
    }, [id]);

    const getCategoryName = (categoryId: string): string => {
        const categories: Record<string, string> = {
            'cereales': 'Céréales',
            'huiles': 'Huiles',
            'legumes': 'Légumes',
            'fruits': 'Fruits',
            'viandes': 'Viandes',
            'poissons': 'Poissons',
            'produits-laitiers': 'Produits laitiers',
            'epices': 'Épices',
            'produits-naturels': 'Produits naturels',
            'artisanat': 'Artisanat'
        };
        return categories[categoryId] || 'Catégorie inconnue';
    };

    const getCategoryDescription = (categoryId: string): string => {
        const descriptions: Record<string, string> = {
            'cereales': 'Découvrez notre sélection de céréales locales de qualité supérieure, cultivées avec des méthodes traditionnelles respectueuses de l\'environnement.',
            'huiles': 'Huiles naturelles et essentielles extraites de plantes locales, riches en nutriments et saveurs authentiques.',
            'legumes': 'Légumes frais et bio cultivés localement, garantissant fraîcheur et qualité nutritionnelle.',
            'fruits': 'Fruits de saison récoltés à maturité optimale, offrant des saveurs naturelles et des bienfaits nutritionnels.',
            'viandes': 'Viandes de qualité supérieure issues d\'élevages locaux respectueux du bien-être animal.',
            'poissons': 'Poissons frais pêchés dans nos eaux locales, garantissant fraîcheur et traçabilité.',
            'produits-laitiers': 'Produits laitiers traditionnels fabriqués selon des méthodes ancestrales.',
            'epices': 'Épices et condiments locaux pour rehausser vos plats avec des saveurs authentiques.',
            'produits-naturels': 'Produits naturels et bio pour votre bien-être et votre santé.',
            'artisanat': 'Objets artisanaux uniques créés par nos artisans locaux avec passion et savoir-faire.'
        };
        return descriptions[categoryId] || 'Description de la catégorie';
    };

    const getCategoryIcon = (categoryId: string): string => {
        const icons: Record<string, string> = {
            'cereales': '🌾',
            'huiles': '🫒',
            'legumes': '🥬',
            'fruits': '🍎',
            'viandes': '🥩',
            'poissons': '🐟',
            'produits-laitiers': '🥛',
            'epices': '🌶️',
            'produits-naturels': '🌿',
            'artisanat': '🏺'
        };
        return icons[categoryId] || '📦';
    };

    const getCategoryRegions = (categoryId: string): string[] => {
        const regions: Record<string, string[]> = {
            'cereales': ['Conakry', 'Kindia', 'Kankan'],
            'huiles': ['Nzérékoré', 'Boké', 'Faranah'],
            'legumes': ['Kindia', 'Conakry', 'Labé'],
            'fruits': ['Kindia', 'Nzérékoré', 'Mamou'],
            'viandes': ['Labé', 'Mamou', 'Kankan'],
            'poissons': ['Boké', 'Conakry', 'Kindia'],
            'produits-laitiers': ['Labé', 'Mamou', 'Faranah'],
            'epices': ['Kankan', 'Nzérékoré', 'Kindia'],
            'produits-naturels': ['Nzérékoré', 'Mamou', 'Labé'],
            'artisanat': ['Kankan', 'Nzérékoré', 'Conakry']
        };
        return regions[categoryId] || [];
    };

    const getCategoryProducts = (categoryId: string): Product[] => {
        const allProducts: any[] = [
            {
                id: '1',
                nom: 'Riz local de qualité supérieure',
                prix: 5000,
                images: ['/images/products/riz.jpg'],
                categorie: 'Céréales',
                region: 'Conakry',
                rating: 4.5,
                reviews: 23,
                stock: 100,
                description: 'Riz cultivé localement avec des méthodes traditionnelles'
            },
            {
                id: '2',
                nom: 'Huile de palme naturelle',
                prix: 2500,
                images: ['/images/products/huile-palme.jpg'],
                categorie: 'Huiles',
                region: 'Nzérékoré',
                rating: 4.2,
                reviews: 18,
                stock: 50,
                description: 'Huile de palme pure et naturelle'
            },
            {
                id: '3',
                nom: 'Poulet local fermier',
                prix: 15000,
                images: ['/images/products/poulet.jpg'],
                categorie: 'Viandes',
                region: 'Labé',
                rating: 4.7,
                reviews: 31,
                stock: 25,
                description: 'Poulet élevé en liberté dans les fermes locales'
            },
            {
                id: '4',
                nom: 'Tomates fraîches',
                prix: 800,
                images: ['/images/products/tomates.jpg'],
                categorie: 'Légumes',
                region: 'Kindia',
                rating: 4.3,
                reviews: 15,
                stock: 200,
                description: 'Tomates fraîches du jardin'
            },
            {
                id: '5',
                nom: 'Oignons locaux',
                prix: 600,
                images: ['/images/products/oignons.jpg'],
                categorie: 'Légumes',
                region: 'Conakry',
                rating: 4.1,
                reviews: 12,
                stock: 150,
                description: 'Oignons cultivés localement'
            },
            {
                id: '6',
                nom: 'Miel naturel',
                prix: 3000,
                images: ['/images/products/miel.jpg'],
                categorie: 'Produits naturels',
                region: 'Mamou',
                rating: 4.8,
                reviews: 28,
                stock: 30,
                description: 'Miel pur et naturel des abeilles locales'
            },
            {
                id: '7',
                nom: 'Maïs local',
                prix: 1200,
                images: ['/images/products/mais.jpg'],
                categorie: 'Céréales',
                region: 'Kankan',
                rating: 4.4,
                reviews: 19,
                stock: 80,
                description: 'Maïs frais et nutritif'
            },
            {
                id: '8',
                nom: 'Huile d\'arachide',
                prix: 1800,
                images: ['/images/products/huile-arachide.jpg'],
                categorie: 'Huiles',
                region: 'Boké',
                rating: 4.6,
                reviews: 22,
                stock: 40,
                description: 'Huile d\'arachide pure et naturelle'
            }
        ];

        // Filtrer les produits par catégorie
        return allProducts.filter(product =>
            product.categorie.toLowerCase() === getCategoryName(categoryId).toLowerCase()
        ) as Product[];
    };

    // We need to extend Product type locally if it doesn't have region, rating, reviews.
    // Or just cast to any for the filter/sort logic which relies on them.
    // Ideally we should update types/index.ts but I will use intersection type here for safe local usage.

    type ComponentProduct = Product & { rating: number; reviews: number };

    const filteredProducts = filter === 'all'
        ? products as ComponentProduct[]
        : (products as ComponentProduct[]).filter(product => product.region.toLowerCase() === filter.toLowerCase());

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return a.prix - b.prix;
            case 'price-high':
                return b.prix - a.prix;
            case 'rating':
                return b.rating - a.rating;
            case 'name':
            default:
                return a.nom.localeCompare(b.nom);
        }
    });

    const regions = ['all', ...category?.popularRegions || []];

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!category) {
        return <div>Catégorie non trouvée</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            {/* Header de la catégorie */}
            <div className="relative h-64 bg-gradient-to-r from-green-600 to-green-800">
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <div className="relative h-full flex items-center justify-center">
                    <div className="text-center text-white">
                        <div className="text-6xl mb-4">{category.icon}</div>
                        <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
                        <p className="text-xl max-w-2xl mx-auto px-4">{category.description}</p>
                    </div>
                </div>
            </div>

            {/* Statistiques de la catégorie */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-600">{category.totalProducts}</div>
                            <div className="text-sm text-gray-600">Produits disponibles</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">{formatCurrency(category.totalSales)}</div>
                            <div className="text-sm text-gray-600">Ventes totales</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-yellow-600">{category.averageRating}</div>
                            <div className="text-sm text-gray-600">Note moyenne</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-orange-600">{category.popularRegions.length}</div>
                            <div className="text-sm text-gray-600">Régions populaires</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filtres et produits */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Filtres et tri */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <h2 className="text-2xl font-bold text-gray-900">Produits {category.name}</h2>

                        <div className="flex flex-wrap gap-4">
                            {/* Filtre par région */}
                            <div className="flex flex-wrap gap-2">
                                {regions.map((region) => (
                                    <button
                                        key={region}
                                        onClick={() => setFilter(region)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === region
                                                ? 'bg-green-600 text-white'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }`}
                                    >
                                        {region === 'all' ? 'Toutes les régions' : region}
                                    </button>
                                ))}
                            </div>

                            {/* Tri */}
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                                <option value="name">Trier par nom</option>
                                <option value="price-low">Prix croissant</option>
                                <option value="price-high">Prix décroissant</option>
                                <option value="rating">Note</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Grille des produits */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {sortedProducts.map((product) => (
                        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="h-48 bg-gray-200 flex items-center justify-center">
                                {/* Using images[0] because I changed data structure, also handle if images is undefined */}
                                {product.images && product.images.length > 0 ? (
                                    <img src={product.images[0]} alt={product.nom} className="w-full h-full object-cover" />
                                ) : (
                                    <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                )}
                            </div>

                            <div className="p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{product.nom}</h3>
                                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{product.region}</span>
                                </div>

                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center">
                                        <div className="flex text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                <svg key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'fill-gray-300'}`} viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <span className="text-sm text-gray-600 ml-1">({product.reviews})</span>
                                    </div>
                                    <span className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {product.stock > 0 ? `${product.stock} en stock` : 'Rupture'}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-xl font-bold text-gray-900">{formatCurrency(product.prix)}</span>
                                    <Link
                                        to={`/produit/${product.id}`}
                                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        Voir détails
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {sortedProducts.length === 0 && (
                    <div className="text-center py-12">
                        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun produit trouvé</h3>
                        <p className="text-gray-600">Aucun produit ne correspond aux critères sélectionnés.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryDetail;



