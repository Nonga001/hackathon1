import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  // Redirect to login if not authenticated and not on login/register pages
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes('/auth/login') ||
      location.pathname.includes('/auth/register')
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  // Redirect authenticated users based on role
  if (
    isAuthenticated &&
    (location.pathname.includes('/auth/login') ||
      location.pathname.includes('/auth/register'))
  ) {
    if (user?.role === 'admin') {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }

  // Prevent non-admin users from accessing admin routes
  if (
    isAuthenticated &&
    user?.role !== 'admin' &&
    location.pathname.includes('/admin')
  ) {
    return <Navigate to="/unauthorized" />;
  }

  // Directs admin to admin dashboard if they try to access the shop
  if (
    isAuthenticated &&
    user?.role === 'admin' &&
    location.pathname.includes('shop')
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>; // Render children if no redirects
}

export default CheckAuth;
