import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Slider from './components/atoms/slider';
import { CartPage } from './components/pages/cart';
import Footer from './components/molecules/footer';
import LoginForm from './components/pages/login';
import NavBar from './components/organism/navbar';
import ProfileDropDown from './components/molecules/profile';
import ProfileDropDown2 from './components/atoms/profilemenu';
import ProfileSettings from './components/atoms/profileSecurity';
import Products from './components/pages/products';
import RegisterForm from './components/pages/register';
import WishList from './components/atoms/wishlist';
import Home from './components/pages/home';
import './style.scss';
import Payment from './components/pages/payment';
import Shipping from './components/pages/shipping';
import PreviousOrders from './components/molecules/orders';
import About from './components/pages/about';

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
            <Route path="/checkout-payment" element={<Payment />} />
            <Route path="/checkout-shipping" element={<Shipping />} />
            <Route path="/about" element={<About />} />
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
                  <PreviousOrders />
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
