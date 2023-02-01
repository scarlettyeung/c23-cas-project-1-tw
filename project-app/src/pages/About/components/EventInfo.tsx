import React from 'react';
import { Event } from '../../../utils/userInfoType';

type EventInfoProps = {
	info: Event[];
};

function EventInfo(props: EventInfoProps) {
	console.log(props.info);
	return (
		<>
			<div>EventInfo</div>
			{props.info.map((event) => (
				<div key={`event-${event.id}`}>
					{event.title}
					<button>details</button>
				</div>
			))}
		</>
	);
}

export default EventInfo;
