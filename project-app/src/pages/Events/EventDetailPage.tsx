import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Image, Text, Group, Badge, Button } from '@mantine/core';
import logger from 'redux-logger';

interface EventDetailType {
	id: number;
	title: string;
	wage_offer: number;
	start_date?: any;
	end_date?: any;
	rehearsal_needed: boolean;
	start_time?: any;
	end_time?: any;
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
	const [isLoading, setIsLoading] = useState<boolean>(true);
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
		setIsLoading(false);
	}, [eventId.eventsId]);

	if (isLoading) return <>isLoading</>;

	return (
		<div>
			<Card withBorder radius='md' p='md'>
				<Card.Section>
					<Image src={event?.image} alt={event?.image} height={180} />
				</Card.Section>

				<Card.Section className={event?.title} mt='md'>
					<Group position='apart'>
						<Text size='lg' weight={500}>
							{event?.title}
						</Text>
						<Badge size='sm'>{event?.location}</Badge>
					</Group>
					<Text size='sm' mt='xs'>
						{event?.description}
					</Text>

					<Group spacing={7} mt={5}>
						<Text size='sm' mt='xs'>
							<div>START DATE :</div>
							{event?.start_date}
						</Text>

						<Text size='sm' mt='xs'>
							<div>END DATE :</div>
							{event?.end_date}{' '}
						</Text>

						<Text size='sm' mt='xs'>
							<div>START TIME :</div>
							{event?.start_time}{' '}
						</Text>

						<Text size='sm' mt='xs'>
							<div>END TIME :</div>
							{event?.end_time}{' '}
						</Text>
					</Group>
				</Card.Section>
			</Card>

			<Button
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
					logger(result);
					alert('Application successfully');
					navigate('/events');
				}}
			>
				Apply
			</Button>
		</div>
	);
}
export default EventDetail;
