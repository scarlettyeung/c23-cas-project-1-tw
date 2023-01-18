import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/navbar.css';
// import HomeIcon from '@mui/icons-material/Home';
// import EventIcon from '@mui/icons-material/Event';
// import ChatIcon from '@mui/icons-material/Chat';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Navbar() {
	const navigate = useNavigate();

	return (
		<>
			<nav className='navbar'>
				<a onClick={() => navigate('/', { replace: true })}>HOME</a>
				<a onClick={() => navigate('events', { replace: true })}>EVENTS</a>
				<a onClick={() => navigate('chatRoom', { replace: true })}>CHATROOM</a>
				<a onClick={() => navigate('about', { replace: true })}>ABOUT</a>
			</nav>
		</>
	);
}

export default Navbar;
