import React from 'react';
import { useRootSelector } from './redux/store';
import { Routes, Route } from 'react-router-dom';
import MyRoutes from './components/MyRoutes';

import './App.css';

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
