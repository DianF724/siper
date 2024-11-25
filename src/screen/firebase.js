import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDGXK5lVH0LN6NIywmUluyIC5dsqqOdYd4",
  authDomain: "",
  databaseURL: "https://data-siper-default-rtdb.firebaseio.com",
  projectId: "data-siper",
  storageBucket: "data-siper.firebasestorage.app",
  messagingSenderId: "361979272454",
  appId: "1:361979272454:android:004ede1049025f406b1287",
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
