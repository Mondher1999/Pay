'use client'

import { useState } from 'react'
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { fetchClientSecret as fetchCSvr } from '../actions/stripe' // On garde votre action serveur

// Initialisation de Stripe avec votre clé publique
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
)

export default function Checkout() {
  // Vos états sont conservés tels quels
  const [amount, setAmount] = useState('')
  const [note, setNote] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)

  // Votre fonction de validation et de démarrage est conservée
  const startCheckout = async () => {
    const parsedAmount = parseFloat(amount)
    if (!parsedAmount || parsedAmount <= 0) {
      setError('Veuillez entrer un montant valide.')
      return
    }
    setError('')
    setLoading(true)
    // Pas besoin de simuler, on passe directement à l'affichage du checkout
    // qui déclenchera le fetchClientSecret
    setShowCheckout(true) 
  }
  
  // Options pour Stripe, utilisant votre fonction importée
  const options = {
    fetchClientSecret: () => fetchCSvr(parseFloat(amount), note),
  }

  // Composant pour le spinner du bouton de chargement
  const SpinnerIcon = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );

  return (
    <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center font-sans p-4">
      <div className="w-full max-w-md">
        {!showCheckout ? (
          // --- VUE 1 : FORMULAIRE DE SAISIE ---
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8 space-y-8 animate-fade-in">
            {/* --- EN-TÊTE --- */}
            <div className="text-center">
              <div className="mx-auto bg-indigo-600 h-14 w-14 flex items-center justify-center rounded-full text-white shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-slate-900 mt-4">Payer votre commande</h1>
              <p className="text-slate-500 mt-2">Saisissez les informations pour continuer.</p>
            </div>

            {/* --- FORMULAIRE --- */}
            <div className="space-y-6">
              {/* Champ Montant */}
              <div>
                <label htmlFor="amount" className="text-sm font-medium text-slate-700 mb-1 block">Montant (€)</label>
                <div className="relative">
                  <input
                    type="number"
                    id="amount"
                    min="1"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Ex: 29.99"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 transition-colors duration-300 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 focus:outline-none"
                  />
                </div>
              </div>

              {/* Champ Référence */}
              <div>
                <label htmlFor="note" className="text-sm font-medium text-slate-700 mb-1 block">Référence de commande</label>
                <div className="relative">
                   <input
                    type="text"
                    id="note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Ex: CMD-458736"
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 transition-colors duration-300 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 focus:outline-none"
                  />
                </div>
              </div>

              {/* Message d'Erreur */}
              {error && (
                <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                   <p className="text-sm font-medium">{error}</p>
                </div>
              )}

              {/* --- Bouton de Paiement --- */}
              <button
                onClick={startCheckout}
                disabled={loading || !amount}
                className="w-full flex justify-center items-center bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {loading ? <SpinnerIcon /> : <span>Payer maintenant</span>}
                {!loading && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                )}
              </button>
            </div>
          </div>
        ) : (
          // --- VUE 2 : CHECKOUT STRIPE EMBARQUÉ ---
          <div className="bg-white rounded-2xl shadow-lg animate-fade-in p-1 sm:p-2">
            <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </div>
        )}
      </div>
    </div>
  );
}