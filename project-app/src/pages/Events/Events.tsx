import { Button } from '@mantine/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { BadgeCard } from './components/EventCard';
import '../../styles/event.css';

function Events() {
	return (
		<div className='Body'>
			<div className='Title Header' id='EventHeader'>
				Events
				<Link to={`/events/createEvents`}>
					<Button>Create Event</Button>
				</Link>
			</div>
			<BadgeCard image={''} title={''} country={''} description={''} badges={[]} />
		</div>
	);
}

export default Events;
