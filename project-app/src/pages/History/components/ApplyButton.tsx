import React from 'react';
import { Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

interface PopDataType {
	eventId: number;
	performerUserId: number;
}

function ApplyButton(props: PopDataType) {
	const navigate = useNavigate();
	return (
		<div>
			<Button
				onClick={async (e) => {
					const path = process.env.REACT_APP_API_BASE;
					const jwt = localStorage.getItem('token');
					const resp = await fetch(
						`${path}history/application/${props.eventId}/${props.performerUserId}`,
						{
							method: 'POST',
							headers: {
								Authorization: `Bearer ${jwt}`,
							},
						},
					);
					const result = await resp.json();
					console.log(result);
					alert('Matching SUCCESS!');
					navigate('/');
				}}
				fullWidth
			>
				Accept
			</Button>
		</div>
	);
}

export default ApplyButton;
