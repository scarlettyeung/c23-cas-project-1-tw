import React from 'react';
import { Event } from '../../../utils/userInfoType';
import { Button, Title } from '@mantine/core';
import '../../../styles/about.css';
import { useNavigate } from 'react-router-dom';

type EventInfoProps = {
	info: Event[];
};

function EventInfo(props: EventInfoProps) {
	const navigate = useNavigate();

	return (
		<>
			<Title order={4}>Event Info</Title>
			<div className='about__hashtags__eventHistory'>
				{props.info.map((event) => (
					<div className='about__hashtags__eventKey' key={`event-${event.id}`}>
						{event.title}
						<div>
							<Button
								className='EventInfo__Details_Btn'
								onClick={() => {
									navigate(`./../../../events/${event.id}`, { replace: true });
								}}
							>
								details
							</Button>
						</div>
					</div>
				))}
			</div>
		</>
	);
}

export default EventInfo;
