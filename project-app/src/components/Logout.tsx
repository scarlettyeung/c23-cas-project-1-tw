import React from 'react';
import { useRootDispatch } from '../redux/store';
import { logout } from '../redux/auth';

function Logout() {
	const dispatch = useRootDispatch();

	const logoutBtn = () => {
		console.log('logged out');
		dispatch(logout());
	};
	return (
		<div>
			<input type='button' value='LogOut' onClick={logoutBtn}></input>
		</div>
	);
}

export default Logout;
