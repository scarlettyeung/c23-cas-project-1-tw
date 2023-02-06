import React from 'react';
import { Event } from '../../../utils/userInfoType';
import { Button, Title } from '@mantine/core';
import '../../../styles/about.css';
import { Link, useNavigate } from 'react-router-dom';

type EventInfoProps = {
	info: Event[];
};

function EventInfo(props: EventInfoProps) {
	const navigate = useNavigate();

	return (
		<>
			<Title order={4}>Event Info</Title>
			<div className='EventHistory'>
				{props.info.map((event) => (
					<div className='EventKey' key={`event-${event.id}`}>
						{event.title}
						<div>
							<Link to={`events/${event.id}`}>
								<Button
									onClick={() => {
										navigate(`/events/${event.id}`, { replace: true });
									}}
								>
									details
								</Button>
							</Link>
						</div>
					</div>
				))}
			</div>
		</>
	);
}

export default EventInfo;
