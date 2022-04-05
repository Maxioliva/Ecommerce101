// import Header from './components/header';
// import Body from './components/body';
import { Home } from './screens/Home';
import { Login } from './screens/Login';
import { useState } from 'react';
import firebaseApp from './firebase/credenciales';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { Account } from './utils/Type';
// onAuthstateChanged escucha si hay cambio de sesion.

// type userProps = {
//   user: Account,
// };

const auth = getAuth(firebaseApp);

const App = () => {
  const [user, setUSer] = useState(null);

  onAuthStateChanged(auth, userFirebase => {
    // userFirebase es la funcion que observa.
    if (userFirebase) {
      setUSer(userFirebase);
    } else {
      setUSer(null);
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
