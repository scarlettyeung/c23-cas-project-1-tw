import React from 'react';
import { Avatar, Group, Text, Button, Card, useMantineTheme } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useRootSelector } from '../../../redux/store';
import { useNavigate } from 'react-router-dom';
import ApplyButton from './ApplyButton';
const { REACT_APP_IMAGE_BASE } = process.env;

interface ClientEventsType {
	id: number;
	status: string;
	title: string;
	events_applications: {
		id: number;
		status: string;
		performers: {
			users: {
				id: number;
				uuid: string;
				username: string;
				icon: string;
			};
		};
	}[];
}
enum EventStatus {
	Pending = 'pending',
	Accept = 'accept',
	Reject = 'reject',
}
interface PerformerEventsType {
	id: Number;
	title: string;
	status: string;
	image: string;
}

// enum ApplicationStatus {
// 	Pending = 'pending',
// 	Accept = 'accept',
// 	Reject = 'reject',
// }

function LoadApplication() {
	let clientId = useRootSelector((state) => state.auth.clientId);
	let performerId = useRootSelector((state) => state.auth.performerId);
	const [item, setItem] = useState<ClientEventsType[] | PerformerEventsType[] | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
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
			setItem(data.applicationHistory.events);
			setLoading(false);
		}
		loadData();
	}, [clientId, performerId]);

	if (!item && loading) {
		return <>loading...</>;
	}

	if (item && !loading) {
		if (clientId) {
			const clientItem = item as ClientEventsType[];
			const display = clientItem.map((event, idx) => {
				return (
					<div key={idx} style={{ width: 340, margin: 'auto' }}>
						<Card shadow='xl' p='lg' radius='md' withBorder>
							<Text weight={800} mb={7} sx={{ lineHeight: 1 }}>
								{event.title}
							</Text>
							{event.events_applications.map((appItem) => {
								//  EventStatus
								const btn = () => {
									if (appItem.status === EventStatus.Pending) {
										return (
											<ApplyButton
												eventId={event.id}
												performerUserId={appItem.performers.users.id}
											/>
										);
									} else if (appItem.status === EventStatus.Accept) {
										return (
											<Button color='red' fullWidth>
												Accepted
											</Button>
										);
									} else if (appItem.status === EventStatus.Reject) {
										return (
											<Button color='gray' fullWidth>
												Reject
											</Button>
										);
									}
								};
								return (
									<div key={idx}>
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
											<div>{btn()}</div>
										</Group>
									</div>
								);
							})}
						</Card>
					</div>
				);
			});
			return <>{display}</>;
		} else if (performerId) {
			const performerItem = item as PerformerEventsType[];

			const display = performerItem.map((event, idx) => {
				// EventStatus
				const btn = () => {
					if (event.status === 'valid') {
						return (
							<Button color='green' fullWidth>
								Pending
							</Button>
						);
					} else if (event.status === 'accepted') {
						return (
							<Button color='red' fullWidth>
								Accepted
							</Button>
						);
					} else if (event.status === 'completed') {
						return (
							<Button color='gray' fullWidth>
								Reject
							</Button>
						);
					}
				};

				return (
					<div key={idx} style={{ width: 340, margin: 'auto' }}>
						<Group position='apart' style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
							<Avatar size={40} src={`${REACT_APP_IMAGE_BASE}/${event.image}`} radius={40} />
							<div>
								<Text weight={800} mb={7} sx={{ lineHeight: 1 }}>
									{event.title}
								</Text>
							</div>
							<div>{btn()}</div>
						</Group>
					</div>
				);
			});
			return <>{display}</>;
		}

		return <> NO DATA HISTORY</>;
	}

	if (!item && !loading) return <> NO DATA HISTORY</>;
	return <> NO DATA HISTORY</>;
}

export default LoadApplication;
