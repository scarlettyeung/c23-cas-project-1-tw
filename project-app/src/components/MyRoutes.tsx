import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
// import Register from '../pages/Register';
import Home from '../pages/Home';
import ChatRoom from '../pages/ChatRoom';
import Events from '../pages/Events';
import About from '../pages/About';
import NotFound from '../pages/NotFound';
import PrivateRoute from './PrivateRoute';
import CreateEventPage from '../pages/CreateEventPage';

function MyRoutes() {
	return (
		<Routes>
			<Route path='/login' element={<Login />} />
			{/* <Route path='/register' element={<Register />} /> */}

			<Route path='/' element={<PrivateRoute />}>
				<Route element={<Home />} index />
				<Route path='events' element={<Events />} />
				<Route path='createEventsPage' element={<CreateEventPage />} />
				<Route path='chatRoom' element={<ChatRoom />} />
				<Route path='about' element={<About />} />
			</Route>

			<Route path='*' element={<NotFound />} />
		</Routes>
	);
}

export default MyRoutes;
