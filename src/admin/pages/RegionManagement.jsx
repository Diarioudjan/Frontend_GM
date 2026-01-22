import React, { useState, useEffect } from 'react';
import AdminForm from '../components/AdminForm';
import { ADMIN_MODULES } from '../management';
import { formatCurrency, formatDate } from '../../services/api';

const RegionManagement = () => {
  const [regions, setRegions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingRegion, setEditingRegion] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Simuler le chargement des régions
    setRegions([
      {
        id: 1,
        name: 'Conakry',
        description: 'Capitale de la Guinée',
        shippingCost: 5000,
        isActive: true,
        createdAt: new Date()
      },
      {
        id: 2,
        name: 'Kindia',
        description: 'Région administrative de Kindia',
        shippingCost: 8000,
        isActive: true,
        createdAt: new Date()
      },
      {
        id: 3,
        name: 'Kankan',
        description: 'Région administrative de Kankan',
        shippingCost: 12000,
        isActive: true,
        createdAt: new Date()
      }
    ]);
  }, []);

  const handleCreate = (regionData) => {
    const newRegion = {
      id: regions.length + 1,
      ...regionData,
      createdAt: new Date()
    };
    setRegions([...regions, newRegion]);
    setShowForm(false);
  };

  const handleUpdate = (regionData) => {
    setRegions(regions.map(region => 
      region.id === editingRegion.id ? { ...region, ...regionData } : region
    ));
    setEditingRegion(null);
    setShowForm(false);
  };

  const handleDelete = (regionId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette région ?')) {
      setRegions(regions.filter(region => region.id !== regionId));
    }
  };

  const openEditForm = (region) => {
    setEditingRegion(region);
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{ADMIN_MODULES.regions.name}</h1>
          <p className="text-gray-600">{ADMIN_MODULES.regions.description}</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          + Ajouter une région
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <AdminForm
              fields={ADMIN_MODULES.regions.fields}
              initialData={editingRegion || {}}
              onSubmit={editingRegion ? handleUpdate : handleCreate}
              onCancel={() => {
                setShowForm(false);
                setEditingRegion(null);
              }}
              title={editingRegion ? 'Modifier la région' : 'Ajouter une région'}
              submitLabel={editingRegion ? 'Modifier' : 'Ajouter'}
              loading={loading}
            />
          </div>
        </div>
      )}

      {/* Regions Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Liste des régions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Région
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Coût de livraison
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date de création
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {regions.map((region) => (
                <tr key={region.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                          {region.name.charAt(0)}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{region.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{region.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(region.shippingCost)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      region.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {region.isActive ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(region.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => openEditForm(region)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(region.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RegionManagement; 