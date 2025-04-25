import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signInWithEmailAndPassword,
  } from "firebase/auth";
  import { auth } from "./config";
  import { addDocument, getUserByUID } from "./firestoreService";
  import {   
    
    
    createUserModel } from "../models/userModel";
  import useAuthStore from "../store/authStore";
  
  export const signUpWithEmail = async (name, email, password) => {
    const { setUser } = useAuthStore.getState();
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const userData = createUserModel({ uid: user.uid, name, email: user.email });
  
    await addDocument("users", userData);
    await sendEmailVerification(user);
    setUser(userData);
    return user;
  };
  
  export const loginWithEmail = async (email, password) => {
    const { setUser } = useAuthStore.getState();
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const userData = await getUserByUID(user.uid);
    setUser(userData);
    return userData;
  };
  