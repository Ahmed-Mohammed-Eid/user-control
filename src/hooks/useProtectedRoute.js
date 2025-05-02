
const useProtectedRoute = () => {
    const isAuth = localStorage.getItem('isAuth');
    
    // Return true only if isAuth is explicitly set to 'true'
    return isAuth === 'true';
};

export default useProtectedRoute;