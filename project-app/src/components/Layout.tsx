import { Outlet } from 'react-router-dom';
import Header from './Header';
import Navbar from './NavBar';

function Layout() {
	return (
		<>
			<Header />
			<Outlet />
			<Navbar />
		</>
	);
}

export default Layout;
