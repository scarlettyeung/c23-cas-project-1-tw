import React from 'react';
import { CardsCarousel } from '../components/HomePage/CardsCarousel';
import { EventsCard } from '../components/HomePage/EventsCard';

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
