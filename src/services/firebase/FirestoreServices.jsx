import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "./config";

export const addDocument = async (collectionName, data) => {
  const docRef = await addDoc(collection(db, collectionName), {
    ...data,
    createdAt: new Date(),
  });
  return docRef;
};

export const getUserByUID = async (uid) => {
  const q = query(collection(db, "users"), where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    return querySnapshot.docs[0].data();
  }
  throw new Error("User not found");
};
