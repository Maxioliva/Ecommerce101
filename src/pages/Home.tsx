import { getAuth, signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
import firebaseApp from '../firebase/credenciales';

const auth = getAuth(firebaseApp);

// eslint-disable-next-line func-style
export function Home() {
  console.log(auth);
  return (
    <div>
      {' '}
      Home
      {auth.currentUser && <button onClick={() => signOut(auth)}> Close sesion </button>}
      {!auth.currentUser && (
        <>
          <Link to={'/login'}>
            <button> Login </button>
          </Link>
          <Link to={'/register'}>
            <button> register </button>
          </Link>
        </>
      )}
    </div>
  );
}
