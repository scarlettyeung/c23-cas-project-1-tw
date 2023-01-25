import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
// import Register from '../pages/Register';
import Home from '../pages/Home/Home';
import ChatRoom from '../pages/Chat/ChatRoom';
import Events from '../pages/Events/Events';
import About from '../pages/About/About';
import NotFound from '../pages/NotFound';
import PrivateRoute from './PrivateRoute';
import CreateEventPage from '../pages/CreateEventPage';
import EventDetail from '../pages/EventDetail';
import React from 'react';

function MyRoutes() {
	return (
		<Routes>
			<Route path='/login' element={<Login />} />
			{/* <Route path='/register' element={<Register />} /> */}

			<Route path='/' element={<PrivateRoute />}>
				<Route element={<Home />} index />
				<Route path='events' element={<Events />} />
				<Route path='events-detail/:eventsId' element={<EventDetail />} />
				<Route path='createEventsPage' element={<CreateEventPage />} />
				<Route path='chatRoom' element={<ChatRoom />} />
				<Route path='about' element={<About />} />
			</Route>

			<Route path='*' element={<NotFound />} />
		</Routes>
	);
}

export default MyRoutes;
