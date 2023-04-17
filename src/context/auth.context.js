import React, { useState, useEffect } from "react";
import authService from "../services/auth.service";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
 
  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  }
 
  const authenticateUser = () => {
    const storedToken = localStorage.getItem("authToken");
 
    if (storedToken) {
      // axios.get(
      //  `${process.env.REACT_APP_AUTH_URL}/verify`,
      //  { headers: { Authorization: `Bearer ${storedToken}`} }
      // )
      authService.verify()
        .then((response) => {
          const user = response.data;
          setIsLoggedIn(true);
          setIsLoading(false);
          setUser(user);
        })
        .catch((error) => {
          setIsLoggedIn(false);
          setIsLoading(false);
          setUser(null);
        });
 
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  }

const removeToken = () =>{
  localStorage.removeItem("authToken")
}
  const logOutUser = () =>{
    removeToken();
    authenticateUser();
  }
  useEffect(() => {                                    
    authenticateUser();
   }, []);
           
 
  
  return (                                                   
    <AuthContext.Provider
      value={{ 
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        logOutUser           
      }}      
    >
      {props.children}
    </AuthContext.Provider>
  )
  
}
 
export { AuthProviderWrapper, AuthContext };