
// import firebaseApp from './utils/firebaseConfig';
 
// const auth = getAuth(firebaseApp);
// const firestore = getFirestore(firebaseApp);


const resolvers = {
    Query: {
      fede: () => 'hace fumar culia',
    //   userId: async (userId: string) => {
    //     const q = query(collection(firestore, 'Orders'), where('userId', '==', userId));
    //     const querySnapshot = await getDocs(q);
    //     if (querySnapshot.docs.length && querySnapshot.docs.some(o => !(o.data() as Order).isCompleted)) {
    //       const currentOrder = querySnapshot.docs.find(d => !(d.data() as Order).isCompleted);
    //       return currentOrder?.data() as Omit<Order, 'id' | 'userId' | 'isCompleted'>;
    //     }
    //     return { products: [] as Product[] };
    //   };
    },
};
  
export default resolvers;