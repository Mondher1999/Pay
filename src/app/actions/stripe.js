'use server'

import { headers } from 'next/headers'
import { stripe } from '../lib/stripe'

export async function fetchClientSecret(amount, note, metadata) {
  const origin = (await headers()).get('origin')

  if (!amount || isNaN(amount) || amount <= 0) {
    throw new Error('Montant invalide')
  }

  const unitAmount =  Math.round(Number(amount) * 100) // centimes pour EUR

  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    line_items: [
      {
        price_data: {
          currency: 'eur',
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
    
    // 👇 Infos utiles pour les retrouver après paiement
    metadata: {
      note: note || '',
      email: metadata.email || '',
      firstName: metadata.firstName || '',
      lastName: metadata.lastName || '',
      address: metadata.address || '',
      city: metadata.city || '',
      postalCode: metadata.postalCode || '',
      country: metadata.country || '',
      phone: metadata.phone || '',
      tiktok: metadata.tiktok || '',
    }
  })

  return session.client_secret
}
