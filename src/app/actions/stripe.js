'use server'

import { headers } from 'next/headers'
import { stripe } from '../lib/stripe'

export async function fetchClientSecret(amount) {
  const origin = (await headers()).get('origin')

  // ⚠️ Convertir en centimes ou millimes (selon ta devise)
  if (!amount || isNaN(amount) || amount <= 0) {
    throw new Error('Montant invalide')
  }

  const unitAmount = Math.round(Number(amount) * 100) // ou *1000 si TND

  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    line_items: [
      {
        price_data: {
          currency: 'eur', // ou 'usd', ou 'tnd' si activé sur ton compte Stripe
          unit_amount: unitAmount,
          product_data: {
            name: 'Paiement personnalisé',
          },
        },
        quantity: 1,
      }
    ],
    mode: 'payment',
    return_url: `${origin}/return?session_id={CHECKOUT_SESSION_ID}`,
  })

  return session.client_secret
}
