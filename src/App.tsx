import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Logo from './components/atoms/logo';
import { CartPage } from './components/cartpage';
import Footer from './components/footer';
import LoginForm from './components/loginform';
import NavBar from './components/navbar';
import Profile from './components/navbar/dopdownContent/profile';
import Order from './components/navbar/dopdownContent/profile/orders';
import ProfileSettings from './components/navbar/dopdownContent/profile/profileSecurity';
import Products from './components/products';
import RegisterForm from './components/registerform';
import WishList from './components/wishlist';
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
            <Route path="/cart" element={<CartPage />} />
            <Route path="/products" element={<Products />} />
            <Route path="/wishlist" element={<WishList />} />
            <Route path="/orders" element={<Order />} />
            <Route path="/profile" element={<ProfileSettings />} />
            {/* <Route path="/help" element={<Help />} />  */}
          </Routes>
        </div>
      </div>
      <Footer />
    </Router>
  </div>
);

export default App;
