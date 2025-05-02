// import { Navigate } from "react-router-dom";
// import { ValidateToken } from "./aiFunctions";


// const PrivateRoute = async ({ children }) => {

//   const isValideToken = await ValidateToken(localStorage.getItem('access_token'));

//   return isValideToken ? children : <Navigate to="/login" />;
// };

// export default PrivateRoute;


import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getUserByToken, ValidateToken } from "./aiFunctions"; 
import { useAppContext } from "../context/Context";

const PrivateRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null); 
  const [loading, setLoading] = useState(true);
  const {setUser} = useAppContext();
  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("access_token");
      const isValid = await ValidateToken(token);
      const user = await getUserByToken(token);
      setIsValid(isValid);
      setLoading(false);
      setUser(user);
    };

    checkToken();
  }, []);

  if (loading) return <div>Chargement...</div>;

  return isValid ? children : <Navigate to="/landing" />;
};

export default PrivateRoute;
