/* eslint-disable react-hooks/rules-of-hooks */
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword,  } from 'firebase/auth';
import { doc, getFirestore, setDoc, collection, query, where, getDocs, updateDoc, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import firebaseApp from '../firebase/credenciales';
import { Address, Order, Product, User, WishList } from './Type';
import isequal from 'lodash.isequal' 

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

export const login = async (email: string, password: string) => {
 
  const userInfo = await signInWithEmailAndPassword(auth, email, password);
  const result = await getCurrentUser(userInfo.user.uid);
  // console.log(result);
  return result;
    
  
};

export const registerUser = async (user: User & {password: string } ) => {
  const infoUser = await createUserWithEmailAndPassword(auth, user.email, user.password).then(
    userFirebase => userFirebase
    );
  const userId = infoUser.user.uid;
  const docuRef = await doc(firestore, `User/${infoUser.user.uid}`);
 
 
  const newUser = { id: userId, firstName: user.firstName, lastName: user.lastName, email: user.email, gender: user.gender }
  setDoc(docuRef, newUser);
  
  return newUser;
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


export const updateAdressOrder =  async (address: Omit<Address, 'id' | 'userId' >, userId: string) => {
  const q = query(collection(firestore, 'Orders'), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  const currentBasket = querySnapshot.docs.find(d => !(d.data() as Order).isCompleted)
  const docuRef = await doc(firestore, `Orders/${currentBasket?.id}`);
  await updateDoc(docuRef, { address });

}
export const updatePayment =  async (userId: string, payment: string) => {
  const q = query(collection(firestore, 'Orders'), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  const currentBasket = querySnapshot.docs.find(d => !(d.data() as Order).isCompleted)
  const docuRef = await doc(firestore, `Orders/${currentBasket?.id}`);
  await updateDoc (docuRef, { isCompleted: true, payment, completedAt: new Date });
}

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

export const getCurrentOrder = async (userId: string) => {
  const q = query(collection(firestore, 'Orders'), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.docs.length && querySnapshot.docs.some(o => !(o.data() as Order).isCompleted)) {
    const currentOrder = querySnapshot.docs.find(d => !(d.data() as Order).isCompleted);
    return (currentOrder?.data() as Omit<Order, 'id'|'userId'|'isCompleted'> ) ;
  }
  return { products:[] as Product[] };
}

export const getCompletedOrders = async (userId: string) => {
  const q = query(collection(firestore, 'Orders'), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.docs.length && querySnapshot.docs.some(o => (o.data() as Order).isCompleted)) {
    const previousOrders= querySnapshot.docs.filter(d => (d.data() as Order).isCompleted);

    return (previousOrders.map( (o) => o.data() as Omit<Order, 'id'|'userId'|'isCompleted'> )) ;
  }
  return [];

  
}


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

export const createAddress = async (address: Omit<Address, 'id' | 'userId'>, usuarioId: string) => {
  const q = query(collection(firestore, 'Addresses'), where('userId', '==', usuarioId));
  const querySnapshot = await getDocs(q);
  const vevo = (d: QueryDocumentSnapshot) => {
    const vevo2 = d.data() as Address;
    const { id, userId, ...rest } = vevo2
    
    return rest
  }
  
  const allReadyInMemory = querySnapshot.docs.find(d => (isequal(vevo(d), address)));
  
  if (!allReadyInMemory) {
    const addressId = nanoid()
    const docuRef = await doc(firestore, `Addresses/${addressId}`);
    await setDoc(docuRef, { userId: usuarioId, ...address, id: addressId });
  }
}

export const getCurrentAddresses= async (userId: string) => {
  const q = query(collection(firestore, 'Addresses'), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.docs.length) {
    const currentAddresList = querySnapshot.docs.map(address =>(address?.data() as Address ))
    
    return currentAddresList;
  }
  return [];
};