import { Button } from '@mantine/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { BadgeCard } from './components/EventCard';
import '../../styles/event.css';
import { useRootSelector } from '../../redux/store';
function Events() {
	const isCline = useRootSelector((state) => state.auth.clientId);
	return (
		<div>
			<div className='Title Header' id='EventHeader'>
				Events
				{isCline && (
					<Link to={`/events/createEvents`}>
						<Button>Create Event</Button>
					</Link>
				)}
			</div>
			<BadgeCard image={''} title={''} country={''} description={''} badges={[]} />
		</div>
	);
}

export default Events;
