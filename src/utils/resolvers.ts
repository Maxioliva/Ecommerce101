/* eslint-disable func-style */

import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, getFirestore, setDoc, query, where, getDocs} from 'firebase/firestore';
import { nanoid } from 'nanoid';
import firebaseApp from '../firebase/credenciales';
import { Product, User } from './Type';


// const { cartItems } = useContext(CartContext);


const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);




export const login = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password)  
}; 

export const registerUser = async (user:  Omit<User, 'id'>) => {
  const infoUser = await createUserWithEmailAndPassword(auth, user.email, user.password).then(userFirebase => userFirebase); 
  const docuRef = await doc(firestore, `User/${infoUser.user.uid}`);
  setDoc(docuRef, user);
}

export const createOrder = async (products: Product[],) => { 

  // const q = query(collection(firestore,'Orders'), where( 'userId', '==' , userId));
  // const ordersRef = collection(firestore, 'Orders');
//   const querySnapshot = await getDocs(q);
// console.log(querySnapshot)

// const doc = await cityRef.get();


  console.log(nanoid())
  const docuRef = await doc(firestore, `Orders/${nanoid()}`);
  
  // const order: Order = {
  // id:  
  //  } 
  
  // setDoc(docuRef, order);


}