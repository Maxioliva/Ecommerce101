/* eslint-disable func-style */

import { login, registerUser } from '../utils/resolvers';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import Form from '../components/registerform';

export function Authentication() {
  // const [isRegistred, setIsRegistred] = useState(false);
  //no se esta registrando , por ende está iniciando sesion
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isLogin = pathname === '/login';

  function submitHandler(e: any) {
    e.preventDefault();
    // prevenir que se actualize
    // eslint-disable-next-line no-shadow
    const firstname = e.target.elements.firstname.value;
    const lastname = e.target.elements.lastname.value;
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const genre = e.target.elements.genre.value;
    // recibimos el Evento , el formulario, buscamos el ID y las estamos guardando en las constantes
    // console.log('submit', email, password, rol);

    try {
      if (isLogin) {
        login(email, password);
      } else {
        // registerUser(firstName, lastame, email, password, genre);
      }
      navigate('/');
    } catch (error) {
      console.log(error);
      navigate('/login');
    }
  }

  return (
    <div>
      <h1> {isLogin ? 'inicia sesion' : 'Registrate'}</h1>
      {/* <form onSubmit={submitHandler}>
        <label>
          correo electronico:
          <input type="email" id="email" />
        </label>
        <label>
          Password:
          <input type="password" id="password" />
        </label>
        <label>
          Rol:
          <select id="rol">
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </label>
        <input type="submit" value={isLogin ? 'inicia sesion' : 'Registrate'} />
      </form> */}

      <Link to={isLogin ? '/register' : '/login'}>
        <button>{isLogin ? 'I have an account' : 'I want to registred '}</button>
      </Link>
    </div>
  );
}
