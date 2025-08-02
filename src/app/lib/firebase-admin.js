// lib/firebase-admin.js
import admin from 'firebase-admin'

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: 'paiementapp-19edf',
      clientEmail: 'firebase-adminsdk-fbsvc@paiementapp-19edf.iam.gserviceaccount.com',
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  })
}

export const db = admin.firestore()
