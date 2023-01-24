import React from 'react';
import Login from './pages/Login';
import { useRootSelector } from './redux/store';
import Logout from './components/Logout';
import TestBtn from './components/TestBtn';
import MyRoutes from './components/MyRoutes';

import './styles/App.css';

function App() {
	const isAuth = useRootSelector((state) => state.auth.isAuth);
	console.log(isAuth);

	return (
		<div className='App'>
			<MyRoutes />
		</div>
	);
}

export default App;
