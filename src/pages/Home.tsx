import { getAuth } from 'firebase/auth';
import NavBar from '../components/navbar';
import Products from '../components/products';
import firebaseApp from '../firebase/credenciales';

const auth = getAuth(firebaseApp);

const Home = () => {
  console.log(auth);
  return (
    <>
      <NavBar />
      <Products />
    </>
  );
};

export default Home;
