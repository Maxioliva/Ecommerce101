import {
  browserLocalPersistence,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
} from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';
import { createContext, useEffect, useState } from 'react';
import Spinner from '../components/atoms/loadingSpinner';
import * as resolvers from '../utils/resolvers';
import { auth, updateBasket, updateWishList } from '../utils/resolvers';
import { Language, Product, SearchResult, ShopState, SimpleOrder, User } from '../utils/Type';
import { getAllProducts, searchProduct, searchCategories } from './ProductsResolvers';
// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
const translations = require('./translations.json');

const CartContext = createContext<ShopState>({} as ShopState);

export const CartProvider = ({ children }: any) => {
  const [persistanceId, setPersistanceId] = useState<string>();
  const [user, setUser] = useState<User>();
  const [wishList, setWishList] = useState<Product[]>([]);
  const [basket, setBasket] = useState<SimpleOrder | undefined>({ products: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<SearchResult>({ products: [], total: 0, skip: 0, limit: 0 });
  const [language, setLanguaje] = useState<Language>('en');
  const userAuth = auth.currentUser;

  const changeLanguage = (value: Language) => setLanguaje(value);

  const login = async (email: string, password: string) => {
    const userInstance = await signInWithEmailAndPassword(auth, email, password);
    await setPersistence(auth, browserLocalPersistence);
    const firestoreUser = await resolvers.getCurrentUser(userInstance.user.uid);
    setUser(firestoreUser);
  };

  const registerHandler = async (_user: User & { password: string }) => {
    const userInstance = await resolvers.registerUser(_user);
    setUser(userInstance);
    return userInstance;
  };

  onAuthStateChanged(auth, _firebaseAuthUser => {
    if (_firebaseAuthUser?.uid && _firebaseAuthUser?.uid !== persistanceId) {
      setPersistanceId(_firebaseAuthUser.uid);
    }
  });

  useEffect(() => {
    (async () => {
      if (persistanceId) {
        setIsLoading(true);
        const firestoreUser = await resolvers.getCurrentUser(persistanceId);
        setUser(firestoreUser);

        const currentBasket = await resolvers.getBasket(persistanceId);
        setBasket(currentBasket);

        const currentWishList = await resolvers.getWishList(persistanceId);
        setWishList(currentWishList);
        setIsLoading(false);
      }
    })();
  }, [persistanceId]);

  const changePassword = async (newPassword: string) => {
    try {
      await updatePassword(userAuth!, newPassword).then(() => {
        window.alert('Password Succesfull Changed');
      });
    } catch (error) {
      if (error instanceof Error && error.message.includes('weak-password')) {
        console.log(error.message);
        window.alert('Password should be at least 6 characters');
      }
    }
  };

  const changeEmail = async (newEmail: string) => {
    try {
      await updateEmail(userAuth!, newEmail);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };
  const logOut = async () => {
    await signOut(auth)
      .then(() => {
        setUser(undefined);
        setBasket(undefined);
        setWishList([]);
      })
      .catch(error => {
        console.log(error);
      });
  };

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
      updateBasket({ userId: user.id, products: newCartItems });
    }
  };

  const wishListHandler = (id: string) => {
    const productAlreadyOnWishList = wishList.find(item => item.id === id);
    const product = searchResult.products.find(item => item.id === id);
    const newWishList = productAlreadyOnWishList ? wishList.filter(p => p.id !== id) : [...wishList, product!];
    setWishList(newWishList);
    if (user) {
      updateWishList(newWishList, user.id);
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
    updateBasket({ userId: user.id, products: newCartItems });
  };

  const deleteAllItemToCart = (id: string) => {
    if (!user) {
      return;
    }
    updateBasket({ userId: user.id, products: basket!.products.filter(item => item.id !== id) });
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
    await updateBasket({ userId: user!.id, payment: selectedPayment, isCompleted: true, completedAt: dateInSeconds });
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
        changePassword,
        changeLanguage,
        changeEmail,
        confirmOrder,
        deleteAllItemToCart,
        deleteItemToCart,
        fetchProducts,
        getString,
        handlerCategories,
        login,
        logOut,
        searchCategories,
        searchHandler,
        searchProduct,
        wishListHandler,
        ...{
          ...resolvers,
          register: (newUser: User & { password: string }) => registerHandler(newUser),
        },
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
