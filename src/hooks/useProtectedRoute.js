import { useSearchParams } from 'react-router';

/**
 * Custom hook to check authentication status from URL search parameters
 * @returns {boolean} Returns true if 'isAuth' search param is 'true', otherwise false
 */
const useProtectedRoute = () => {
    const [searchParams] = useSearchParams();
    const isAuth = searchParams.get('isAuth');
    
    // Return true only if isAuth is explicitly set to 'true'
    return isAuth === 'true';
};

export default useProtectedRoute;