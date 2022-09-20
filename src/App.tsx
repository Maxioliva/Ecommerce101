import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Logo from './components/atoms/logo';
import Slider from './components/atoms/slider';
import { CartPage } from './components/cartpage';
import Footer from './components/footer';
import LoginForm from './components/loginform';
import NavBar from './components/navbar';
import ProfileDropDown from './components/navbar/dopdownContent/profile';
import Order from './components/navbar/dopdownContent/profile/orders';
import ProfileDropDown2 from './components/navbar/dopdownContent/profile/profilemenu';
import ProfileSettings from './components/navbar/dopdownContent/profile/profileSecurity';
import Products from './components/products';
import RegisterForm from './components/registerform';
import WishList from './components/wishlist';
import Home from './pages/home';
import './style.scss';
import Payment from './components/checkout/payment';
import Shipping from './components/checkout/shipping';

const App = () => (
  <div className="app">
    <Router>
      <div className="app__header">
        <NavBar />
      </div>
      <div className="app__body">
        {/* <Slider /> */}
        <div className="app__body__container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout-payment" element={<Payment/>} />
            <Route path="/checkout-shipping" element={ <Shipping />} />
            <Route
              path="/products"
              element={
                <div>
                  <Slider />
                  <Products />
                </div>
              }
            />
            <Route path="/wishlist" element={<WishList />} />
            <Route
              path="/orders"
              element={
                <div className="">
                  <Order />
                  <ProfileDropDown />
                </div>
              }
            />
            <Route
              path="/profile"
              element={
                <div className="profile">
                  <ProfileSettings />
                  <ProfileDropDown2 />
                </div>
              }
            />
            {/* <Route path="/help" element={<Help />} />  */}
          </Routes>
        </div>
      </div>
      <Footer />
    </Router>
  </div>
);

export default App;
