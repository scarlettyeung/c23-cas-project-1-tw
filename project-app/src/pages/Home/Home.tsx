import React from 'react';
import { CardsCarousel } from './componments/CardsCarousel';
import { EventsCard } from './componments/EventsCard';

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
