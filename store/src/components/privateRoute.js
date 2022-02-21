import { Navigate, useLocation } from "react-router";
import { useContext } from "react";
import { UserContext } from "../userContext";

function PrivateRoute ({ children, ...rest}) {
    const currentUser = useContext(UserContext);
    const location = useLocation();
  
        return currentUser.user.isLoggedIn ? children:
        <Navigate to="/" state={{ from: location }} replace />
    
  }

  export default PrivateRoute;