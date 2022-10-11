import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyA8uCBPaSlfDl8eEUU1zqqN9qm02xKf64A',
  authDomain: 'ecommerce101-ed5d8.firebaseapp.com',
  projectId: 'ecommerce101-ed5d8',
  storageBucket: 'ecommerce101-ed5d8.appspot.com',
  messagingSenderId: '484305638980',
  appId: '1:484305638980:web:9798bb9bd78f29f4f88e11',
  measurementId: 'G-JGGHRKVWQN'
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
