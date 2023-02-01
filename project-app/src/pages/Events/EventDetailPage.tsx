import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
			const res = await fetch(`${path}events/${eventId.eventsId}`, {
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

			<button>Edit</button>

			<button
				onChange={async (e) => {
					const path = process.env.REACT_APP_API_BASE;
					const jwt = localStorage.getItem('token');
					const resp = await fetch(`${path}events/${eventId.eventsId}`, {
						method: 'POST',
						headers: {
							Authorization: `Bearer ${jwt}`,
						},
					});
					const result = await resp.json();
				}}
			>
				Apply
			</button>
		</div>
	);
}
export default EventDetail;
