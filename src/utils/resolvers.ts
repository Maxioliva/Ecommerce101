import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword,  } from 'firebase/auth';
import { doc, getFirestore, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import firebaseApp from '../firebase/credenciales';
import { Order, Product, User, WishList } from './Type';

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

export const login = async (email: string, password: string) => {
 const userInfo = await signInWithEmailAndPassword(auth, email, password);
  
  const result = await getCurrentUser(userInfo.user.uid)
  console.log(result)
};

export const registerUser = async (user: User) => {
  const infoUser = await createUserWithEmailAndPassword(auth, user.email, user.password).then(
    userFirebase => userFirebase
    );
  const userId = infoUser.user.uid;
  const docuRef = await doc(firestore, `User/${infoUser.user.uid}`);
  setDoc(docuRef, {...user, id: userId});
};


export const getCurrentUser = async (userId: string) => {
  const q = query(collection(firestore, 'User'), where('id', '==', userId));
  const querySnapshot = await getDocs(q);
  const currentUser = querySnapshot.docs[0];
  return (currentUser?.data() as User);
};




export const updateUser = async ( firstName: string, lastName: string, email:string, id: string  ) => {
  const q = query(collection(firestore, 'User'), where('id', '==', id));
  const querySnapshot = await getDocs(q);
  const currentUser= querySnapshot.docs[0];
  const docuRef = await doc(firestore, `User/${currentUser.id}`);
    
  return await setDoc(docuRef, {id, lastName, firstName, email});
  }
  ;

 


export const updateOrder = async (products: Product[], userId: string) => {
  const q = query(collection(firestore, 'Orders'), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  const currentBasket = querySnapshot.docs.find(d => !(d.data() as Order).isCompleted);
  if (!currentBasket) {
    const docuRef = await doc(firestore, `Orders/${nanoid()}`);
    await setDoc(docuRef, { userId, products, isCompleted: false });
  } else {
    const docuRef = await doc(firestore, `Orders/${currentBasket?.id}`);
    await setDoc(docuRef, { userId, products, isCompleted: false });
  }
};

export const getCurrentBasket = async (userId: string) => {
  const q = query(collection(firestore, 'Orders'), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.docs.length) {
    const currentBasket = querySnapshot.docs.find(d => !(d.data() as Order).isCompleted);
    return (currentBasket?.data() as Order).products;
  }
  return [];
};
export const updateWishList = async (products: Product[], userId: string) => {
  const q = query(collection(firestore, 'WishList'), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  // console.log(querySnapshot.docs)
  const currentWishList = querySnapshot.docs[0];
  if (!currentWishList) {
    const docuRef = await doc(firestore, `WishList/${nanoid()}`);
    await setDoc(docuRef, { userId, products});
  } else {
    const docuRef = await doc(firestore, `WishList/${currentWishList.id}`);
    await setDoc(docuRef, { userId, products});
  }
};
export const getCurrentWishList = async (userId: string) => {
  const q = query(collection(firestore, 'WishList'), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.docs.length) {
    const currentWishList = querySnapshot.docs[0];
    // console.log(currentWishList?.data() as WishList)
    return (currentWishList?.data() as WishList).products;
  }
  return [];
};




