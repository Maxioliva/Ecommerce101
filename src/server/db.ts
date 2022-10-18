import { cert, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import config from './utils/config';

// FIRESTORE SDK DOCS https://firebase.google.com/docs/auth/admin

initializeApp({
  credential: cert({
    projectId: config.server.db.projectId,
    clientEmail: config.server.db.clientEmail,
    privateKey: config.server.db.privateKey,
  }),
});

export const db = getFirestore();
