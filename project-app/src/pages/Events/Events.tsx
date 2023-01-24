import React from 'react';
import { BadgeCard } from './components/EventCard';

function Events() {
	return (
		<div className='Body'>
			<div className='Title Header'>Events</div>
			<BadgeCard image={''} title={''} country={''} description={''} badges={[]} />
		</div>
	);
}

export default Events;
