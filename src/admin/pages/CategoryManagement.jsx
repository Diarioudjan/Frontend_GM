import React, { useState, useEffect } from 'react';
import AdminForm from '../components/AdminForm';
import { ADMIN_MODULES } from '../management';
import { formatDate } from '../../services/api';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simuler le chargement des catégories
    setCategories([
      {
        id: 1,
        name: 'Céréales',
        description: 'Riz, maïs, mil, sorgho',
        icon: '🌾',
        isActive: true,
        createdAt: new Date()
      },
      {
        id: 2,
        name: 'Huiles',
        description: 'Huiles végétales et essentielles',
        icon: '🫒',
        isActive: true,
        createdAt: new Date()
      },
      {
        id: 3,
        name: 'Légumes',
        description: 'Légumes frais et locaux',
        icon: '🥬',
        isActive: true,
        createdAt: new Date()
      }
    ]);
  }, []);

  const handleCreate = (categoryData) => {
    const newCategory = {
      id: categories.length + 1,
      ...categoryData,
      createdAt: new Date()
    };
    setCategories([...categories, newCategory]);
    setShowForm(false);
  };

  const handleUpdate = (categoryData) => {
    setCategories(categories.map(category => 
      category.id === editingCategory.id ? { ...category, ...categoryData } : category
    ));
    setEditingCategory(null);
    setShowForm(false);
  };

  const handleDelete = (categoryId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      setCategories(categories.filter(category => category.id !== categoryId));
    }
  };

  const openEditForm = (category) => {
    setEditingCategory(category);
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{ADMIN_MODULES.categories.name}</h1>
          <p className="text-gray-600">{ADMIN_MODULES.categories.description}</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          + Ajouter une catégorie
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <AdminForm
              fields={ADMIN_MODULES.categories.fields}
              initialData={editingCategory || {}}
              onSubmit={editingCategory ? handleUpdate : handleCreate}
              onCancel={() => {
                setShowForm(false);
                setEditingCategory(null);
              }}
              title={editingCategory ? 'Modifier la catégorie' : 'Ajouter une catégorie'}
              submitLabel={editingCategory ? 'Modifier' : 'Ajouter'}
              loading={loading}
            />
          </div>
        </div>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <span className="text-3xl mr-3">{category.icon}</span>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </div>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                category.isActive 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {category.isActive ? 'Actif' : 'Inactif'}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">
                Créée le {formatDate(category.createdAt)}
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => openEditForm(category)}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryManagement; 