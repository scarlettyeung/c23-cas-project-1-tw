import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/navbar.css';
import { useRootSelector } from '../../redux/store';
import { IconHome, IconCalendar, IconHistory, IconUser } from '@tabler/icons';

function Navbar() {
	const navigate = useNavigate();
	const uuidFromState = useRootSelector((state) => state.auth.uuid);
	return (
		<nav className='navbar'>
			<IconHome
				size={35}
				className='navIcon'
				onClick={() => navigate('/', { replace: true })}
			></IconHome>
			<IconCalendar
				size={35}
				className='navIcon'
				onClick={() => navigate('events', { replace: true })}
			></IconCalendar>
			<IconHistory
				size={35}
				className='navIcon'
				onClick={() => navigate(`history/application`, { replace: true })}
			></IconHistory>
			<IconUser
				size={35}
				className='navIcon'
				onClick={() => navigate(`about/uuid/${uuidFromState}`, { replace: true })}
			></IconUser>
		</nav>
	);
}

export default Navbar;
