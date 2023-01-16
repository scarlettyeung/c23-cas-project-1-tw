import React from 'react';
import { useRootSelector } from '../redux/store';
function Home() {
	const userEmail = useRootSelector((state) => state.auth.userEmail);
	return (
		<div>
			<h1>Home</h1>
			<div>Hi, {userEmail?.toUpperCase()}</div>
		</div>
	);
}

export default Home;
