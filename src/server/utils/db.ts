import { cert, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import config from './config';

// FIRESTORE SDK DOCS https://firebase.google.com/docs/firestore/query-data/get-data
initializeApp({
  credential: cert({
    projectId: config.server.db.projectId,
    clientEmail: config.server.db.clientEmail,
    privateKey: config.server.db.privateKey ? config.server.db.privateKey.replace(/\\n/gm, '\n') : undefined,
  }),
});

export const db = getFirestore();
