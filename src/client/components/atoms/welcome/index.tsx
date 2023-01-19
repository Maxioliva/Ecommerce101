import { useContext } from 'react';
import CartContext from '../../../utils/StateContext';
import './style.scss';

type WelcomeProps = {
  onLogin: () => void;
  onRegister: () => void;
};

const Welcome = ({ onLogin, onRegister }: WelcomeProps) => {
  const { getString } = useContext(CartContext);

  return (
    <div className="welcome">
      <h1 className="welcome__title">Welcome</h1>
      <div className="welcome__button" onClick={onLogin}>
        {getString('buttons.login')}
      </div>
      <div className="welcome__button" onClick={onRegister}>
        {getString('buttons.register')}
      </div>
    </div>
  );
};
export default Welcome;
