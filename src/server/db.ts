import config from './utils/config';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

initializeApp({
  credential: cert({
    projectId: config.db.projectId,
    clientEmail: config.db.clientEmail,
    privateKey: config.db.privateKey,
  }),
});

const db = getFirestore();

export default db;
