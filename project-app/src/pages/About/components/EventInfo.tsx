import React from 'react';
import { Event } from '../index';

type EventInfoProps = {
	eventInfoData?: Event[];
};

function EventInfo(info: EventInfoProps) {
	const eventArr = info.eventInfoData;
	let mapEvent;
	if (eventArr)
		mapEvent = eventArr.map((event) => (
			<div key={event.id}>
				{event.title}
				<button>details</button>
			</div>
		));
	return (
		<>
			<div>EventInfo</div>

			{!info && <div>No Event</div>}

			{eventArr && mapEvent}
		</>
	);
}

export default EventInfo;
