import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Slider from './components/atoms/slider';
import { CartPage } from './components/cartpage';
import Footer from './components/footer';
import LoginForm from './components/loginform';
import NavBar from './components/navbar';
import ProfileDropDown from './components/navbar/dopdownContent/profile';
import ProfileDropDown2 from './components/navbar/dopdownContent/profile/profilemenu';
import ProfileSettings from './components/navbar/dopdownContent/profile/profileSecurity';
import Products from './components/products';
import RegisterForm from './components/registerform';
import WishList from './components/wishlist';
import Home from './pages/home';
import './style.scss';
import Payment from './components/checkout/payment';
import Shipping from './components/checkout/shipping';
import PreviousOrders from './components/navbar/dopdownContent/profile/orders';
import About from './components/footer/About';

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
