import { cert, initializeApp, getApps, getApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import serviceAccount from '../../../../serviceAccountKey.json'; // ou le chemin correct

const app = getApps().length === 0
  ? initializeApp({ credential: cert(serviceAccount) })
  : getApp();

const db = getFirestore(app);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  try {
    const data = req.body;

    // Sauvegarde dans Firestore
    await db.collection('orders').add({
      ...data,
      createdAt: new Date()
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Erreur Firestore:', error);
    res.status(500).json({ error: 'Erreur lors de l’enregistrement dans Firestore' });
  }
}
