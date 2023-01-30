import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NumericLiteral } from 'typescript';

interface EventDetail {
	id: number;
	title: string;
	wage_offer: number;
	start_date?: Date | null;
	end_date?: Date | null;
	rehearsal_needed: boolean;
	start_time?: Date | null;
	end_time?: Date | null;
	image: string;
	venue_image_name?: string;
	description: string;
	location: string;
	status: string;
	properties: string;
	is_shown: boolean;
	date_published: Date;
}

function EventDetail() {
	let eventId = useParams();
	const [event, setEvent] = useState<EventDetail>();

	useEffect(() => {
		async function loadData() {
			const path = process.env.REACT_APP_API_BASE;
			const jwt = localStorage.getItem('token');
			const res = await fetch(`${path}event/events-detail/${eventId.eventsId}`, {
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			});
			const json = await res.json();
			setEvent(json);
		}
		loadData();
	}, []);
	console.log(event);

	return (
		<div>
			<p>{event?.title}</p>
			<p>{event?.wage_offer}</p>
			<p>{event?.description}</p>
			<p>{event?.rehearsal_needed}</p>
			<p>{event?.image}</p>
			<p>{event?.venue_image_name}</p>
		</div>
	);
}
export default EventDetail;
