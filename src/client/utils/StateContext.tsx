import { browserLocalPersistence, signInWithEmailAndPassword, updateEmail, updatePassword } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';
import { createContext, useEffect, useState } from 'react';
import Spinner from '../components/atoms/loadingSpinner';
import * as resolvers from '../utils/resolvers';
import { auth, updateBasket, updateWishList } from '../utils/resolvers';
import { Address, Language, Product, SearchResult, ContextValue, SimpleOrder, User, Basket } from '../utils/Type';
import { getAllProducts, searchProduct, searchCategories } from './ProductsResolvers';
// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
const translations = require('./translations.json');

const CartContext = createContext<ContextValue>({} as ContextValue);

export const CartProvider = ({ children }: any) => {
  const [persistanceId, setPersistanceId] = useState<string>();
  const [user, setUser] = useState<Omit<User, 'password' | 'basket' | 'wishList' | 'addresses'>>();
  const [basket, setBasket] = useState<SimpleOrder | undefined>({ products: [] });
  const [fakeBasket, setFakeBasket] = useState<Basket>({ products: [], total: 0 });
  const [wishList, setWishList] = useState<Product[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);

  auth.onAuthStateChanged(_firebaseAuthUser => {
    if (_firebaseAuthUser?.uid && _firebaseAuthUser?.uid !== persistanceId) {
      setPersistanceId(_firebaseAuthUser.uid);
    }
  });

  const injectUser = (firestoreUser: User) => {
    const { addresses: userAddresses, basket: userBasket, wishList: userWishList, ...userData } = firestoreUser;
    setUser(userData);
    setFakeBasket(userBasket);
    setWishList(userWishList);
    setAddresses(userAddresses);
  };

  useEffect(() => {
    (async () => {
      if (persistanceId && !user) {
        setIsLoading(true);
        const firestoreUser = await resolvers.getCurrentUser(persistanceId);
        injectUser(firestoreUser);
        setIsLoading(false);
      }
    })();
  }, [persistanceId]);

  const register = async (_user: Pick<User, 'email' | 'password' | 'firstName' | 'lastName' | 'gender'>) => {
    try {
      const { token, ...firestoreUser }: User & { token: string } = await resolvers.registerUser(_user);
      await signInWithEmailAndPassword(auth, _user.email, _user.password);
      await auth.setPersistence(browserLocalPersistence);
      // localStorage.setItem('hash', 'token');
      injectUser(firestoreUser);
    } catch (err) {
      console.log(err);
    }
  };

  const login = async ({ email, password }: Pick<User, 'email' | 'password'>) => {
    try {
      const firebaseAuthUser = await signInWithEmailAndPassword(auth, email, password);
      const firestoreUser = await resolvers.getCurrentUser(firebaseAuthUser.user.uid);
      await auth.setPersistence(browserLocalPersistence);
      injectUser(firestoreUser);
    } catch (err) {
      console.log(err);
    }
  };

  const logOut = async () => {
    try {
      await auth.signOut();
      setUser(undefined);
      setBasket(undefined);
      setFakeBasket({ products: [], total: 0 });
      setWishList([]);
      setAddresses([]);
    } catch (err) {
      console.log(err);
    }
  };

  const updateUserData = async (_user: Pick<User, 'email' | 'password' | 'firstName' | 'lastName'>) => {
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

  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<SearchResult>({ products: [], total: 0, skip: 0, limit: 0 });
  const [language, setLanguaje] = useState<Language>('en');

  useEffect(() => {
    try {
      fetchProducts();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const handlerCategories = async (value: string) => {
    const response = await searchCategories(value);
    console.log(response);
    setSearchResult(response);
  };

  const searchHandler = async (search?: string, skip?: number, limit?: number) => {
    const result = await getAllProducts(search, skip, limit);
    setSearchResult(result);
  };

  const fetchProducts = async (search?: string, skip?: number, limit?: number) => {
    const response = await getAllProducts(search, skip, limit);
    setSearchResult({ ...response, products: [...searchResult.products, ...response.products] });
  };

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

  const removeItemFromCart = (itemId: string) => {
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

  const removeAllItemsFromCart = (id: string) => {
    if (!user) {
      return;
    }
    updateBasket({ userId: user.uid, products: basket!.products.filter(item => item.id !== id) });
    setBasket({ ...basket, products: basket!.products.filter(item => item.id !== id) });
  };

  const getString: (path: string) => string = path => {
    const properties = path.split('.');
    return properties.reduce((acc, curr) => acc?.[curr], translations[language]);
  };

  const confirmOrder = async (selectedPayment: string) => {
    const dateInSeconds = Timestamp.fromDate(new Date()).seconds;
    await updateBasket({ userId: user!.uid, payment: selectedPayment, isCompleted: true, completedAt: dateInSeconds });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <CartContext.Provider
      value={{
        config: {
          language,
          t: translations[language],
        },
        state: { user, basket: fakeBasket, wishList, addresses },
        searchResult,
        handlers: {
          addItemToCart,
          changeLanguage: (value: Language) => setLanguaje(value),
          confirmOrder,
          removeAllItemsFromCart,
          removeItemFromCart,
          fetchProducts,
          getString,
          handlerCategories,
          login,
          logOut,
          searchCategories,
          searchHandler,
          searchProduct,
          updateUserData,
          wishListHandler,
          ...{
            ...resolvers,
            register,
          },
        },
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
