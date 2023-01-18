import Logout from './Logout';
import TestBtn from './TestBtn';
import Search from './Search';

function Header() {
	return (
		<div>
			<Search />
			<Logout />
			<TestBtn />
		</div>
	);
}

export default Header;
