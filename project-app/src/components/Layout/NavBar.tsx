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
			<div>
				<IconHome onClick={() => navigate('/', { replace: true })}></IconHome>
			</div>
			<div>
				<IconCalendar onClick={() => navigate('events', { replace: true })}></IconCalendar>
			</div>
			<div>
				<IconHistory
					onClick={() => navigate(`history/application`, { replace: true })}
				></IconHistory>
			</div>
			<div>
				<IconUser
					onClick={() => navigate(`about/uuid/${uuidFromState}`, { replace: true })}
				></IconUser>
			</div>
		</nav>
	);
}

export default Navbar;
