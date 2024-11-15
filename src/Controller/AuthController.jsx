import { auth } from "../firebase";
import { useEffect, useState } from "react";




const AuthController = () =>{
    const [isUserLoginn,setIsUserLogin] = useState(null);
      
    useEffect(()=>{

       const fetchIsUserLogin = async () =>{
          try{
              const user =  auth.currentUser;
              if(user)
              {
                setIsUserLogin(user);
                
              }
              else
              {
                setIsUserLogin(null);
              }
              console.log("maasdasddasdchis",isUserLoginn);
          }
          catch(e)
          {

              console.log(e);
          }
       }


       fetchIsUserLogin();

       const fetchIsEmailVerified = () =>{

       }
    },[])

    return {isUserLoginn};

}




export default AuthController;