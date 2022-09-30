import { Router } from 'express';
import db from './db';

const router = Router();

router.get('/', async (_req, res) => {
  const querySnapshot = await db.collection('Orders').get();
  const orders = querySnapshot.docs.map(o => ({
    id: o.id,
    ...o.data(),
  }));
  res.send(orders);
});

export default router;
