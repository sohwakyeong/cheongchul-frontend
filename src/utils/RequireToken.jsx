import { Navigate,useLocation } from "react-router-dom";
import { getToken } from "./authUtils";


   const RequireToken = ({children}) => {
    const token = getToken();
    const location = useLocation();

    if (!token) {
        return <Navigate to="/login" state={{ from: location }} />;
    }
    return children;
}
export default RequireToken;