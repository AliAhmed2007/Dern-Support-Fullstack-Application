import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function ProtectedRoute({ children }) {
    const { authUser } = useAuth();
    const {isAuthenticated} = authUser
    const location = useLocation();
    const redirectPath = location.pathname.slice(1); 
    return isAuthenticated ? (
        children
    ) : (
        <Navigate to={`/login?message=You Must Log In First To Access /${redirectPath} page&redirectTo=${redirectPath}`} />
    );
}

export default ProtectedRoute;
