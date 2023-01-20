import Logout from '../Logout';
// import TestBtn from './TestBtn';
import Search from './Search';
import '../../styles/header.css';

function Header() {
	return (
		<div className='header-bar'>
			<Search />
			<Logout />
			{/* <TestBtn /> */}
		</div>
	);
}

export default Header;
