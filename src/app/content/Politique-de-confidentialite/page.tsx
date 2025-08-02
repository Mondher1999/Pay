// app/politique-de-confidentialite/page.tsx
import Link from 'next/link';

const PrivacyPolicyPage = () => {
  return (
    // Conteneur principal de la page
    <div className="bg-black-500 min-h-screen py-8 sm:py-12">
      <div className="max-w-4xl mx-auto bg-white p-6 sm:p-10 rounded-lg shadow-md">
        
        {/* En-tête avec titre et bouton de retour */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b border-gray-200 pb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
            Politique de Confidentialité
          </h1>
          <Link 
            href="/" 
            className="inline-block py-2 px-5 bg-black text-white font-semibold rounded-md transition-colors duration-200 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
          >
            RETOUR
          </Link>
        </header>

        {/* Contenu principal */}
        <main className="text-gray-700">
          <p className="leading-relaxed mb-6">
            Bienvenue sur Mh-boutique.fr. La protection de vos données personnelles est une priorité pour nous. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations lorsque vous utilisez notre site ou nos services.
          </p>
          
          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">1. Données Collectées</h3>
            <p className="leading-relaxed mb-4">Nous pouvons collecter les informations suivantes pour améliorer nos services :</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="font-bold">Données personnelles :</strong> nom, adresse email, numéro de téléphone, adresse de livraison, etc., lorsque vous créez un compte ou passez une commande.</li>
              <li><strong className="font-bold">Données techniques :</strong> adresse IP, type de navigateur, pages visitées, durée des sessions.</li>
              <li><strong className="font-bold">Cookies :</strong> pour améliorer votre expérience de navigation (voir Section 7).</li>
            </ul>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">2. Utilisation de vos Données</h3>
            <p className="leading-relaxed mb-4">Vos informations sont utilisées pour :</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Traiter vos commandes et gérer les livraisons.</li>
              <li>Répondre à vos demandes via le support client.</li>
              <li>Envoyer des communications marketing, si vous y avez consenti.</li>
              <li>Analyser les performances du site pour les améliorer.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">3. Partage de vos Données</h3>
            <p className="leading-relaxed mb-4">Nous ne vendons pas vos données personnelles. Cependant, elles peuvent être partagées avec :</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Des prestataires de services (paiements, transport, etc.).</li>
              <li>Les autorités légales, si la loi l’exige.</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">4. Sécurité des Données</h3>
            <p className="leading-relaxed">
              Nous mettons en œuvre des mesures de sécurité robustes pour protéger vos données contre tout accès non autorisé, modification ou perte accidentelle.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">5. Vos Droits</h3>
            <p className="leading-relaxed mb-4">Vous disposez des droits suivants concernant vos données :</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong className="font-bold">Accès :</strong> Obtenir une copie de vos données personnelles.</li>
              <li><strong className="font-bold">Rectification :</strong> Corriger des informations inexactes.</li>
              <li><strong className="font-bold">Suppression :</strong> Demander la suppression de vos données dans certaines conditions.</li>
              <li><strong className="font-bold">Opposition :</strong> Refuser le traitement de vos données pour des raisons légitimes.</li>
              <li><strong className="font-bold">Portabilité :</strong> Recevoir vos données dans un format structuré et lisible par machine.</li>
            </ul>
            <p className="leading-relaxed mt-4">
              Pour exercer ces droits, contactez-nous à mh.boutique.contact1@gmail.com
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">6. Durée de Conservation</h3>
            <p className="leading-relaxed">
              Vos données sont conservées uniquement le temps nécessaire pour remplir les objectifs décrits ou pour respecter les exigences légales.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">7. Cookies</h3>
            <p className="leading-relaxed mb-4">Notre site utilise des cookies pour :</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Faciliter la navigation.</li>
              <li>Analyser le trafic.</li>
            </ul>
            <p className="leading-relaxed mt-4">
              Vous pouvez gérer vos préférences de cookies dans les paramètres de votre navigateur.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">8. Mises à Jour</h3>
            <p className="leading-relaxed">
              Cette politique de confidentialité peut être mise à jour. Les modifications seront publiées sur cette page avec une date révisée.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">9. Contact</h3>
            <p className="leading-relaxed">
              Pour toute question concernant cette politique, contactez-nous à :<br />
              Email : mh.boutique.contact1@gmail.com
            </p>
          </section>

        </main>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
