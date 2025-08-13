'use client'

import { useState } from 'react'
import Link from 'next/link';
import { useMemo } from 'react';  
import MondialRelayModalSelector from './MondialRelayPicker';

export default function Checkout() {
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [tiktok, setTiktok] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('FR');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [shippingMethod, setShippingMethod] = useState('mondial_relay'); // 'mondial_relay' ou 'home_delivery'

  const [shippingAddress, setShippingAddress] = useState(null);

  // Icônes SVG (vous pouvez les placer dans un fichier séparé ou en haut de votre composant)
// Icônes SVG Améliorées

// Une icône de carte plus stylisée avec une puce.
// 2. Le tableau des options utilise maintenant les composants importés
// ...par ce nouveau tableau :


// Frais de livraison fixes
const SHIPPING_FEE = 5.00;

// Structure des frais de service par méthode de paiement
// (Exemples basés sur les tarifs Stripe)
const FEE_RATES = {
  card: { percentage: 0.015, fixed: 0.25 },     // 1.5% + 0.25€ pour les cartes européennes
  applepay: { percentage: 0.015, fixed: 0.25 }, // Apple Pay utilise les frais de la carte sous-jacente
  paypal: { percentage: 0.029, fixed: 0.30 },     // Environ 2.9% + 0.30€
  klarna: { percentage: 0.0299, fixed: 0.35 },    // Environ 2.99% + 0.35€
};

// Pour un affichage plus propre des noms
const PAYMENT_METHOD_NAMES = {
    card: 'Carte Bancaire',
    applepay: 'Apple Pay',
    paypal: 'PayPal',
    klarna: 'Klarna'
};


  // Cette fonction sera passée en prop à MondialRelayPicker
  const handlePointSelection = (point) => {
    console.log("🔥🔥 Point relais sélectionné :", JSON.stringify(point, null, 2));
    setShippingAddress({ type: 'mondial_relay', details: point });
  };
  


  const handlePlaceOrder = () => {
    // ...logique pour récupérer les autres infos du formulaire (panier, etc.)
    const orderData = {
      // ... autres données
      shipping: shippingAddress,
    };
    
    // Vous appelez ici votre backend pour créer la commande
    // fetch('/api/orders', { method: 'POST', body: JSON.stringify(orderData), ... })
    console.log("Envoi de la commande au backend :", orderData);
  };


 // --- DÉBUT DU BLOC DE CALCUL ---
 const { serviceFee, grandTotal } = useMemo(() => {
  const numericAmount = parseFloat(amount || "0");
  
  // Si le montant est nul, pas de frais
  if (numericAmount === 0) {
      return { serviceFee: 0, grandTotal: SHIPPING_FEE };
  }

  const rates = FEE_RATES[paymentMethod];
  if (!rates) {
      return { serviceFee: 0, grandTotal: numericAmount + SHIPPING_FEE };
  }
  
  // Calcul des frais de service
  const calculatedFee = (numericAmount * rates.percentage) + rates.fixed;
  
  // Calcul du total général
  const total = numericAmount + SHIPPING_FEE + calculatedFee;

  return {
      serviceFee: calculatedFee,
      grandTotal: total
  };

}, [amount, paymentMethod]);
const paymentOptions = [
  { id: 'card', name: 'Carte Bancaire', icon: '/icons/visa.png' },

  { id: 'paypal', name: 'PayPal', icon: 'icons/paypal.svg' },
  { id: 'klarna', name: 'Klarna', icon: 'icons/klarna.svg', description: 'Payer en 3 ou 4 fois' },
  { id: 'applepay', name: 'Apple Pay', icon: 'icons/applepaycom.svg' }
];







   // Le composant CheckIcon doit être déclaré localement ou importé séparément
   const CheckIcon = () => (
    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);
    const startCheckout = async () => {
      const parsedAmount = parseFloat(amount);
      if (!parsedAmount || parsedAmount <= 0) {
        setError('Veuillez entrer un montant valide.');
        return;
      }

      if (!shippingAddress) {
        setError('Veuillez choisir une méthode de livraison et un point relais.');
        return;
    }

      if (!email || !firstName || !lastName || !address || !city || !postalCode || !country || !phone) {
        setError('Veuillez remplir tous les champs de livraison.');
        return;
      }

      setError('');
      setLoading(true);

      try {
        const res = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: grandTotal.toFixed(2), // use grandTotal here instead of amount
          
            note,
            metadata: {
              email,
              firstName,
              lastName,
              address,
              city,
              postalCode,
              country,
              
              phone,
              tiktok,

                // ✅ Ajoute les données du point relais ici
              pointRelais_Num: shippingAddress?.details?.Num || '',
              pointRelais_Nom: shippingAddress?.details?.Nom || '',
              pointRelais_Adresse1: shippingAddress?.details?.Adresse1 || '',
              pointRelais_Adresse2: shippingAddress?.details?.Adresse2 || '',
              pointRelais_CP: shippingAddress?.details?.CP || '',
              pointRelais_Ville: shippingAddress?.details?.Ville || '',
            },
          }),
        });

        const data = await res.json();
        if (data?.url) {
          window.location.href = data.url;
        } else {
          throw new Error('Échec de la redirection vers Stripe');
        }
      } catch (err) {
        console.error(err);
        setError(err.message || 'Erreur inconnue');
        setLoading(false);
      }
    };
    
  
  // Options pour Stripe, utilisant votre fonction importée
  const options = {
    fetchClientSecret: () => fetchCSvr(
      parseFloat(amount), 
      note, 
      {
      email,
      firstName,
      lastName,
      address,
      city,
      postalCode,
      country,
      phone,
      tiktok,
      note,
      amount
    })
  }
  

  // Composant pour le spinner du bouton de chargement
  const SpinnerIcon = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );

  return (
    // MODIFICATION ICI: ajout de "flex-col" pour empiler le contenu verticalement
    <div className="min-h-screen bg-black flex flex-col items-center justify-center font-sans p-4">


      {/* === DÉBUT : BLOC DU LOGO AJOUTÉ === */}
  <div className="mb-2">
    <img src="/logo.png" alt="Logo de votre entreprise" className="h-68 w-68s" />
  </div>
  {/* === FIN : BLOC DU LOGO AJOUTÉ === */}
    
    <div className="w-full max-w-lg sm:max-w-3xl lg:max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* COLONNE GAUCHE — FORMULAIRE */}
        <div className="space-y-8">
          {/* --- Titre --- */}
         

          {/* --- Montant --- */}
          <div className="space-y-6">
          <h2 className="text-xl font-bold text-white">Montant total</h2>
          <div className="grid gap-5 sm:grid-cols-1">
            <div className="relative">
          <input
            type="number"
            id="amount"
            min="1"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Montant"
            className="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 focus:outline-none transition"
          />
          <div className="absolute inset-y-0 right-0 pr-6 flex items-center pointer-events-none">
            <span className="text-[#D4AF37">€   </span>
          </div>
        </div>              <input type="text" id="note" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Référence de commande" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 focus:outline-none transition" />
              <input type="text" id="tiktok" value={tiktok} onChange={(e) => setTiktok(e.target.value)} placeholder="Pseudo TikTok" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 focus:outline-none transition" />
            </div>
          </div>

          {/* --- Adresse de livraison --- */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white">Adresse de livraison</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 focus:outline-none transition" />
              </div>
              <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Prénom" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 focus:outline-none transition" />
              <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Nom" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 focus:outline-none transition" />
              <div className="sm:col-span-2">
                <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Adresse" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 focus:outline-none transition" />
              </div>
              <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Ville" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 focus:outline-none transition" />
              <input type="text" id="postalCode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} placeholder="Code postal" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 focus:outline-none transition" />
              <div>
                <label htmlFor="country" className="text-sm font-medium text-white mb-1 block">Pays</label>
                <select id="country" value={country} onChange={(e) => setCountry(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 focus:outline-none transition">
                  <option value="FR">France</option>
                  <option value="BE">Belgique</option>
                  <option value="ITA">Italie</option>
                <option value="GER">Allemagne</option>
                </select>
              </div>
              <div>
                <label htmlFor="phone" className="text-sm font-medium text-white mb-1 block">Numéro de téléphone</label>
                <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Numéro de téléphone" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 focus:outline-none transition" />
              </div>
            </div>
          </div>

          {/* --- SECTION PAIEMENT --- */}
          <div className="space-y-4">
  <h2 className="text-xl font-bold text-white">Méthode de paiement</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {paymentOptions.map((option) => (
      <label
        key={option.id}
        className={`relative flex items-center p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer 
                    ${paymentMethod === option.id 
                      ? 'border-indigo-600 bg-indigo-50 shadow-lg scale-105' 
                      : 'border-slate-200 bg-white hover:border-indigo-400'}`}
      >
        <input 
          type="radio" 
          name="paymentMethod" 
          value={option.id} 
          checked={paymentMethod === option.id} 
          onChange={(e) => setPaymentMethod(e.target.value)} 
          className="hidden" 
        />
        
        <div className="flex-shrink-0 w-20 flex justify-center items-center h-8">
          <img src={option.icon} alt={`Logo ${option.name}`} className="max-h-full" />
        </div>
        
        {/* --- MODIFICATION START --- */}
        {/* This container will hold the text content */}
        <div className="ml-4 flex flex-col">
          <span className="font-semibold text-slate-700">{option.name}</span>
          
          {/* This line checks if a description exists and renders it if true */}
          {option.description && (
            <span className="text-xs text-black mt-1">{option.description}</span>
          )}
        </div>
        {/* --- MODIFICATION END --- */}
        
        {paymentMethod === option.id && (
          <div className="absolute top-3 right-3 flex items-center justify-center w-6 h-6 bg-indigo-600 text-white rounded-full">
            <CheckIcon />
          </div>
        )}
      </label>
    ))}
  </div>
</div>
            {/* ...le reste du formulaire... */}

            <div className="container mx-auto ">
      <h1 className="text-xl text-white font-bold mb-6">Mode de livraison</h1>
      
      {/* ... autres champs du formulaire ... */}

      <MondialRelayModalSelector onPointSelected={handlePointSelection} />

   
    </div>

            {/* --- Case à cocher pour CGV --- */}
<div className="flex items-start space-x-2 mt-4">
  <input
    type="checkbox"
    id="terms"
    checked={termsAccepted}
    onChange={(e) => setTermsAccepted(e.target.checked)}
    className="mt-1 h-4 w-4 text-white border-gray-300 rounded focus:ring-white"
  />
  <label htmlFor="terms" className="text-sm text-white">
    J'accepte les{" "}
    <Link href="/content/conditions-utilisation" className="text-white underline hover:text-indigo-600">
      conditions générales de vente
    </Link>
  </label>
</div>




          {/* Message d’erreur */}
          {error && (
            <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Bouton Paiement */}
          <button
            onClick={startCheckout}
            disabled={loading || !amount || !email || !firstName || !lastName || !address || !city || !postalCode || !country || !phone || !shippingAddress|| !tiktok || !note || !termsAccepted}
            className="w-full flex justify-center items-center bg-white text-black font-bold py-3 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {loading ? <SpinnerIcon /> : <span>Confirmer la commande</span>}
            {!loading && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            )}
          </button>
        </div>



        {/* COLONNE DROITE — RÉCAPITULATIF */}
        <div className="bg-white rounded-2xl shadow-lg border border-[#D4AF37] p-6 h-fit animate-fade-in mt-6 lg:mt-10 lg:ml-20">
    <h2 className="text-lg font-semibold text-slate-800 mb-4">Récapitulatif du paiement</h2>
    
    <div className="space-y-3 text-slate-700 text-sm">
        
        {/* Montant de la commande */}
        <div className="flex justify-between">
            <span>Montant</span>
            <span>{parseFloat(amount || "0").toFixed(2)} €</span>
        </div>

        {/* Livraison */}
        <div className="flex justify-between">
            <span>Livraison</span>
            <span>{SHIPPING_FEE.toFixed(2)} €</span>
        </div>
        
        {/* NOUVEAU: Frais de service */}
        <div className="flex justify-between">
            <span>Frais de service </span>
            <span>+ {serviceFee.toFixed(2)} €</span>
        </div>

        {/* Total final mis à jour */}
        <div className="flex justify-between font-bold text-black border-t pt-3 mt-3 text-base">
            <span>Total à payer</span>
            <span>{grandTotal.toFixed(2)} €</span>
        </div>
        
    </div>
</div>
      </div>
      
      
      {/* --- DÉBUT DU FOOTER AJOUTÉ --- */}

      
      <footer className="text-center py-8 mt-8 w-full">
  <div className="flex justify-center items-center flex-wrap gap-x-6 gap-y-2 mb-3">
    {/* Remplacement des <a> par <Link> */}
    <Link href="/content/mentions-legales" className="text-sm text-[#c28840] hover:text-indigo-600 hover:underline">
      Mentions légales
    </Link>
    <Link href="/content/conditions-utilisation" className="text-sm text-[#c28840] hover:text-indigo-600 hover:underline">
      Conditions générales de vente
    </Link>
    <Link href="/content/Politique-de-confidentialite" className="text-sm text-[#c28840] hover:text-indigo-600 hover:underline">
      Politique de confidentialité
    </Link>

    <Link href="/content/Contactez-nous" className="text-sm text-[#c28840] hover:text-indigo-600 hover:underline">
    Contactez-nous
    </Link>

  </div>
  <p className="text-xs text-yellow-100">
    Vous pouvez joindre notre service client par mail.
  </p>
</footer>
      {/* --- FIN DU FOOTER AJOUTÉ --- */}
      
    </div>
  );
}  