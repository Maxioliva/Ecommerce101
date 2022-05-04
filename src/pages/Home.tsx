import { getAuth } from 'firebase/auth';
import firebaseApp from '../firebase/credenciales';
import Products from '../components/products';
import NavBar from '../components/navbar';

const auth = getAuth(firebaseApp);

// eslint-disable-next-line func-style
export function Home() {
  console.log(auth);
  return (
    <>
      <NavBar />
      <Products />
    </>
  );
}
