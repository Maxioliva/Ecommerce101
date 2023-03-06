import { Router } from 'express';
import isequal from 'lodash.isequal';
import { nanoid } from 'nanoid';
import { db } from '../utils/db';

// Using http protocol we define a REST API(representational state transfer)
const API = Router();
export const API_VERSION = '/api/v1';

// const authenticate = async (_req: Request & { user?: any }, res: Response, next: NextFunction) => {
//   if (!_req.headers.authorization || !_req.headers.authorization?.startsWith('Bearer ')) {
//     res.status(403).send('Unauthorized');
//     return;
//   }
//   const idToken = _req.headers.authorization.split('Bearer ')[1];
//   try {
//     const decodedToken = await auth.verifyIdToken(idToken);
//     _req.user = decodedToken;
//     next();
//   } catch (error) {
//     res.status(403).send('Unauthorized');
//   }
// };

API.get(`${API_VERSION}/customer/orders/:userId`, async (_req, res) => {
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

API.get(`${API_VERSION}/wishlist/:wishlistID`, async (_req, res) => {
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

API.put(`${API_VERSION}/wishlist`, async (_req, res) => {
  const payload = _req.body;
  const docRef = db.collection('WishList').doc(payload.userId + '-w');
  await docRef.set(payload);
  res.status(200);
});

API.get(`${API_VERSION}/customer/address/:userId`, async (_req, res) => {
  // Returns all orders from a specific user id

  const id = _req.params.userId;
  const querySnapshot = await db.collection('Addresses').where('userId', '==', id).get();

  if (querySnapshot.empty) {
    res.status(201).send([]);
    return;
  }

  res.status(200).send(querySnapshot.docs.map(a => a.data()));
});

API.put(`${API_VERSION}/customer/address`, async (_req, res) => {
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

API.get(`${API_VERSION}/basket/:userId`, async (_req, res) => {
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

API.put(`${API_VERSION}/basket`, async (_req, res) => {
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

API.delete(`${API_VERSION}/customer/address/:id`, async (_req, res) => {
  const addressRef = db.collection('Addresses').doc(_req.params.id);
  await addressRef.delete();
  res.status(200).send({});
});

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

export default API;
