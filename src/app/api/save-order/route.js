/*import { cert, getApps, getApp, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
<<<<<<< HEAD
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
=======

// --- Step 1: Securely Build the Service Account Object ---
// This object is constructed from environment variables. This is the
// standard and secure way to handle secrets on Vercel.

// Check if the essential environment variables are available. This prevents build errors on Vercel.
const hasRequiredEnvVars =
  process.env.FIREBASE_PROJECT_ID &&
  process.env.FIREBASE_CLIENT_EMAIL &&
  process.env.FIREBASE_PRIVATE_KEY;

let app;
let db;

// Only initialize Firebase if all required environment variables are present.
if (hasRequiredEnvVars) {
  const serviceAccount = {
    type: "service_account",
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    // The .replace() command is crucial for correctly formatting the private key
    // when it's loaded from an environment variable.
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  };

  // --- Step 2: Initialize Firebase Admin ---
  // This code checks if the app is already initialized to prevent errors.
  app = getApps().length === 0
    ? initializeApp({ credential: cert(serviceAccount) })
    : getApp();

  db = getFirestore(app);
} else {
    console.warn('🔥 Firebase Admin SDK not initialized. Missing required environment variables.');
}


// --- Step 3: Define the API Handler (App Router compatible) ---
export async function POST(request) {
  // Add a runtime check to ensure Firebase was initialized.
  if (!db) {
    console.error('🔥 Firebase has not been initialized. Check your Vercel environment variables.');
    return new Response(JSON.stringify({ error: 'Server configuration error. Firebase not initialized.' }), {
>>>>>>> d7aceb38fc9db54d08ad8e7466899b7a934a0a99
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
<<<<<<< HEAD
}
*/
=======

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
