// import Header from './components/header';
// import Body from './components/body';
import { Home } from './screens/Home';
import { Login } from './screens/Login';
import { useState } from 'react';
import firebaseApp from './firebase/credenciales';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { useQuery } from 'react-query';
// import { Drawer, LinearProgress, Grid, Badge } from '@material-ui/core';
// import { LinearProgress } from '@material-ui/core';
// import { AddShoppingCartIcon } from '@material-ui/icons';
// import { Wrapper } from './components/App.styles';

// const getProducts = async () => await (await fetch('https://fakestoreapi.com/products')).json();

const auth = getAuth(firebaseApp);

const App = () => {
  const [user, setUSer] = useState(false);

  onAuthStateChanged(auth, userFirebase => {
    // onAuthstateChanged escucha si hay cambio de sesion.
    // userFirebase usuario
    console.log('sada');
    if (userFirebase) {
      setUSer(true);
    } else {
      setUSer(false);
    }
  });
  // si hay usuario de firebase, lo guardaremos en nuestro estado, sino hay usuario al estado lo ponemos en null.
  return (
    <> {user ? <Home /> : <Login />}</>
    // <div>
    //   <Header />
    //   <Body />
    // </div>
  );
};

export default App;
