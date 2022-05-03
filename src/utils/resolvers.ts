/* eslint-disable func-style */
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, } from 'firebase/auth';
import { getFirestore, doc, setDoc, } from 'firebase/firestore';
import firebaseApp from '../firebase/credenciales';
import {User} from  './Type'

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

export const login = async (email: string, password: string) => {
  
  await signInWithEmailAndPassword(auth, email, password);
};



export async function registerUser(user: User) {
  const infoUser = await createUserWithEmailAndPassword(auth, user.email, user.password).then(userFirebase => userFirebase);

    
  const docuRef = await doc(firestore, `User/${infoUser.user.uid}`);
 
  setDoc(docuRef, user);
  
}
