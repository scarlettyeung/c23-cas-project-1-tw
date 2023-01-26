import { Outlet, useLocation } from 'react-router-dom';
import PublicLayout from './PublicLayout';


function PrivateRoute() {
  const location = useLocation();
  return (
    <PublicLayout>
      <Outlet />
    </PublicLayout>
  );
}

export default PrivateRoute;
