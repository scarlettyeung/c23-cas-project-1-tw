import React from 'react';
import './App.css';
// import Home from './pages/Home';
import Login from './pages/Login';
import { useRootSelector } from './redux/store';
import { Routes, Route } from 'react-router-dom';
// import Register from './pages/Register';
import Logout from './components/Logout';
import TestBtn from './components/TestBtn';

function App() {
	const isAuth = useRootSelector((state) => state.auth.isAuth);
	console.log(isAuth);

	return (
		<div className='App'>
			<header className='App-header'>
				<div>
					<Logout />
					<br></br>
					<TestBtn />
				</div>
				<div>
					<Login />
				</div>
			</header>
		</div>
	);
}

export default App;
