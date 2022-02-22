import { Navigate, useLocation } from "react-router";
import { useContext } from "react";
import { UserContext } from "../userContext";

function PrivateRoute ({ children}) {
    const currentUser = useContext(UserContext);
    const location = useLocation();
  
      return  !currentUser.user.isLoggedIn ? <Navigate to="/" state={{ from: location }} replace />: children;
  }

  export default PrivateRoute;