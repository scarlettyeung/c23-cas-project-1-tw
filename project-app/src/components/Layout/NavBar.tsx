import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/navbar.css';
import { useRootSelector } from '../../redux/store';
function Navbar() {
	const navigate = useNavigate();
	const uuidFromState = useRootSelector((state) => state.auth.uuid);
	const userId = useRootSelector((state) => state.auth.id);
	return (
		<>
			<nav className='navbar'>
				<a onClick={() => navigate('/', { replace: true })}>HOME</a>
				<a onClick={() => navigate('events', { replace: true })}>EVENTS</a>
				<a onClick={() => navigate(`history/application`, { replace: true })}>HISTORY</a>
				<a onClick={() => navigate(`about/uuid/${uuidFromState}`, { replace: true })}>ABOUT</a>
			</nav>
		</>
	);
}

export default Navbar;
