/* eslint-disable func-style */
import { useState } from 'react';
import { login, registerUser } from '../utils/resolvers';

export function Login() {
  const [isRegistred, setIsRegistred] = useState(false);
  //no se esta registrando , por ende está iniciando sesion

  function submitHandler(e: any) {
    e.preventDefault();
    // prevenir que se actualize

    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const rol = e.target.elements.rol.value;
    // recibimos el Evento , el formulario, buscamos el ID y las estamos guardando en las constantes
    // console.log('submit', email, password, rol);

    try {
      if (isRegistred) {
        //registrar
        registerUser(email, password, rol);
      } else {
        // eslint-disable-next-line no-unused-expressions
        login;
        console.log(login(email, password));
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1> {isRegistred ? 'Registrate' : 'inicia sesion'}</h1>
      <form onSubmit={submitHandler}>
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
        <input type="submit" value={isRegistred ? 'Registrate' : 'inicia sesion'} />
      </form>
      <button onClick={() => setIsRegistred(!isRegistred)}>
        {isRegistred ? 'I have an account' : 'I want to registred '}
        {/* boton que nos cambie si el usuario se quiere registrar o no. */}
      </button>
    </div>
  );
}
