import { cert, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import config from './utils/config';

// FIREBASE AUTH SDK DOCS https://firebase.google.com/docs/firestore
// FIRESTORE SDK DOCS https://firebase.google.com/docs/auth/admin

initializeApp({
  credential: cert({
    projectId: config.db.projectId,
    clientEmail: config.db.clientEmail,
    privateKey: config.db.privateKey,
  }),
});

export const auth = getAuth();
export const db = getFirestore();
export const asd = getFirestore();
