import React from 'react';
import { Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import logger from 'redux-logger';

interface PopDataType {
	eventId: number;
	performerUserId: number;
}

function ApplyButton(props: PopDataType) {
	const navigate = useNavigate();
	return (
		<div>
			<Button
				onClick={async () => {
					const path = process.env.REACT_APP_API_BASE;
					const jwt = localStorage.getItem('token');
					const resp = await fetch(
						`${path}/history/application/${props.eventId}/${props.performerUserId}`,
						{
							method: 'POST',
							headers: {
								Authorization: `Bearer ${jwt}`,
							},
						},
					);
					const result = await resp.json();
					alert('Matching SUCCESS!');
					logger(result);
					navigate('/', {
						replace: true,
					});
				}}
				fullWidth
			>
				Accept
			</Button>
		</div>
	);
}

export default ApplyButton;
