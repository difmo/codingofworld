import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useEffect, useState } from "react";

const AdminController = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUserLogin, setIsUserLogin] = useState(null);
  const [blogPermission, setBlogPermission] = useState(false);
  const [userUid, setUserUid] = useState(null);

  const [bloggerName, setbloggerName] = useState();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        if (user.emailVerified) {
          setIsUserLogin(user);
          fetchUserRole(user.uid);
          setUserUid(user.uid);
        } else {
          console.log("Email is not verified yet");
        }
      } else {
        setIsAdmin(false);
        setIsUserLogin(false);
        console.log("user is not login yet");
      }
    });
    return () => unsubscribe();
  });

  const fetchUserRole = async (uid) => {
    try {
      const userQuery = query(collection(db, "users"), where("uid", "==", uid));
      const querySnapshot = await getDocs(userQuery);
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          if(userData.isCreatePermission == true)
          {
            setBlogPermission(true);
          }
          if(userData.name)
          {
            setbloggerName(userData.name);
            console.log(userData.name);
          }
          // sdfdsf
          if(userData.whoIs == "isAdmin")
          {
            setIsAdmin(true);
          }
          else
          {
            setIsAdmin(false);
          }
        });
      } else {
        console.log("No user found with uid");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return { isAdmin,isUserLogin,blogPermission,bloggerName,userUid };
};
export default AdminController;
