import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useRootSelector } from '../redux/store';
import Layout from './Layout';

function PrivateRoute() {
	const isAuth = useRootSelector((state) => state.auth.isAuth);
	const location = useLocation();

	if (!isAuth) {
		return <Navigate to='/login' state={{ from: location }} replace />;
	}
	return (
		<Layout>
			<Outlet />
		</Layout>
	);
}

export default PrivateRoute;
