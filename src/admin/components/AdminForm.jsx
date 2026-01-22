import React, { useState } from 'react';

const AdminForm = ({ 
  fields, 
  initialData = {}, 
  onSubmit, 
  onCancel, 
  title, 
  submitLabel = 'Sauvegarder',
  loading = false 
}) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    fields.forEach(field => {
      if (field.required && (!formData[field.name] || formData[field.name] === '')) {
        newErrors[field.name] = `${field.label} est requis`;
      }
      
      if (field.type === 'email' && formData[field.name]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData[field.name])) {
          newErrors[field.name] = 'Email invalide';
        }
      }
      
      if (field.type === 'number' && formData[field.name]) {
        if (isNaN(formData[field.name]) || formData[field.name] < 0) {
          newErrors[field.name] = `${field.label} doit être un nombre positif`;
        }
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const renderField = (field) => {
    const { name, label, type, options = [], required = false } = field;
    const value = formData[name] || '';
    const error = errors[name];

    const baseClasses = "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";
    const errorClasses = error ? "border-red-300" : "border-gray-300";

    switch (type) {
      case 'textarea':
        return (
          <textarea
            name={name}
            value={value}
            onChange={handleInputChange}
            required={required}
            rows={4}
            className={`${baseClasses} ${errorClasses}`}
            placeholder={`Entrez ${label.toLowerCase()}`}
          />
        );

      case 'select':
        return (
          <select
            name={name}
            value={value}
            onChange={handleInputChange}
            required={required}
            className={`${baseClasses} ${errorClasses}`}
          >
            <option value="">Sélectionnez {label.toLowerCase()}</option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case 'checkbox':
        return (
          <div className="flex items-center">
            <input
              type="checkbox"
              name={name}
              checked={value}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label className="ml-2 text-sm text-gray-700">
              {label}
            </label>
          </div>
        );

      case 'number':
        return (
          <input
            type="number"
            name={name}
            value={value}
            onChange={handleInputChange}
            required={required}
            min="0"
            step="0.01"
            className={`${baseClasses} ${errorClasses}`}
            placeholder={`Entrez ${label.toLowerCase()}`}
          />
        );

      case 'email':
        return (
          <input
            type="email"
            name={name}
            value={value}
            onChange={handleInputChange}
            required={required}
            className={`${baseClasses} ${errorClasses}`}
            placeholder={`Entrez ${label.toLowerCase()}`}
          />
        );

      case 'tel':
        return (
          <input
            type="tel"
            name={name}
            value={value}
            onChange={handleInputChange}
            required={required}
            className={`${baseClasses} ${errorClasses}`}
            placeholder={`Entrez ${label.toLowerCase()}`}
          />
        );

      default:
        return (
          <input
            type="text"
            name={name}
            value={value}
            onChange={handleInputChange}
            required={required}
            className={`${baseClasses} ${errorClasses}`}
            placeholder={`Entrez ${label.toLowerCase()}`}
          />
        );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {renderField(field)}
            {errors[field.name] && (
              <p className="mt-1 text-sm text-red-600">{errors[field.name]}</p>
            )}
          </div>
        ))}

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Chargement...
              </div>
            ) : (
              submitLabel
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminForm; 