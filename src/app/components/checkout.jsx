'use client'

import { useState } from 'react'

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

  const startCheckout = async () => {
    const parsedAmount = parseFloat(amount);
    if (!parsedAmount || parsedAmount <= 0) {
      setError('Veuillez entrer un montant valide.');
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
          amount,
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
    <div className="min-h-screen bg-indigo-100 flex items-center justify-center font-sans p-4">
    
        <div className="w-full max-w-full sm:max-w-3xl lg:max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* COLONNE GAUCHE — FORMULAIRE */}
          <div className="space-y-8">
            {/* --- Titre --- */}
            <div className="text-center">
              <div className="mx-auto bg-indigo-600 h-14 w-14 flex items-center justify-center rounded-full text-white shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h1 className="text-lg sm:text-xl lg:text-3xl font-bold text-slate-900 mt-4">Payer votre commande</h1>
              <p className="text-sm sm:text-base text-slate-500 mt-2">Saisissez les informations pour continuer.</p>
            </div>
  
            {/* --- Montant --- */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-slate-800">Montant total</h2>
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
              // Ajoutez un padding à droite pour que le texte ne passe pas sous le symbole
              className="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 focus:outline-none transition"
            />
            <div className="absolute inset-y-0 right-0 pr-6 flex items-center pointer-events-none">
              <span className="text-black">€   </span>
            </div>
          </div>                <input type="text" id="note" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Référence de commande" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 focus:outline-none transition" />
                <input type="text" id="tiktok" value={tiktok} onChange={(e) => setTiktok(e.target.value)} placeholder="Pseudo TikTok" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 focus:outline-none transition" />
              </div>
            </div>
  
            {/* --- Adresse de livraison --- */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-slate-800">Adresse de livraison</h2>
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
                  <label htmlFor="country" className="text-sm font-medium text-slate-700 mb-1 block">Pays</label>
                  <select id="country" value={country} onChange={(e) => setCountry(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 focus:outline-none transition">
                    <option value="FR">France</option>
                    <option value="BE">Belgique</option>
                    <option value="CA">Canada</option>
                    <option value="CH">Suisse</option>
                    <option value="LU">Luxembourg</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="phone" className="text-sm font-medium text-slate-700 mb-1 block">Numéro de téléphone</label>
                  <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Numéro de téléphone" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 focus:outline-none transition" />
                </div>
              </div>
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
              disabled={loading || !amount || !email || !firstName || !lastName || !address || !city || !postalCode || !country || !phone || !tiktok || !note}
              className="w-full flex justify-center items-center bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {loading ? <SpinnerIcon /> : <span>Payer maintenant</span>}
              {!loading && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              )}
            </button>
          </div>
  
          {/* COLONNE DROITE — RÉCAPITULATIF */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 h-fit animate-fade-in mt-6 lg:mt-50 lg:ml-20">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Récapitulatif du paiement</h2>
            <div className="space-y-3 text-slate-700 text-sm">
              <div className="flex justify-between">
                <span>Montant total</span>
                <span>{parseFloat(amount || "0").toFixed(2)} €</span>
              </div>
              <div className="flex justify-between">
                <span>Livraison</span>
                <span>5.00 €</span>
              </div>
              <div className="flex justify-between font-semibold border-t pt-3 mt-3">
                <span>Total</span>
                <span>{(parseFloat(amount || "0") + 5).toFixed(2)} €</span>
              </div>
            </div>
          </div>
        </div>
      : (
      
      )
    </div>
  );
}  