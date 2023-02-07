import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
   const [auth, setAuth] = useState({});

   useEffect(() => {
      const s = localStorage.getItem('auth');
      console.log('auth: ', s, "\nd: ", s);

      setAuth(JSON.parse(s));
   }, [AuthContext])

   return (
      <AuthContext.Provider value={{ auth, setAuth }}>
         {children}
      </AuthContext.Provider>
   )
}

export default AuthContext;