import {
  browserLocalPersistence,
  getAuth,
  signInWithEmailAndPassword,
  updateEmail,
  updatePassword,
} from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';
import { createContext, useEffect, useState } from 'react';
import Spinner from '../components/atoms/loadingSpinner';
import * as resolvers from '../utils/resolvers';
import { updateBasket, updateWishList } from '../utils/resolvers';
import { Language, Product, SearchResult, ShopState, SimpleOrder, User } from '../utils/Type';
import firebaseApp from './firebaseApp';
import { getAllProducts, searchCategories, searchProduct } from './ProductsResolvers';
// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
const translations = require('./translations.json');
const auth = getAuth(firebaseApp);
const CartContext = createContext<ShopState>({} as ShopState);

export const CartProvider = ({ children }: any) => {
  const [persistanceId, setPersistanceId] = useState<string>();
  const [user, setUser] = useState<Omit<User, 'password'>>();
  const [wishList, setWishList] = useState<Product[]>([]);
  const [basket, setBasket] = useState<SimpleOrder | undefined>({ products: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<SearchResult>({ products: [], total: 0, skip: 0, limit: 0 });
  const [language, setLanguaje] = useState<Language>('en');
  // const userAuth = auth.currentUser;

  const changeLanguage = (value: Language) => setLanguaje(value);

  auth.onAuthStateChanged(_firebaseAuthUser => {
    if (_firebaseAuthUser?.uid && _firebaseAuthUser?.uid !== persistanceId) {
      setPersistanceId(_firebaseAuthUser.uid);
    }
  });

  useEffect(() => {
    (async () => {
      if (persistanceId && !user) {
        setIsLoading(true);
        const firestoreUser = await resolvers.getCurrentUser(persistanceId);
        setUser(firestoreUser);
        setIsLoading(false);
      }
    })();
  }, [persistanceId]);

  const register = async (_user: Omit<User, 'uid'> & { password: string }) => {
    try {
      const { token, ...firestoreUser }: User & { token: string } = await resolvers.registerUser(_user);
      await signInWithEmailAndPassword(auth, _user.email, _user.password);
      await auth.setPersistence(browserLocalPersistence);
      // todo: Set token on all request's header
      setUser(firestoreUser);
    } catch (err) {
      console.log(err);
    }
  };

  const login = async (email: string, password: string) => {
    const firebaseAuthUser = await signInWithEmailAndPassword(auth, email, password);
    const firestoreUser = await resolvers.getCurrentUser(firebaseAuthUser.user.uid);
    await auth.setPersistence(browserLocalPersistence);
    setUser(firestoreUser);
  };

  const logOut = async () => {
    try {
      await auth.signOut();
      setUser(undefined);
      setBasket({ products: [], total: 0 });
      setWishList([]);
    } catch (err) {
      console.log(err);
    }
  };

  const updateUserData = async (_user: Omit<User, 'uid' | 'gender'> & { password: string }) => {
    const { email, password, firstName, lastName } = _user;
    try {
      if (password) {
        await updatePassword(auth.currentUser!, password);
      }

      if (email) {
        await updateEmail(auth.currentUser!, email);
      }

      if ((email || firstName || lastName) && user?.uid) {
        const firestoreUser = await resolvers.updateUser(user?.uid, {
          ...(email && { email }),
          ...(firstName && { firstName }),
          ...(lastName && { lastName }),
        });

        setUser(firestoreUser);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        if (error.message.includes('weak-password')) {
          window.alert('Password should be at least 6 characters');
        }
      } else {
        console.log(error);
      }
    }
  };

  // const login = async (email: string, password: string) => {
  //   const userInstance = await signInWithEmailAndPassword(auth, email, password);
  //   await setPersistence(auth, browserLocalPersistence);
  //   const firestoreUser = await resolvers.getCurrentUser(userInstance.user.uid);
  //   setUser(firestoreUser);
  // };

  // const registerHandler = async (_user: User & { password: string }) => {
  //   const userInstance = await resolvers.registerUser(_user);
  //   setUser(userInstance);
  //   return userInstance;
  // };

  // onAuthStateChanged(auth, _firebaseAuthUser => {
  //   if (_firebaseAuthUser?.uid && _firebaseAuthUser?.uid !== persistanceId) {
  //     setPersistanceId(_firebaseAuthUser.uid);
  //   }
  // });

  // useEffect(() => {
  //   (async () => {
  //     if (persistanceId) {
  //       setIsLoading(true);
  //       const firestoreUser = await resolvers.getCurrentUser(persistanceId);
  //       setUser(firestoreUser);

  //       const currentBasket = await resolvers.getBasket(persistanceId);
  //       setBasket(currentBasket);

  //       const currentWishList = await resolvers.getWishList(persistanceId);
  //       setWishList(currentWishList);
  //       setIsLoading(false);
  //     }
  //   })();
  // }, [persistanceId]);

  // const changePassword = async (newPassword: string) => {
  //   try {
  //     await updatePassword(auth.currentUser!, newPassword).then(() => {
  //       window.alert('Password Succesfull Changed');
  //     });
  //   } catch (error) {
  //     if (error instanceof Error && error.message.includes('weak-password')) {
  //       console.log(error.message);
  //       window.alert('Password should be at least 6 characters');
  //     }
  //   }
  // };

  // const changeEmail = async (newEmail: string) => {
  //   try {
  //     await updateEmail(auth.currentUser!, newEmail);
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       console.log(error.message);
  //     }
  //   }
  // };
  // const logOut = async () => {
  //   await signOut(auth)
  //     .then(() => {
  //       setUser(undefined);
  //       setBasket(undefined);
  //       setWishList([]);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  const handlerCategories = async (value: string) => {
    const response = await searchCategories(value);
    console.log(response);
    setSearchResult(response);
  };

  // console.log('aca rey', handlerCategories);

  const searchHandler = async (search?: string, skip?: number, limit?: number) => {
    const result = await getAllProducts(search, skip, limit);
    setSearchResult(result);
  };

  const fetchProducts = async (search?: string, skip?: number, limit?: number) => {
    const response = await getAllProducts(search, skip, limit);
    setSearchResult({ ...response, products: [...searchResult.products, ...response.products] });
  };

  useEffect(() => {
    try {
      fetchProducts();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const addItemToCart = async (id: string) => {
    const productAlreadyOnBasket = basket!.products.find(item => item.id === id);
    const product = searchResult.products.find(item => item.id === id);
    const newCartItems = productAlreadyOnBasket
      ? [
          ...basket!.products.filter(i => i.id !== id),
          { ...productAlreadyOnBasket, amount: productAlreadyOnBasket.amount + 1 },
        ]
      : [...basket!.products, { ...product!, amount: 1 }];

    setBasket({ ...basket, products: newCartItems });
    if (user) {
      updateBasket({ userId: user.uid, products: newCartItems });
    }
  };

  const wishListHandler = (id: string) => {
    const productAlreadyOnWishList = wishList.find(item => item.id === id);
    const product = searchResult.products.find(item => item.id === id);
    const newWishList = productAlreadyOnWishList ? wishList.filter(p => p.id !== id) : [...wishList, product!];
    setWishList(newWishList);
    if (user) {
      updateWishList(newWishList, user.uid);
    }
  };

  const deleteItemToCart = (itemId: string) => {
    if (!user) {
      return;
    }
    const itemToRemove = basket!.products.find(({ id }) => itemId === id);

    const newCartItems =
      itemToRemove!.amount > 1
        ? basket!.products.map(item => ({ ...item, amount: item.id === itemId ? item!.amount - 1 : item.amount }))
        : basket!.products.filter(item => item.id !== itemId);
    setBasket({ ...basket, products: newCartItems });
    updateBasket({ userId: user.uid, products: newCartItems });
  };

  const deleteAllItemToCart = (id: string) => {
    if (!user) {
      return;
    }
    updateBasket({ userId: user.uid, products: basket!.products.filter(item => item.id !== id) });
    setBasket({ ...basket, products: basket!.products.filter(item => item.id !== id) });
  };

  if (isLoading) {
    return <Spinner />;
  }

  const getString: (path: string) => string = path => {
    const properties = path.split('.');
    return properties.reduce((acc, curr) => acc?.[curr], translations[language]);
  };

  const confirmOrder = async (selectedPayment: string) => {
    const dateInSeconds = Timestamp.fromDate(new Date()).seconds;
    await updateBasket({ userId: user!.uid, payment: selectedPayment, isCompleted: true, completedAt: dateInSeconds });
  };

  return (
    <CartContext.Provider
      value={{
        language,
        basket,
        searchResult,
        t: translations[language],
        user,
        wishList,
        addItemToCart,
        changeLanguage,
        confirmOrder,
        deleteAllItemToCart,
        deleteItemToCart,
        fetchProducts,
        getString,
        handlerCategories,
        login,
        register,
        logOut,
        searchCategories,
        searchHandler,
        searchProduct,
        updateUserData,
        wishListHandler,
        ...{
          ...resolvers,
        },
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
