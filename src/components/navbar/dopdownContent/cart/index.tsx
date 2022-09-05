import { faHeart, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useState } from 'react';
import { useNavigate, Link,  } from 'react-router-dom';
import CartContext from '../../../../context/CartContext';
import { ItemList } from '../../../itemList';
import './style.scss'


const CartDropDown = () => {
    const { userId, cartItems } = useContext(CartContext);
    const [cartOpen, setCartOpen] = useState(false);
    const navigate = useNavigate();
    
    return (
      <div>
        <div className="profile-dropdown__title">{userId ? 'You Cart' : 'You are not registered yet'}</div>
        <div className="separatorLine"></div>
        <div className="profile-dropdown__title">
         { (userId && cartItems.length) ? (
              <div className="productsContainer">
              {cartItems.map((item, i) => (
                <ItemList key={i} item={item} />
              ))}
             </div> ) : (<div>Your Cart is empty!</div>)
              }
        </div>
        <div className='buttonsBhindConteiner'>
            {userId ? 
            <button className='buttonsBhind'>Check out</button>
             : <p>log in please</p>}
          </div>
          <div className='buttonsBhindConteiner'>
            {' '}
            <Link to="cart">
              <button className='buttonsBhind' onClick={() => setCartOpen(!cartOpen)}>
                Basket Page
              </button>
            </Link>
            </div>
      </div>
    );
  };
  
  export default CartDropDown;
  