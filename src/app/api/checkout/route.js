///////// app/api/checkout/route.js
import { NextResponse } from 'next/server'
import { stripe } from '../../lib/stripe'

export async function POST(req) {
  const body = await req.json()
  const { amount, note, metadata } = body

  if (!amount || isNaN(amount) || amount <= 0) {
    return NextResponse.json({ error: 'Montant invalide' }, { status: 400 })
  }

  const origin = req.headers.get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const unitAmount = 500 + Math.round(Number(amount) * 100) // en centimes

  try {
    const session = await stripe.checkout.sessions.create({
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
        },
      ],
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,
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
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('[Stripe Checkout Error]', err)
    return NextResponse.json({ error: 'Erreur lors de la création de la session Stripe' }, { status: 500 })
  }
}
