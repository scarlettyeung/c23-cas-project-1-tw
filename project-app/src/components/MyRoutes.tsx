import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home/Home';
import Events from '../pages/Events/Events';
import About from '../pages/About';
import Eprofile from '../pages/Eprofile/Eprofile';
import NotFound from '../pages/NotFound';
import PrivateRoute from './PrivateRoute';
import CreateEventPage from '../pages/Events/components/CreateEvents';
import EventDetail from '../pages/Events/EventDetailPage';
import React from 'react';
import Corporate from '../pages/Register/corporate/Corporate';
import Individual from '../pages/Register/Individual/Individual';
import Performer from '../pages/Register/Performer/Performer';
import Register from '../pages/Register/Register';
import PublicRoute from './PublicRoute';
import PersonalDetails from '../pages/PersonalDetails';
import LoadHistory from '../pages/History/LoadHistory';

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
			<Route path='/' element={<PrivateRoute />}>
				<Route element={<Home />} index />
				<Route path='events' element={<Events />} />
				<Route path='events/:eventsId' element={<EventDetail />} />
				<Route path='events/createEvents' element={<CreateEventPage />} />
				<Route path='history/application' element={<LoadHistory />} />

				<Route path='about'>
					<Route element={<PersonalDetails />} index />
					<Route path='uuid/:uuid' element={<About />} />
				</Route>

				<Route path='eProfile'>
					<Route path='uuid/:uuid/get' element={<Eprofile />} index />
				</Route>
			</Route>

			<Route path='*' element={<NotFound />} />
		</Routes>
	);
}

export default MyRoutes;
