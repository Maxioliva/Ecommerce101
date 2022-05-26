/* eslint-disable func-style */

import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getFirestore, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import firebaseApp from '../firebase/credenciales';
import { Order, Product, User } from './Type';


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

export const updateOrder = async (products: Product[], userId: string) => {
  console.log('ejecucion', userId)
  const q = query(collection(firestore, 'Orders'), where('userId', '==', userId));
  // const ordersCollectionRef = collection(firestore, 'Orders');
  const querySnapshot = await getDocs(q);
  console.log('orders', querySnapshot.docs.length)
  if (!querySnapshot.docs.length) {
    // const document = await ordersCollectionRef.get();
    const docuRef = await doc(firestore, `Orders/${nanoid()}`);
    await setDoc(docuRef, { userId, products, isCompleted: false });
  } else {
    const currentBasket = querySnapshot.docs.find((d) => !(d.data() as Order).isCompleted) ;
   console.log(currentBasket)
    const docuRef = await doc(firestore, `Orders/${currentBasket?.id}`);
    await setDoc(docuRef, { userId, products, isCompleted: false });
  }
}


  // const doc = await cityRef.get();


  // console.log(nanoid())
  // const docuRef = await doc(firestore, `Orders/${nanoid()}`);
  
  // const order: Order = {
  // id:  
  //  } 
  
  // setDoc(docuRef, order);



