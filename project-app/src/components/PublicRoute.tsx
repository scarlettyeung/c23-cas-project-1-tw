import { Outlet, useLocation } from 'react-router-dom';
import PublicLayout from './PublicLayout';

function PrivateRoute() {
	const location = useLocation();
	console.log(location);
	return (
		<PublicLayout>
			<Outlet />
		</PublicLayout>
	);
}

export default PrivateRoute;
