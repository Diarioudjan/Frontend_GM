import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Error404: React.FC = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <div className="text-center">
                        {/* 404 Icon */}
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-6">
                            <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>

                        {/* Error Number */}
                        <div className="text-9xl font-bold text-gray-200 mb-4">404</div>

                        {/* Error Message */}
                        <h1 className="heading-2 mb-4">
                            Page non trouvée
                        </h1>
                        <p className="text-body mb-8">
                            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
                        </p>

                        {/* Action Buttons */}
                        <div className="space-y-4">
                            <button
                                onClick={handleGoBack}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Retour en arrière
                            </button>

                            <Link
                                to="/"
                                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                Retour à l'accueil
                            </Link>
                        </div>

                        {/* Quick Links */}
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <p className="text-sm text-gray-500 mb-4">
                                Pages populaires :
                            </p>
                            <div className="grid grid-cols-2 gap-2">
                                <Link
                                    to="/produits"
                                    className="text-sm text-green-600 hover:text-green-500 flex items-center"
                                >
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                    Produits
                                </Link>
                                <Link
                                    to="/contact"
                                    className="text-sm text-green-600 hover:text-green-500 flex items-center"
                                >
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Contact
                                </Link>
                                <Link
                                    to="/about"
                                    className="text-sm text-green-600 hover:text-green-500 flex items-center"
                                >
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    À propos
                                </Link>
                                <Link
                                    to="/connexion"
                                    className="text-sm text-green-600 hover:text-green-500 flex items-center"
                                >
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    Connexion
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional Help Section */}
            <div className="mt-8 text-center">
                <p className="text-sm text-gray-500">
                    Besoin d'aide ? Contactez-nous à{' '}
                    <a href="mailto:support@guineemakiti.com" className="text-green-600 hover:text-green-500">
                        support@guineemakiti.com
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Error404;
