import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
// import Register from '../pages/Register';
import Home from '../pages/Home/Home';
import ChatRoom from '../pages/Chat/ChatRoom';
import Events from '../pages/Events/Events';
// import About from '../pages/About/About';
import About from '../pages/About/';
import NotFound from '../pages/NotFound';
import PrivateRoute from './PrivateRoute';
import CreateEventPage from '../pages/Events/components/CreateEvents';
import EventDetail from '../pages/Events/EventDetailPage';
import React from 'react';
import Corporate from '../pages/Corporate';
import Individual from '../pages/Individual';
import Performer from '../pages/Performer';
import Register from '../pages/Register';
import PublicRoute from './PublicRoute';
import PersonalDetails from '../pages/PersonalDetails';

function MyRoutes() {
	return (
		<Routes>
			<Route path='login' element={<Login />} />
			<Route path='register' element={<PublicRoute />}>
				<Route element={<Register />} index />
				<Route path='corporate' element={<Corporate />} />
				<Route path='individual' element={<Individual />} />
				<Route path='performer' element={<Performer />} />
			</Route>
			{/* <Route path='/register' element={<Register />} /> */}

			<Route path='/' element={<PrivateRoute />}>
				<Route element={<Home />} index />
				<Route path='events' element={<Events />} />
				<Route path='events/events-detail/:eventsId' element={<EventDetail />} />
				<Route path='createEventsPage' element={<CreateEventPage />} />
				<Route path='chatRoom' element={<ChatRoom />} />
				<Route path='about'>
					<Route element={<PersonalDetails />} index />
					<Route path=':uuid' element={<About />} />
				</Route>
			</Route>

			<Route path='*' element={<NotFound />} />
		</Routes>
	);
}

export default MyRoutes;
