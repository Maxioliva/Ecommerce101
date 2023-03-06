import { cert, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import config from './config';

initializeApp({
  credential: cert({
    projectId: config.server.db.projectId,
    clientEmail: config.server.db.clientEmail,
    privateKey: config.server.db.privateKey ? config.server.db.privateKey.replace(/\\n/gm, '\n') : undefined,
  }),
});

// FIRESTORE DOCS https://firebase.google.com/docs/firestore
export const db = getFirestore();
// AUTH DOCS https://firebase.google.com/docs/auth/admin
export const auth = getAuth();
