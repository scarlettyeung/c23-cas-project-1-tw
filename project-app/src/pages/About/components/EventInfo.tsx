import React from 'react';
import { Event } from '../../../utils/userInfoType';
import { Button, Title } from '@mantine/core';
import '../../../styles/about.css';

type EventInfoProps = {
	info: Event[];
};

function EventInfo(props: EventInfoProps) {
	return (
		<>
			<Title order={2}>Event Info</Title>
			<div className='EventHistory'>
				{props.info.map((event) => (
					<div className='EventKey' key={`event-${event.id}`}>
						{event.title}
						<div>
							<Button>details</Button>
						</div>
					</div>
				))}
			</div>
		</>
	);
}

export default EventInfo;
