import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { formatCurrency } from '../services/api';
import { Product, Region } from '../types/products';

interface RegionParams extends Record<string, string | undefined> {
  id: string;
}

const RegionDetail: React.FC = () => {
  const { id } = useParams<RegionParams>();
  const [region, setRegion] = useState<Region | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    // Simuler le chargement des données de la région
    setTimeout(() => {
      const regionData = {
        id: id,
        name: getRegionName(id),
        description: getRegionDescription(id),
        image: getRegionImage(id),
        shippingCost: getRegionShippingCost(id),
        totalProducts: 45,
        totalOrders: 156,
        averageRating: 4.5
      };
      
      const productsData = getRegionProducts(id);
      
      setRegion(regionData);
      setProducts(productsData);
      setLoading(false);
    }, 1000);
  }, [id]);

  const getRegionName = (regionId: string): string => {
    const regions = {
      'conakry': 'Conakry',
      'kindia': 'Kindia',
      'kankan': 'Kankan',
      'labe': 'Labé',
      'nzerekore': 'Nzérékoré',
      'boke': 'Boké',
      'faranah': 'Faranah',
      'mamou': 'Mamou'
    };
    return regions[regionId] || 'Région inconnue';
  };

  const getRegionDescription = (regionId: string): string => {
    const descriptions = {
      'conakry': 'Capitale économique et politique de la Guinée, Conakry est le centre commercial principal du pays avec une grande diversité de produits locaux et importés.',
      'kindia': 'Région agricole par excellence, Kindia est réputée pour ses fruits, légumes et produits maraîchers de qualité.',
      'kankan': 'Centre culturel et commercial de la Haute-Guinée, Kankan est connue pour ses produits artisanaux et agricoles.',
      'labe': 'Capitale de la Moyenne-Guinée, Labé est célèbre pour ses produits laitiers et ses cultures de montagne.',
      'nzerekore': 'Cœur de la Guinée forestière, Nzérékoré offre une grande variété de produits forestiers et agricoles.',
      'boke': 'Région minière et côtière, Boké est connue pour ses produits de la mer et ses ressources naturelles.',
      'faranah': 'Région centrale avec un riche patrimoine agricole et artisanal.',
      'mamou': 'Région montagneuse réputée pour ses cultures de montagne et ses produits laitiers.'
    };
    return descriptions[regionId] || 'Description de la région';
  };

  const getRegionImage = (regionId: string): string => {
    const images = {
      'conakry': '/images/regions/conakry.jpg',
      'kindia': '/images/regions/kindia.jpg',
      'kankan': '/images/regions/kankan.jpg',
      'labe': '/images/regions/labe.jpg',
      'nzerekore': '/images/regions/nzerekore.jpg',
      'boke': '/images/regions/boke.jpg',
      'faranah': '/images/regions/faranah.jpg',
      'mamou': '/images/regions/mamou.jpg'
    };
    return images[regionId] || '/images/regions/default.jpg';
  };

  const getRegionShippingCost = (regionId: string): number => {
    const costs = {
      'conakry': 5000,
      'kindia': 8000,
      'kankan': 12000,
      'labe': 10000,
      'nzerekore': 15000,
      'boke': 9000,
      'faranah': 11000,
      'mamou': 9500
    };
    return costs[regionId] || 10000;
  };

  const getRegionProducts = (regionId: string): Product[] => {
    const allProducts = [
      {
        id: 1,
        name: 'Riz local de qualité supérieure',
        price: 5000,
        image: '/images/products/riz.jpg',
        category: 'Céréales',
        rating: 4.5,
        reviews: 23,
        stock: 100,
        description: 'Riz cultivé localement avec des méthodes traditionnelles'
      },
      {
        id: 2,
        name: 'Huile de palme naturelle',
        price: 2500,
        image: '/images/products/huile-palme.jpg',
        category: 'Huiles',
        rating: 4.2,
        reviews: 18,
        stock: 50,
        description: 'Huile de palme pure et naturelle'
      },
      {
        id: 3,
        name: 'Poulet local fermier',
        price: 15000,
        image: '/images/products/poulet.jpg',
        category: 'Viandes',
        rating: 4.7,
        reviews: 31,
        stock: 25,
        description: 'Poulet élevé en liberté dans les fermes locales'
      },
      {
        id: 4,
        name: 'Tomates fraîches',
        price: 800,
        image: '/images/products/tomates.jpg',
        category: 'Légumes',
        rating: 4.3,
        reviews: 15,
        stock: 200,
        description: 'Tomates fraîches du jardin'
      },
      {
        id: 5,
        name: 'Oignons locaux',
        price: 600,
        image: '/images/products/oignons.jpg',
        category: 'Légumes',
        rating: 4.1,
        reviews: 12,
        stock: 150,
        description: 'Oignons cultivés localement'
      },
      {
        id: 6,
        name: 'Miel naturel',
        price: 3000,
        image: '/images/products/miel.jpg',
        category: 'Produits naturels',
        rating: 4.8,
        reviews: 28,
        stock: 30,
        description: 'Miel pur et naturel des abeilles locales'
      }
    ];

    // Filtrer les produits par région (simulation)
    return allProducts.filter((_, index) => index < 6);
  };

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter((product: Product) => product.category.toLowerCase() === filter);

  const categories = ['all', 'Céréales', 'Huiles', 'Viandes', 'Légumes', 'Produits naturels'];

  // Mapping des noms de régions depuis Home.jsx
  const getRegionNameFromId = (regionId: string): string => {
    const regionsMap = {
      '1': 'Basse Guinée',
      '2': 'Moyenne Guinée',
      '3': 'Haute Guinée',
      '4': 'Guinée Forestière'
    };
    return regionsMap[regionId] || region?.name || 'Région';
  };

  // Récupérer l'image de fond depuis les données de Home.jsx
  const getRegionBackgroundImage = (regionId: string): string => {
    const images = {
      '1': 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      '2': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      '3': 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      '4': 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
    };
    return images[regionId] || images['1'];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 pt-20">
      {/* Header de la région */}
      <div className="relative h-[400px] overflow-hidden">
        <img
          src={getRegionBackgroundImage(id)}
          alt={getRegionNameFromId(id)}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container-custom text-center text-white relative z-10">
            <h1 className="heading-1 text-white mb-4">{getRegionNameFromId(id)}</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">{region?.description}</p>
          </div>
        </div>
      </div>

      {/* Statistiques de la région */}
      <section className="py-12 bg-neutral-50 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white dark:bg-neutral-900 rounded-2xl shadow-soft">
              <div className="heading-3 text-primary-500 dark:text-primary-400 mb-2">{region?.totalProducts || 0}</div>
              <div className="text-caption">Produits disponibles</div>
            </div>
            <div className="text-center p-6 bg-white dark:bg-neutral-900 rounded-2xl shadow-soft">
              <div className="heading-3 text-primary-500 dark:text-primary-400 mb-2">{region?.totalOrders || 0}</div>
              <div className="text-caption">Commandes traitées</div>
            </div>
            <div className="text-center p-6 bg-white dark:bg-neutral-900 rounded-2xl shadow-soft">
              <div className="heading-3 text-primary-500 dark:text-primary-400 mb-2">{region?.averageRating || 0}</div>
              <div className="text-caption">Note moyenne</div>
            </div>
            <div className="text-center p-6 bg-white dark:bg-neutral-900 rounded-2xl shadow-soft">
              <div className="heading-3 text-primary-500 dark:text-primary-400 mb-2">{formatCurrency(region?.shippingCost || 0)}</div>
              <div className="text-caption">Frais de livraison</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filtres et produits */}
      <section className="section-padding bg-white dark:bg-neutral-900">
        <div className="container-custom">
          {/* Filtres */}
          <div className="mb-12">
            <h2 className="heading-2 mb-6">Produits de {getRegionNameFromId(id)}</h2>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    filter === category
                      ? 'bg-primary-500 text-white shadow-md'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                  }`}
                >
                  {category === 'all' ? 'Tous' : category}
                </button>
              ))}
            </div>
          </div>

          {/* Grille des produits */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="card-hover group">
                <div className="h-56 bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-700 dark:to-neutral-800 flex items-center justify-center overflow-hidden">
                  <svg className="w-16 h-16 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-neutral-900 dark:text-white text-base line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{product.name}</h3>
                    <span className="badge-primary text-xs ml-2">{product.category}</span>
                  </div>
                  
                  <p className="text-body text-sm mb-3 line-clamp-2">{product.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'fill-neutral-300'}`} viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-caption ml-1">({product.reviews})</span>
                    </div>
                    <span className={`text-xs font-medium ${product.stock > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {product.stock > 0 ? `${product.stock} stock` : 'Rupture'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-primary-600 dark:text-primary-400">{formatCurrency(product.price)}</span>
                    <Link
                      to={`/produit/${product.id}`}
                      className="btn-primary text-sm px-4 py-2"
                    >
                      Voir détails
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="heading-3 mb-2">Aucun produit trouvé</h3>
              <p className="text-body">Aucun produit ne correspond aux critères sélectionnés.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default RegionDetail; 
