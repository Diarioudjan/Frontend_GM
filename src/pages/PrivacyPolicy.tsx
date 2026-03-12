import React from 'react';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="heading-2 mb-4 py-10">
                        Politique de Confidentialité
                    </h1>
                    <p className="text-body text-lg">
                        Dernière mise à jour : 6 août 2024
                    </p>
                </div>

                {/* Content */}
                <div className="bg-white rounded-lg shadow-sm p-8">
                    <div className="prose prose-lg max-w-none">

                        <section className="mb-8">
                            <h2 className="heading-3 mb-4">1. Introduction</h2>
                            <p className="text-body leading-relaxed mb-4">
                                GuineeMakiti s'engage à protéger votre vie privée. Cette politique de confidentialité
                                explique comment nous collectons, utilisons, partageons et protégeons vos informations
                                personnelles lorsque vous utilisez notre plateforme.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="heading-3 mb-4">2. Informations que nous collectons</h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Informations personnelles</h3>
                                    <ul className="list-disc list-inside text-body space-y-1">
                                        <li>Nom, prénom et informations de contact</li>
                                        <li>Adresse de livraison et de facturation</li>
                                        <li>Numéro de téléphone et adresse email</li>
                                        <li>Informations de paiement (cryptées)</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Données d'utilisation</h3>
                                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                                        <li>Historique de navigation sur notre site</li>
                                        <li>Produits consultés et achetés</li>
                                        <li>Préférences et paramètres de compte</li>
                                        <li>Données techniques (adresse IP, navigateur, appareil)</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Comment nous utilisons vos informations</h2>
                            <ul className="list-disc list-inside text-gray-600 space-y-2">
                                <li>Traiter et livrer vos commandes</li>
                                <li>Gérer votre compte et fournir un support client</li>
                                <li>Personnaliser votre expérience d'achat</li>
                                <li>Envoyer des communications marketing (avec votre consentement)</li>
                                <li>Améliorer nos services et développer de nouvelles fonctionnalités</li>
                                <li>Respecter nos obligations légales</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Partage de vos informations</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Nous ne vendons jamais vos informations personnelles. Nous pouvons partager vos données avec :
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2">
                                <li>Nos partenaires artisans pour le traitement des commandes</li>
                                <li>Prestataires de services de livraison</li>
                                <li>Processeurs de paiement sécurisés</li>
                                <li>Fournisseurs de services techniques (hébergement, analytics)</li>
                                <li>Autorités légales si requis par la loi</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Sécurité des données</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées :
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2">
                                <li>Cryptage SSL pour toutes les transmissions de données</li>
                                <li>Stockage sécurisé des informations de paiement</li>
                                <li>Accès limité aux données personnelles</li>
                                <li>Surveillance continue de nos systèmes</li>
                                <li>Formation régulière de notre équipe sur la sécurité</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Vos droits</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Vous disposez des droits suivants concernant vos données personnelles :
                            </p>
                            <ul className="list-disc list-inside text-gray-600 space-y-2">
                                <li>Droit d'accès à vos données</li>
                                <li>Droit de rectification des informations inexactes</li>
                                <li>Droit à l'effacement de vos données</li>
                                <li>Droit à la portabilité de vos données</li>
                                <li>Droit d'opposition au traitement</li>
                                <li>Droit de retirer votre consentement</li>
                            </ul>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookies et technologies similaires</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Nous utilisons des cookies pour améliorer votre expérience. Vous pouvez gérer vos
                                préférences de cookies dans les paramètres de votre navigateur.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Conservation des données</h2>
                            <p className="text-gray-600 leading-relaxed">
                                Nous conservons vos données personnelles aussi longtemps que nécessaire pour fournir
                                nos services et respecter nos obligations légales, généralement pendant 5 ans après
                                la fermeture de votre compte.
                            </p>
                        </section>

                        <section className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact</h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Pour toute question concernant cette politique de confidentialité ou l'exercice de vos droits :
                            </p>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-gray-700"><strong>Email :</strong> privacy@guineemakiti.com</p>
                                <p className="text-gray-700"><strong>Téléphone :</strong> +224 XX XX XX XX</p>
                                <p className="text-gray-700"><strong>Adresse :</strong> Conakry, République de Guinée</p>
                            </div>
                        </section>

                    </div>
                </div>

                {/* Back to top button */}
                <div className="text-center mt-8">
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                    >
                        Retour en haut
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
