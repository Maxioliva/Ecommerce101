/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable func-style */
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, } from 'firebase/auth';
import { getFirestore, doc, setDoc} from 'firebase/firestore';
import firebaseApp from '../firebase/credenciales';
import { User } from './Type'
// import { useNavigate, useLocation } from 'react-router-dom';


const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

// const navigate = useNavigate();
// const { pathname } = useLocation();
// const isLogin = pathname === '/login';


export const login = async (email: string, password: string) => {
  
  await signInWithEmailAndPassword(auth, email, password); 
  // await navigate('/home')

};


export async function registerUser(user: User) {
  const infoUser = await createUserWithEmailAndPassword(auth, user.email, user.password).then(userFirebase => userFirebase);

    
  const docuRef = await doc(firestore, `User/${infoUser.user.uid}`);
 
  setDoc(docuRef, user);
  
}
