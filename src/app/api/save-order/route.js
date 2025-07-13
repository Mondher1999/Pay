import { cert, initializeApp, getApps, getApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import serviceAccount from '../../../../serviceAccountKey.json'; // ou le chemin correct


if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}
const db = getFirestore();

export async function POST(request) {
  try {
    const body = await request.json();

    const docRef = await db.collection('orders').add({
      ...body,
      createdAt: new Date(),
    });

    return Response.json({ success: true, id: docRef.id }); // ✅ réponse JSON
  } catch (error) {
    console.error('Erreur API /save-order :', error);
    return new Response(JSON.stringify({ error: 'Erreur serveur' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}