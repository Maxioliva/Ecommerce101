import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfileSettings from './components/atoms/profileSettings';
import SellProduct from './components/atoms/sellProduct';
import Slider from './components/atoms/slider';
import Footer from './components/molecules/footer';
import PreviousOrders from './components/molecules/orders';
import MobileNavbar from './components/organism/mobileNavbar';
import NavBar from './components/organism/navbar';
import About from './components/pages/about';
import { CartPage } from './components/pages/cart';
import Home from './components/pages/home';
import LoginForm from './components/pages/login';
import Ordersuccers from './components/pages/ordersuccess';
import Payment from './components/pages/payment';
import ProductDetail from './components/pages/ProductDetail';
import Products from './components/pages/products';
import RegisterForm from './components/pages/register';
import Seller from './components/pages/sellers';
import Shipping from './components/pages/shipping';
import WishList from './components/pages/wishlist';
import './style.scss';
import useIsMobile from './utils/useIsMobile';

const App = () => {
  const isMobile = useIsMobile();

  return (
    <div className="app">
      <Router>
        <div className="app__header">
          <NavBar />
        </div>
        <div className="app__body">
          {/* <Slider /> */}
          <div className="app__body__container">
            <Routes>
              <Route
                path="/"
                element={
                  <div>
                    <Slider />
                    <Home />
                  </div>
                }
              />

              <Route path="/register" element={<RegisterForm />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout-payment" element={<Payment />} />
              <Route path="/checkout-shipping" element={<Shipping />} />
              <Route path="/about" element={<About />} />
              <Route path="/ordersuccess" element={<Ordersuccers />} />
              <Route path="/sellers" element={<Seller />} />
              <Route path="/sellProduct" element={<SellProduct />} />
              <Route
                path="/products"
                element={
                  <div>
                    <Products />
                  </div>
                }
              />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/wishlist" element={<WishList />} />
              <Route path="/orders" element={<PreviousOrders />} />
              <Route
                path="/profile"
                element={
                  <div className="profile">
                    <ProfileSettings />
                  </div>
                }
              />
              {/* <Route path="/help" element={<Help />} />  */}
            </Routes>
          </div>
        </div>
        <Footer />
        {isMobile && <MobileNavbar />}
      </Router>
    </div>
    // </IntlProvider>
  );
};

export default App;
