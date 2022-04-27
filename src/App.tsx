// import Body from './components/body';
import { Home } from './pages/Home';
import { Authentication } from './pages/Authentication';
import { useState } from 'react';
import firebaseApp from './firebase/credenciales';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { BrowserRouter as Router, Route, Link, Routes, useLocation } from 'react-router-dom';
import Header from './components/header';
import RegisterForm from './components/registerform';

const auth = getAuth(firebaseApp);

const App = () => {
  const [user, setUSer] = useState(true);

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
    <Router>
      <div>
        <div></div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Authentication />} />
          <Route path="/login" element={<Authentication />} />
        </Routes>
      </div>
      <div></div>
      <RegisterForm />
    </Router>
  );
};

export default App;
