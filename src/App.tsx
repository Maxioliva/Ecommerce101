import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Logo from './components/atoms/logo';
import Cart from './components/cart';
import LoginForm from './components/loginform';
import NavBar from './components/navbar';
import Products from './components/products';
import RegisterForm from './components/registerform';
import firebaseApp from './firebase/credenciales';
import Home from './pages/home';
import './style.scss';

const auth = getAuth(firebaseApp);

const App = () => {
  const [user, setUSer] = useState(true);

  onAuthStateChanged(auth, userFirebase => {
    if (userFirebase) {
      setUSer(true);
    } else {
      setUSer(false);
    }
  });

  return (
    <div className="app">
      <Router>
        <div className="app__header">
          <Logo />
          <NavBar />
        </div>
        <div className="app__body">
          <div className="app__body__container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/products" element={<Products />} />
            </Routes>
          </div>
          <div className="app__footer">fooooter wacheen</div>
        </div>
      </Router>
    </div>
  );
};

export default App;
