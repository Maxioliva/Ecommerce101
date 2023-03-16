import { Router } from 'express';
import isequal from 'lodash.isequal';
import { nanoid } from 'nanoid';
import { db, auth } from './db';
import { User, Address } from './types';
// import User from '../../client/utils/Type'

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

API.get('/api/v1/customer/address/:userId', async (_req, res) => {
  // Returns all orders from a specific user id

  const id = _req.params.userId;
  const querySnapshot = await db.collection('Addresses').where('userId', '==', id).get();

  if (querySnapshot.empty) {
    res.status(201).send([]);
    return;
  }

  res.status(200).send(querySnapshot.docs.map(a => a.data()));
});

// cosa de negros

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

API.delete('/api/v1/customer/address/:id', async (_req, res) => {
  const addressRef = db.collection('Addresses').doc(_req.params.id);
  await addressRef.delete();
  res.status(200).send({});
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

API.get('/api/v1/customer/:userId', async (_req, res) => {
  const userId = _req.params.userId;
  try {
    const userRef = await db.collection('Users').doc(userId);
    const doc = await userRef.get();
    if (!doc.exists) {
      res.status(404);
    } else {
      res.status(200).send(doc.data());
    }
  } catch (err) {
    console.log(err);
  }
});

API.post('/api/v1/customer/register', async (_req, res) => {
  const { password, email, firstName, lastName } = _req.body as Omit<User, 'uid'>;
  try {
    // Create user in firebase-auth with just email and password keys
    const firebaseAuthUser = await auth.createUser({ uid: nanoid(), email, password });

    // Using firebaseAuthUser-id create user in firebase-firestore with everything except the password
    const firestoreUser = {
      uid: firebaseAuthUser.uid,
      email,
      firstName,
      lastName,
      basket: { products: [], total: 0 },
      wishList: [],
      addresses: [],
    };
    const firestoreUserReference = db.collection('Users').doc(firebaseAuthUser.uid);
    await firestoreUserReference.set(firestoreUser);

    // Create a token for that user using firebase-auth
    const token = await auth.createCustomToken(firebaseAuthUser.uid);
    console.log(token);

    // Return the firestoreUser and the token so it can be set in headers in the frontend
    res.send({ ...firestoreUser, token });
  } catch (err: any) {
    console.log(err);

    const { code, message } = err.errorInfo;
    if (code === 'auth/email-already-exists') {
      res.status(422).send(message);
      return;
    }

    res.status(500).send(message);
  }
});

API.put('/api/v1/customer/update/:userId', async (_req, res) => {
  const uid = _req.params.userId;
  const stuffToUpdate = _req.body as Partial<Omit<User, 'uid' | 'password'>>;

  try {
    const userRef = db.collection('Users').doc(uid);
    const doc = await userRef.update(stuffToUpdate);
    res.status(200).send(doc);
  } catch (err: any) {
    console.log(err);
  }
});

export default API;
