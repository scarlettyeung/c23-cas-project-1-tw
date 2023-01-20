import React from 'react';
import Header from './Layout/Header';
import Navbar from './Layout/NavBar';

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
