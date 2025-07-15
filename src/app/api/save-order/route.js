/*


import { cert, getApps, getApp, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';
import path from 'path';

let serviceAccount;

try {
  const filePath = path.resolve(process.cwd(), 'serviceAccountKey.json');
  serviceAccount = JSON.parse(readFileSync(filePath, 'utf8'));
} catch (err) {
  console.error('❌ Erreur lors du chargement du fichier serviceAccountKey.json:', err);
}

const app = getApps().length === 0
  ? initializeApp({ credential: cert(serviceAccount) })
  : getApp();

const db = getFirestore(app);

// ✅ Méthode POST compatible App Router
export async function POST(request) {
  try {
    const data = await request.json();

    if (!data || Object.keys(data).length === 0) {
      return new Response(JSON.stringify({ error: 'Le corps de la requête est vide.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const docRef = await db.collection('orders').add({
      ...data,
      createdAt: new Date()
    });

    return new Response(JSON.stringify({ success: true, id: docRef.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('🔥 Erreur Firestore:', error);
    return new Response(JSON.stringify({ error: 'Erreur serveur' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
<<<<<<< HEAD
}


  try {
    const data = await request.json();

    if (!data || Object.keys(data).length === 0) {
      return new Response(JSON.stringify({ error: 'Request body is empty.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const docRef = await db.collection('orders').add({
      ...data,
      createdAt: new Date()
    });

    return new Response(JSON.stringify({ success: true, id: docRef.id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    // Log the detailed error on the server for debugging.
    console.error('🔥 Firestore Error:', error);
    return new Response(JSON.stringify({ error: 'Server error during Firestore operation.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
>>>>>>> d7aceb38fc9db54d08ad8e7466899b7a934a0a99

*/