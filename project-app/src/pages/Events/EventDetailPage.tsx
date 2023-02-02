import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface EventDetailType {
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
	const [event, setEvent] = useState<EventDetailType>();

	const [event, setEvent] = useState<EventDetail>();
	const navigate = useNavigate();
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
	}, [eventId.eventsId]);
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
				onClick={async (e) => {
					const path = process.env.REACT_APP_API_BASE;
					const jwt = localStorage.getItem('token');
					const resp = await fetch(`${path}events/${eventId.eventsId}`, {
						method: 'POST',
						headers: {
							Authorization: `Bearer ${jwt}`,
						},
					});
					const result = await resp.json();
					alert('Application successfully');
					navigate('/events');
				}}
			>
				Apply
			</button>
		</div>
	);
}
export default EventDetail;
