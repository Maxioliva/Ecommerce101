import { Router } from 'express';
import { nanoid } from 'nanoid';
import { db } from './db';
import isequal from 'lodash.isequal';

const API = Router();

type Address = {
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  houseNumber: string;
  zipCode: string;
  city: string;
  country: string;
  id: string;
  userId: string;
};

API.get('/testok', (_req, res) => {
  res.status(200).send({ todoOk: 'todo bien pa' });
});

API.delete('/api/v1/customer/address/:id', async (_req, res) => {
  const addressRef = db.collection('Addresses').doc(_req.params.id);
  await addressRef.delete();
  res.status(200).send({});
});

API.get('/api/v1/customer/address/:userId', async (_req, res) => {
  const id = _req.params.userId;
  const querySnapshot = await db.collection('Addresses').where('userId', '==', id).get();

  if (querySnapshot.empty) {
    res.status(201).send([]);
    return;
  }

  res.status(200).send(querySnapshot.docs.map(a => a.data()));
});

API.put('/api/v1/customer/address', async (_req, res) => {
  const payload = _req.body;
  const querySnapshot = await db.collection('Addresses').where('userId', '==', payload.userId).get();

  const allReadyInMemory = querySnapshot.docs.find(d => {
    const address = d.data() as Address;
    const { id, userId, ...rest } = address;

    return isequal(rest, address);
  });

  if (allReadyInMemory) {
    return;
  }

  const newAddress = { ...payload.address, userId: payload.userId };
  const addressRef = db.collection('Addresses').doc(nanoid());
  await addressRef.set({ ...newAddress, id: addressRef.id });
  res.status(201).send({ userId: payload.userId, ...payload });
});

API.get('/api/v1/basket/:userId', async (_req, res) => {
  const userId = _req.params.userId;
  const querySnapshot = await db
    .collection('Orders')
    .where('userId', '==', userId)
    .where('isCompleted', '==', false)
    .get();
  if (querySnapshot.empty) {
    res.status(201).send({ userId, products: [], isCompleted: false });
    return;
  }
  const basket = querySnapshot.docs[0].data();
  res.status(200).send(basket);
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

API.get('/api/v1/customer/orders/:userId', async (_req, res) => {
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

API.post('/api/v1/products', async (_req, res) => {
  const product = _req.body;
  const productRef = db.collection('Products').doc(nanoid());
  await productRef.set({ ...product, id: productRef.id });
  res.status(201).send({});
});

API.get('/api/v1/Products:ownerId', async (_req, res) => {
  const id = _req.params.ownerId;
  const querySnapshot = await db.collection('Products').where('ownerId', '==', id).get();

  if (querySnapshot.empty) {
    res.status(201).send([]);
    return;
  }
  res.status(200).send(querySnapshot.docs.map(a => a.data()));
});

API.get('/api/v1/wishlist/:wishlistID', async (_req, res) => {
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

export default API;
