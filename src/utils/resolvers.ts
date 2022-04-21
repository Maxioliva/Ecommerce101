import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import firebaseApp from '../firebase/credenciales';

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

export const login = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password);
};

// eslint-disable-next-line func-style
export async function registerUser(firstname: string, lastname: string, email: string, password: string, genre: any) {
  const infoUser = await createUserWithEmailAndPassword(auth, email, password).then(userFirebase => userFirebase);
  console.log(infoUser.user.uid);
  const docuRef = doc(firestore, `usuarios/${infoUser.user.uid}`);

  setDoc(docuRef, { correo: email });
}
