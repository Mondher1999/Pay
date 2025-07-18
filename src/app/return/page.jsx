import { redirect } from 'next/navigation'
import Link from 'next/link'
import { stripe } from '../lib/stripe'

export default async function Return({ searchParams }) {
  const { session_id } = searchParams;

 

  if (!session_id) {
    //// It's better to redirect than to throw an error for a missing param.
    return redirect('/');
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['line_items', 'payment_intent']
    });

    const {
      status,
      customer_details: { email: customerEmail },
      amount_total,
      metadata
    } = session;

    const baseURLAPI = env.baseURLAPI;


    const orderPayload = {
      ...metadata, // Spread all properties from metadata
      amount: (amount_total / 100).toFixed(2), // <-- Add the corrected amount
      stripeSessionId: session.id // It's also good practice to save the session ID
    };


    // Appel API interne pour enregistrer la commande
    try {
      await fetch(`${baseURLAPI}/orders/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });
    } catch (err) {
      console.error("Erreur lors de l'enregistrement de la commande :", err);
    }



    if (status === 'open') {
      return redirect('/');
    }

    if (status === 'complete') {
      return (
        <div className="bg-slate-50 min-h-screen flex items-center justify-center p-4 font-sans">
          <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-lg max-w-lg w-full text-center border border-slate-100">
            {/* Success Icon */}
            <div className="mx-auto bg-green-100 h-16 w-16 flex items-center justify-center rounded-full text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            {/* Heading */}
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-6">
              Paiement réussi !
            </h1>

            {/* Confirmation Text */}
            <p className="text-slate-600 mt-3 text-base leading-relaxed">
              Nous vous remercions pour votre confiance. Un e-mail de confirmation va être envoyé à l'adresse <strong className="font-semibold text-slate-800">{customerEmail}</strong>.
            </p>

            {/* Call to Action Button */}
            <div className="mt-8">
              <Link
                href="/"
                className="w-full inline-block bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-indigo-500/50"
              >
                Retour à l'accueil
              </Link>
            </div>
            
            {/* Secondary Contact Info */}
            
          </div>
        </div>
      );
    }
  } catch (error) {
    // If the session_id is invalid or expired, Stripe will throw an error.
    // Redirecting to the homepage is a graceful way to handle this.
    console.error("Error retrieving Stripe session:", error);
    return redirect('/');
  }

  // Fallback redirect for any other unhandled cases
  return redirect('/');
}
