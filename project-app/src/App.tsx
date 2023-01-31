import React from 'react';
import { useRootSelector } from './redux/store';
// import TestBtn from './components/TestBtn';
import MyRoutes from './components/MyRoutes';

import './App.css';

function App() {
	return (
		<div className='App'>
			<MyRoutes />
		</div>
	);
}

export default App;
