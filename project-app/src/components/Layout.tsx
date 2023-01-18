import React from 'react';
import Header from './Header';
import Navbar from './NavBar';

function Layout(props: React.PropsWithChildren) {
	return (
		<>
			<Header />
			{props.children}
			<Navbar />
		</>
	);
}

export default Layout;
