import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import ChatRoom from '../pages/ChatRoom';
import Events from '../pages/Events';
import About from '../pages/About';
import Layout from './Layout';
import NotFound from '../pages/NotFound';
import PrivateRoute from './PrivateRoute';

function MyRoutes() {
	return (
		<Routes>
			<Route path='/login' element={<Login />} />
			<Route path='/register' element={<Register />} />

			<Route path='' element={<PrivateRoute />} />
			<Route path='/' element={<Layout />}>
				<Route path='home' element={<Home />} />
				<Route path='events' element={<Events />} />
				<Route path='chatRoom' element={<ChatRoom />} />
				<Route path='about' element={<About />} />
			</Route>
			<Route path='*' element={<NotFound />} />
		</Routes>
	);
}

export default MyRoutes;
