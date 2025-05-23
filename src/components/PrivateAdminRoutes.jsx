// import { Navigate } from "react-router-dom";
// import { ValidateToken } from "./aiFunctions";


// const PrivateRoute = async ({ children }) => {

//   const isValideToken = await ValidateToken(localStorage.getItem('access_token'));

//   return isValideToken ? children : <Navigate to="/login" />;
// };

// export default PrivateRoute;


import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { ValidateAdminToken } from "./aiFunctions";

const PrivateAdminRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("access_token");
      const isValid = await ValidateAdminToken(token);
      console.log(isValid);
      
      setIsValid(isValid.isAdmin);
      setLoading(false);
    };

    checkToken();
  }, []);

  if (loading) return <div>Chargement...</div>;

  return isValid ? children : <Navigate to="/" />;
};

export default PrivateAdminRoute;
