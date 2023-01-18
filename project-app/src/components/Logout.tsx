import React from 'react';
import { logout } from '../redux/auth';
import { useRootDispatch } from '../redux/store';
import { useLocation, useNavigate } from 'react-router-dom';

function Logout() {
	const dispatch = useRootDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const targetPathname = location.state?.from.pathname || '/';

	const logoutBtn = () => {
		console.log('logged out');
		dispatch(logout());
		navigate('/login');

		navigate(targetPathname);
	};
	return (
		<div>
			<input type='button' value='LogOut' onClick={logoutBtn}></input>
		</div>
	);
}

export default Logout;
