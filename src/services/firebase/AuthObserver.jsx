import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config";
import { getUserByUID } from "./firestoreService";
import useAuthStore from "../store/authStore";

export const listenToAuthChanges = () => {
  const { setUser, clearUser } = useAuthStore.getState();

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userData = await getUserByUID(user.uid);
      setUser(userData);
    } else {
      clearUser();
    }
  });
};
