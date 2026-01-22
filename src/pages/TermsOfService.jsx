import React from 'react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 py-10">
          <h1 className="heading-2 mb-4">
            Conditions d'Utilisation
          </h1>
          <p className="text-body text-lg">
            Dernière mise à jour : 6 août 2024
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="prose prose-lg max-w-none">

            <section className="mb-8">
              <h2 className="heading-3 mb-4">1. Acceptation des conditions</h2>
              <p className="text-body leading-relaxed mb-4">
                En accédant et en utilisant la plateforme GuineeMakiti, vous acceptez d'être lié par
                ces conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas
                utiliser notre service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description du service</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                GuineeMakiti est une plateforme de commerce électronique dédiée à la promotion et à la
                vente de produits artisanaux guinéens authentiques. Nous connectons les artisans locaux
                avec les clients du monde entier.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Inscription et compte utilisateur</h2>
              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  Pour utiliser certaines fonctionnalités, vous devez créer un compte :
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Vous devez fournir des informations exactes et complètes</li>
                  <li>Vous êtes responsable de la sécurité de votre mot de passe</li>
                  <li>Vous devez avoir au moins 18 ans ou avoir l'autorisation parentale</li>
                  <li>Un seul compte par personne est autorisé</li>
                  <li>Vous devez nous notifier immédiatement de toute utilisation non autorisée</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Commandes et paiements</h2>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold mb-2">Processus de commande</h3>
                <ul className="list-disc list-inside text-body space-y-2">
                  <li>Toutes les commandes sont soumises à acceptation</li>
                  <li>Les prix sont indiqués en francs guinéens (GNF) sauf mention contraire</li>
                  <li>Les frais de livraison sont calculés lors de la commande</li>
                  <li>Nous nous réservons le droit de refuser ou d'annuler toute commande</li>
                </ul>

                <h3 className="text-lg font-semibold mb-2 mt-6">Paiement</h3>
                <ul className="list-disc list-inside text-body space-y-2">
                  <li>Le paiement doit être effectué au moment de la commande</li>
                  <li>Nous acceptons les cartes bancaires et les services de paiement mobile</li>
                  <li>Toutes les transactions sont sécurisées</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Livraison</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Les délais de livraison sont indicatifs et non contractuels</li>
                <li>La livraison s'effectue à l'adresse indiquée lors de la commande</li>
                <li>Le risque de perte ou d'endommagement est transféré lors de la livraison</li>
                <li>Vous devez vérifier l'état des produits à la réception</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Retours et remboursements</h2>
              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                  Conditions de retour :
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Délai de 14 jours à compter de la réception</li>
                  <li>Produits en parfait état, dans leur emballage d'origine</li>
                  <li>Les produits personnalisés ne peuvent être retournés</li>
                  <li>Les frais de retour sont à la charge du client sauf défaut</li>
                  <li>Remboursement sous 14 jours après réception du retour</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Propriété intellectuelle</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Tous les contenus de la plateforme (textes, images, logos, designs) sont protégés par
                les droits de propriété intellectuelle. Toute reproduction non autorisée est interdite.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Utilisation acceptable</h2>
              <p className="text-gray-600 leading-relaxed mb-4">Vous vous engagez à ne pas :</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Utiliser la plateforme à des fins illégales</li>
                <li>Perturber le fonctionnement du service</li>
                <li>Tenter d'accéder à des comptes d'autres utilisateurs</li>
                <li>Publier du contenu offensant ou inapproprié</li>
                <li>Violer les droits de propriété intellectuelle</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation de responsabilité</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                GuineeMakiti ne peut être tenu responsable des dommages indirects, incidents ou
                consécutifs résultant de l'utilisation de la plateforme. Notre responsabilité est
                limitée au montant de la commande concernée.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Modification des conditions</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications
                entrent en vigueur dès leur publication sur la plateforme.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Droit applicable et juridiction</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Ces conditions sont régies par le droit guinéen. Tout litige sera soumis à la
                juridiction des tribunaux de Conakry.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Pour toute question concernant ces conditions d'utilisation :
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700"><strong>Email :</strong> legal@guineemakiti.com</p>
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

export default TermsOfService;
