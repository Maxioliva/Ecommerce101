// Importamos la función para inicializar la aplicación de Firebase
import { initializeApp } from 'firebase/app';

// Añade aquí tus credenciales
const firebaseConfig = {
  apiKey: 'AIzaSyDH2WvzsMb5QKeYfoUnD5fw9guzgXyG_qk',
  authDomain: 'authtutorial-e12f9.firebaseapp.com',
  projectId: 'authtutorial-e12f9',
  storageBucket: 'authtutorial-e12f9.appspot.com',
  messagingSenderId: '359179880283',
  appId: '1:359179880283:web:ff73a255327955cff27c7e',
};

// Inicializamos la aplicación y la guardamos en firebaseApp
const firebaseApp = initializeApp(firebaseConfig);
// Exportamos firebaseApp para poder utilizarla en cualquier lugar de la aplicación
export default firebaseApp;
