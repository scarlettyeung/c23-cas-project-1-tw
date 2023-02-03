import React from 'react';
import { Avatar, Group, Text, Button, Card, useMantineTheme } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useRootSelector } from '../../../redux/store';
const { REACT_APP_IMAGE_BASE } = process.env;

interface UsersTableProps {
	events: {
		id: number;
		status: string;
		title: string;
		events_applications: {
			id: number;
			status: string;
			performers: {
				users: {
					username: string;
					icon: string;
				};
			};
		}[];
	}[];
}

function LoadApplication() {
	let clientId = useRootSelector((state) => state.auth.clientId);
	const [item, setItem] = useState<UsersTableProps | null>(null);
	const theme = useMantineTheme();
	useEffect(() => {
		async function loadData() {
			const jwt = localStorage.getItem('token');
			const path = process.env.REACT_APP_API_BASE;
			let url = `${path}history/application`;
			const res = await fetch(url, {
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			});
			const data = await res.json();
			setItem(data.applicationHistory);
		}
		loadData();
	}, [clientId]);

	if (!item) {
		return <>loading...</>;
	} else {
		const display = item.events.map((event) => {
			return (
				<>
					<div style={{ width: 340, margin: 'auto' }}>
						<Card shadow='sm'>
							<div key={`event-${event.title}`}>
								<Text weight={800} mb={7} sx={{ lineHeight: 1 }}>
									{event.title}
								</Text>
								{event.events_applications.map((appItem) => {
									let isPending = true;
									if (appItem.status != 'pending') {
										isPending = false;
									}
									return (
										<div key={`appItem_${appItem.id}`}>
											<Group
												position='apart'
												style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
											>
												<Avatar
													size={40}
													src={`${REACT_APP_IMAGE_BASE}/${appItem.performers.users.icon}`}
													radius={40}
												/>
												<div>
													<Text size='sm' weight={500}>
														{appItem.performers.users.username}
													</Text>
												</div>
												<div>
													{isPending ? (
														<Button fullWidth>Accept</Button>
													) : (
														<Button color='gray' fullWidth>
															Disabled
														</Button>
													)}
												</div>
											</Group>
										</div>
									);
								})}
							</div>
						</Card>
					</div>
				</>
			);
		});
		return <>{display}</>;
	}
}

export default LoadApplication;
