import { Router } from 'express';
import { db } from './db';

// Using http protocol we define a REST API(representational state transfer)
const API = Router();

API.get('/', async (_req, res) => {
  const querySnapshot = await db.collection('Orders').get();
  const orders = querySnapshot.docs.map(o => ({
    id: o.id,
    ...o.data(),
  }));
  res.status(200).send(orders);
});

API.get('/testok', (_req, res) => {
  res.status(200).send({ todoOk: 'todo bien pa' });
});

// API.post('/api/v1/register', async (_req, res) => {
//   const { password, ...rest } = _req.body as User & { password: string };
//   try {
//     const firebaseAuthUser = await auth.createUser({ email: rest.email, password });
//     const firestoreUser = { ...rest, id: firebaseAuthUser.uid };

//     const reference = db.collection('User').doc(firebaseAuthUser.uid);
//     await reference.set(firestoreUser);
//     res.send(firestoreUser);
//   } catch (err: any) {
//     const { code, message } = err.errorInfo;
//     if (code === 'auth/email-already-exists') {
//       res.status(422).send(message);
//       return;
//     }

//     res.status(500).send(message);
//   }
// });

export default API;
