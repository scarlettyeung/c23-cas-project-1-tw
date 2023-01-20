import Logout from '../Logout';
// import TestBtn from './TestBtn';
import Search from './Search';
import '../../styles/header.css';

function Header() {
	return (
		<div className='header-bar'>
			<img className='HeaderLogo' src='../../logo.png' alt='Joasis logo' />
			<Search />
			<Logout />
			{/* <TestBtn /> */}
		</div>
	);
}

export default Header;
