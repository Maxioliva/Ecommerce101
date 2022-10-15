import { Router } from 'express';
import { User } from '../client/utils/Type';
import { auth, db } from './db';

// Using http protocol we define a REST API(representational state transfer)
const router = Router();

router.get('/', async (_req, res) => {
  const querySnapshot = await db.collection('Orders').get();
  const orders = querySnapshot.docs.map(o => ({
    id: o.id,
    ...o.data(),
  }));
  res.send(orders);
});

router.post('/api/v1/register', async (_req, res) => {
  const { password, ...rest } = _req.body as User & { password: string };
  try {
    const firebaseAuthUser = await auth.createUser({ email: rest.email, password });
    const firestoreUser = { ...rest, id: firebaseAuthUser.uid };

    const reference = db.collection('User').doc(firebaseAuthUser.uid);
    await reference.set(firestoreUser);
    res.send(firestoreUser);
  } catch (err: any) {
    const { code, message } = err.errorInfo;
    // Analize code to handle multiple error responses
    res.status(400).send(message);
  }
});

export default router;
