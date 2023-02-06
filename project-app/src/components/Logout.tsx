import React from 'react';
import { logout } from '../redux/auth';
import { useRootDispatch } from '../redux/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
function Logout() {
	const dispatch = useRootDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const targetPathname = location.state?.from.pathname || '/';

	const logoutBtn = () => {
		dispatch(logout());
		navigate('/login');

		navigate(targetPathname);
	};
	return (
		<Button onClick={logoutBtn}>
			<IconLogout />
		</Button>
	);
}

export default Logout;
