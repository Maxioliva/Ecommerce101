import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Logo from './components/atoms/logo';
import Cart from './components/cart';
import Footer from './components/footer';
import LoginForm from './components/loginform';
import NavBar from './components/navbar';
import Products from './components/products';
import RegisterForm from './components/registerform';
import Home from './pages/home';
import './style.scss';

const App = () => (
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
        <Footer />
      </div>
    </Router>
  </div>
);

export default App;
