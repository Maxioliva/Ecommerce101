import './style.scss';

type WelcomeProps = {
  onLogin: () => void;
  onRegister: () => void;
};

const Welcome = ({ onLogin, onRegister }: WelcomeProps) => (
  <div className="welcome">
    <h1 className="welcome__title">Welcome</h1>
    <div className="welcome__button" onClick={onLogin}>
      Login
    </div>
    <div className="welcome__button" onClick={onRegister}>
      Register
    </div>
  </div>
);
export default Welcome;
