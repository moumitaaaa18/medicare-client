import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAgEzSlSqwM2sQ9FOgELnDgHSlXwjGG_vw",
  authDomain: "medicare-connect-5e7a7.firebaseapp.com",
  projectId: "medicare-connect-5e7a7",
  storageBucket: "medicare-connect-5e7a7.firebasestorage.app",
  messagingSenderId: "782726829831",
  appId: "1:782726829831:web:c21cba3517358ec6d9d7a2",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);