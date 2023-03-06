import { nanoid } from 'nanoid';
import { auth, db } from '../../utils/db';
import { User } from '../../utils/types';
import API, { API_VERSION } from '../index';

// GET USER
API.get(`${API_VERSION}/customer/:userId`, async (_req, res) => {
  const userId = _req.params.userId;

  const userRef = await db.collection('Users').doc(userId);
  const doc = await userRef.get();
  if (!doc.exists) {
    res.status(404);
  } else {
    res.status(200).send(doc.data());
  }
});

// CREATE USER
API.post(`${API_VERSION}/customer/register`, async (_req, res) => {
  const { password, email, firstName, lastName } = _req.body as Omit<User, 'uid'>;
  try {
    // Create user in firebase-auth with just email and password keys
    const firebaseAuthUser = await auth.createUser({ uid: nanoid(), email, password });

    // Create user in firebase-firestore with everything except the password
    const firestoreUser = {
      uid: firebaseAuthUser.uid,
      email,
      firstName,
      lastName,
      basket: [],
      wishList: [],
      addresses: [],
      // store: [], TODOÑ initialise store
    };
    const firestoreUserReference = db.collection('Users').doc(firebaseAuthUser.uid);
    await firestoreUserReference.set(firestoreUser);

    // Create a token for that user using firebase-auth
    const token = await auth.createCustomToken(firebaseAuthUser.uid);

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

// UPDATE USER
API.put(`${API_VERSION}/customer/update/:userId`, async (_req, res) => {
  const uid = _req.params.userId;
  const stuffToUpdate = _req.body as Omit<User, 'uid' | 'password'>;

  try {
    const userRef = db.collection('Users').doc(uid);
    const doc = await userRef.update(stuffToUpdate);
    res.status(200).send(doc);
  } catch (err: any) {
    console.log(err);
  }
});
