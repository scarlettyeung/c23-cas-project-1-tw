import Logout from './Logout';
import TestBtn from './TestBtn';
import Search from './Search';

function Header() {
	return (
		<div>
			<Search />
			<h1>Header</h1>
			<Logout />
			<TestBtn />
		</div>
	);
}

export default Header;
