import { getAuth, signOut } from 'firebase/auth';
import firebaseApp from '../firebase/credenciales';

const auth = getAuth(firebaseApp);

// eslint-disable-next-line func-style
export function Home() {
  return (
    <div>
      {' '}
      Home <button onClick={() => signOut(auth)}> Close sesion </button>
    </div>
  );
}
