import React from 'react';
import { CardsCarousel } from './components/Performers';
import { EventsCard } from './components/EventsCard';

function Home() {
	return (
		<div className='Body'>
			<div className='Title'>PERFORMANCE</div>
			<CardsCarousel />
			<div className='Title'>EVENTS</div>
			<EventsCard />
		</div>
	);
}

export default Home;
