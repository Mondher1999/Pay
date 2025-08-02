// app/cgv/page.tsx
import Link from 'next/link';

const CgvPage = () => {
  return (
    // Conteneur principal de la page
    <div className="bg-black-500 min-h-screen py-8 sm:py-12">
      <div className="max-w-4xl mx-auto bg-white p-6 sm:p-10 rounded-lg shadow-md">
        
        {/* En-tête avec titre et bouton de retour */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b border-gray-200 pb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
            Conditions Générales de Vente 
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
          <p className="text-sm text-gray-500 mb-6">Dernière mise à jour : 02/08/2025</p>
          <p className="leading-relaxed mb-6">
            Bienvenue sur Mh-Boutique.fr. Ces Conditions Générales de Vente (CGV) définissent les droits et obligations entre Mh-Boutique.fr et ses clients dans le cadre de la vente en live. En passant commande, vous acceptez sans réserve ces CGV.
          </p>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">1. Objet</h3>
            <p className="leading-relaxed">
              Les présentes CGV régissent les commandes effectuées via les ventes en direct sur la plateforme Mh-Boutique.fr. Les produits présentés sont proposés dans la limite des stocks disponibles.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">2. Commandes</h3>
            <h4 className="text-lg font-semibold text-gray-700 mt-4 mb-2">2.1. Prise de commande en live</h4>
            <p className="leading-relaxed mb-4">
              Les commandes sont effectuées en direct lors des ventes diffusées sur notre plateforme ou nos réseaux sociaux. Pour réserver un produit, le client doit commenter ou envoyer un message selon les consignes données pendant le live. Toute commande est ferme et définitive une fois confirmée par Mh-Boutique.fr.
            </p>
            <h4 className="text-lg font-semibold text-gray-700 mt-4 mb-2">2.2. Validation de commande</h4>
            <p className="leading-relaxed mb-4">
              La validation de votre commande implique :
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>L’acceptation des présentes CGV.</li>
                <li>La disponibilité du produit commandé.</li>
            </ul>
            <h4 className="text-lg font-semibold text-gray-700 mt-4 mb-2">2.3. Paiement immédiat</h4>
            <p className="leading-relaxed">
              Le client s'engage à régler la commande immédiatement via le lien de paiement sécurisé fourni à l’issue de la vente. En cas de non-paiement dans les délais indiqués (maximum 4 heures), la commande sera annulée et le produit remis en vente.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">3. Produits et Disponibilité</h3>
            <p className="leading-relaxed">
              Les descriptions, photos et prix des produits sont présentés avec le plus grand soin. Cependant, des variations mineures peuvent exister (couleurs, dimensions). Les produits sont disponibles dans la limite des stocks. En cas d’indisponibilité après commande, le client sera informé et remboursé si le paiement a déjà été effectué.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">4. Prix et Paiement</h3>
            <h4 className="text-lg font-semibold text-gray-700 mt-4 mb-2">4.1. Prix</h4>
            <p className="leading-relaxed mb-4">
              Les prix affichés pendant le live incluent toutes taxes applicables (TTC). Les frais de livraison, si applicables, sont communiqués avant la confirmation de la commande.
            </p>
            <h4 className="text-lg font-semibold text-gray-700 mt-4 mb-2">4.2. Modes de paiement</h4>
            <p className="leading-relaxed mb-4">
              Le paiement s’effectue exclusivement via le lien sécurisé envoyé par Mh-Boutique.fr après la confirmation de la commande. Les modes de paiement acceptés incluent :
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
                <li>Carte bancaire</li>
                <li>Paypal</li>
                <li>Klarna</li>
                <li>Apple Pay</li>
                <li>Google Pay</li>
                <li>Amazon Pay</li>
          
            </ul>
            <h4 className="text-lg font-semibold text-gray-700 mt-4 mb-2">4.3. Sécurisation du paiement</h4>
            <p className="leading-relaxed">
              Toutes les transactions sont sécurisées grâce à des protocoles de cryptage.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">5. Livraison</h3>
            <h4 className="text-lg font-semibold text-gray-700 mt-4 mb-2">5.1. Zones de livraison</h4>
            <p className="leading-relaxed mb-4">
              Nous livrons uniquement dans les zones indiquées lors du live ou sur notre site web.
            </p>
            <h4 className="text-lg font-semibold text-gray-700 mt-4 mb-2">5.2. Délais de livraison</h4>
            <p className="leading-relaxed mb-4">
              Les délais varient en fonction de la destination et sont précisés lors de la commande. En général, les livraisons sont effectuées sous 2 à 5 jours ouvrés.
            </p>
            <h4 className="text-lg font-semibold text-gray-700 mt-4 mb-2">5.3. Frais de livraison</h4>
            <p className="leading-relaxed">
              Les frais de livraison sont à la charge du client, sauf mention contraire lors du live.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">6. Droit de Rétractation</h3>
            <p className="leading-relaxed mb-4">
              Conformément à la législation en vigueur, vous disposez de 14 jours pour exercer votre droit de rétractation à compter de la réception de votre commande.
            </p>
            <h4 className="text-lg font-semibold text-gray-700 mt-4 mb-2">6.1. Conditions</h4>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Le produit doit être retourné dans son état d’origine, non utilisé et dans son emballage d’origine.</li>
              <li>Les frais de retour sont à la charge du client.</li>
            </ul>
            <h4 className="text-lg font-semibold text-gray-700 mt-4 mb-2">6.2. Exclusions</h4>
            <p className="leading-relaxed">
              Les produits personnalisés ou périssables ne sont pas soumis au droit de rétractation.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">7. Garanties</h3>
            <p className="leading-relaxed mb-4">
              Conformément aux dispositions légales, vous bénéficiez de :
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>La garantie légale de conformité (articles L. 217-4 et suivants du Code de la consommation).</li>
              <li>La garantie des vices cachés (articles 1641 et suivants du Code civil).</li>
            </ul>
            <p className="leading-relaxed">
              En cas de produit défectueux ou non conforme, contactez-nous à mh.boutique.contact1@gmail.com.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">8. Responsabilités</h3>
            <p className="leading-relaxed">
              Mh-Boutique.fr ne saurait être tenu responsable des dommages indirects liés à l’utilisation de ses produits. En cas de force majeure (grèves, catastrophes naturelles, etc.), l'exécution des obligations sera suspendue.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">9. Protection des Données Personnelles</h3>
            <p className="leading-relaxed">
              Les informations collectées lors de vos achats sont traitées conformément à notre Politique de Confidentialité. Vous pouvez la consulter sur notre site.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">10. Litiges et Droit Applicable</h3>
            <p className="leading-relaxed">
              En cas de litige, une solution amiable sera privilégiée. À défaut, les tribunaux compétents seront ceux du lieu de domicile du client. Le droit applicable est le droit français.
            </p>
          </section>

          <section className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">11. Contact</h3>
            <p className="leading-relaxed">
              Pour toute question ou réclamation, contactez-nous :<br />
              Email : mh.boutique.contact1@gmail.com
            </p>
          </section>

        </main>
      </div>
    </div>
  );
};

export default CgvPage;
