import { Button } from '@mantine/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { BadgeCard } from './components/EventCard';

function Events() {
	return (
		<div className='Body'>
			<div className='Title Header'>
				Events
				<Link to={`/events/createEvents`}>
					<Button radius='md' style={{ flex: 1 }}>
						Create Event
					</Button>
				</Link>
			</div>
			<BadgeCard image={''} title={''} country={''} description={''} badges={[]} />
		</div>
	);
}

export default Events;
