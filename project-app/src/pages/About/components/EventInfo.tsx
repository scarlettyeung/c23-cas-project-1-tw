import React from 'react';
import { Event } from '../../../utils/userInfoType';
import { Button } from '@mantine/core';

type EventInfoProps = {
	info: Event[];
};

function EventInfo(props: EventInfoProps) {
	return (
		<>
			<div>EventInfo</div>
			{props.info.map((event) => (
				<div key={`event-${event.id}`}>
					{event.title}
					<Button>details</Button>
				</div>
			))}
		</>
	);
}

export default EventInfo;
