import { Router } from 'express';
import { nanoid } from 'nanoid';
import { db } from './db';

// Using http protocol we define a REST API(representational state transfer)
const API = Router();

API.get('/', async (_req, res) => {
  const querySnapshot = await db.collection('Orders').get();
  const orders = querySnapshot.docs.map(o => ({
    id: o.id,
    ...o.data(),
  }));
  res.status(201).send(orders);
});

API.get('/api/v1/wishlist/:wishlistID', async (_req, res) => {
  // Returns all orders from a specific user id

  const id = _req.params.wishlistID;
  const docRef = db.collection('WishList').doc(id);
  const doc = await docRef.get();

  if (!doc.exists) {
    res.status(200).send([]);
    return;
  }

  res.status(200).send(doc.data());
});

API.put('/api/v1/wishlist', async (_req, res) => {
  const payload = _req.body;
  const docRef = db.collection('WishList').doc(payload.userId + '-w');
  await docRef.set(payload);
  res.status(200);
});

API.get('/testok', (_req, res) => {
  res.status(200).send({ todoOk: 'todo bien pa' });
});

API.get('/api/v1/basket/:userId', async (_req, res) => {
  // Returns all orders from a specific user id
  const userId = _req.params.userId;
  const querySnapshot = await db
    .collection('Orders')
    .where('userId', '==', userId)
    .where('isCompleted', '==', false)
    .get();
  if (querySnapshot.empty) {
    res.status(201).send({ userId: userId, products: [], isCompleted: false });
    return;
  }
  const basket = querySnapshot.docs[0].data();
  res.status(200).send(basket);
});

API.get('/api/v1/customer/orders/:userId', async (_req, res) => {
  // Returns all orders from a specific user id
  const userId = _req.params.userId;
  const querySnapshot = await db
    .collection('Orders')
    .where('userId', '==', userId)
    .where('isCompleted', '==', true)
    .get();
  if (querySnapshot.empty) {
    res.status(201).send([]);
    return;
  }
  const orders = querySnapshot.docs.map(o => o.data());
  res.status(200).send(orders);
});

API.put('/api/v1/basket', async (_req, res) => {
  const payload = _req.body;
  const querySnapshot = await db
    .collection('Orders')
    .where('userId', '==', payload.userId)
    .where('isCompleted', '==', false)
    .get();

  if (querySnapshot.empty) {
    const newBasket = { userId: payload.userId, products: payload.products, isCompleted: false };
    await db.collection('Orders').doc(nanoid()).set(newBasket);
    res.status(201).send(newBasket);
    return;
  }

  const docRef = querySnapshot.docs[0].ref;
  await docRef.set(payload, { merge: true });
  const currentBasket = querySnapshot.docs[0].data();
  res.status(200).send({ ...currentBasket, ...payload });
});

API.get('/api/v1/cusomer/address/:userId', async (_req, res) => {
  // Returns all orders from a specific user id

  const id = _req.params.userId;
  const querySnapshot = await db.collection('Addresses').where('userId', '==', id).get();

  if (querySnapshot.empty) {
    res.status(201).send([]);
    return;
  }

  res.status(200).send(querySnapshot.docs.map(a => a.data()));
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
