import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDox9LvhALSqiFDI0uuouRenUoWS7s_6_g",
  authDomain: "global-24bf4.firebaseapp.com",
  projectId: "global-24bf4",
  storageBucket: "global-24bf4.appspot.com",
  messagingSenderId: "539795244110",
  appId: "1:539795244110:web:57e730468168376bedef1f",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };
