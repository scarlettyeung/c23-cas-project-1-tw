import React from 'react';
import { CardsCarousel } from '../components/HomePage/CardsCarousel';

function Home() {
	return (
		<div>
			<div className='Title'>PERFORMANCE</div>
			<CardsCarousel />
			<div className='Title'>EVENTS</div>
		</div>
	);
}

export default Home;
