import { useContext } from 'react';
import CartContext from '../../../utils/StateContext';
import './style.scss';

type WelcomeProps = {
  onLogin: () => void;
  onRegister: () => void;
};

const Welcome = ({ onLogin, onRegister }: WelcomeProps) => {
  const { handlers } = useContext(CartContext);

  return (
    <div className="welcome">
      <h1 className="welcome__title">Welcome</h1>
      <div className="welcome__button" onClick={onLogin}>
        {handlers.getString('buttons.login')}
      </div>
      <div className="welcome__button" onClick={onRegister}>
        {handlers.getString('buttons.register')}
      </div>
    </div>
  );
};
export default Welcome;
