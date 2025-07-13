import { cert, initializeApp, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

const db = getFirestore();

export async function POST(request) {
  try {
    const body = await request.json();

    if (!body.amount || !body.email || !body.firstName) {
      return new Response(JSON.stringify({ error: 'Champs manquants' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const docRef = await db.collection('orders').add({
      ...body,
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ success: true, id: docRef.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Erreur API /save-order :', error);
    return new Response(JSON.stringify({ error: 'Erreur serveur' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
