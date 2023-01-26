import { useEffect } from 'react';
import { IconHeart } from '@tabler/icons';
import { Card, Image, Text, Group, Badge, Button, ActionIcon, createStyles } from '@mantine/core';
import { getAllEventsThunk } from '../../../redux/home';
import { useRootDispatch, useRootSelector } from '../../../redux/store';
import { PacmanLoader } from 'react-spinners';

const useStyles = createStyles((theme) => ({
	card: {
		backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
	},

	section: {
		borderBottom: `1px solid ${
			theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
		}`,
		paddingLeft: theme.spacing.md,
		paddingRight: theme.spacing.md,
		paddingBottom: theme.spacing.md,
	},

	like: {
		color: theme.colors.red[6],
	},

	label: {
		textTransform: 'uppercase',
		fontSize: theme.fontSizes.xs,
		fontWeight: 700,
	},
}));

interface BadgeCardProps {
	image: string;
	title: string;
	country: string;
	description: string;
	badges: {
		emoji: string;
		label: string;
	}[];
}

export function BadgeCard({ image, title, description, country, badges }: BadgeCardProps) {
	const dispatch = useRootDispatch();
	const loading = useRootSelector((state) => state.event.loading);
	const eventArr = useRootSelector((state) => state.event.eventArr);

	useEffect(() => {
		dispatch(getAllEventsThunk());
	}, [dispatch]);
	const { classes, theme } = useStyles();

	const features = badges.map((badge) => (
		<Badge
			color={theme.colorScheme === 'dark' ? 'dark' : 'gray'}
			key={badge.label}
			leftSection={badge.emoji}
		>
			{badge.label}
		</Badge>
	));

	return (
		<>
			{loading === 'pending' ? (
				<PacmanLoader />
			) : (
				<div>
					{eventArr.map((event) => (
						<div key={`event-${event.id}`}>
							<Card withBorder radius='md' p='md' className={classes.card}>
								<Card.Section>
									<Image src={event.image} alt={title} height={180} />
								</Card.Section>

								<Card.Section className={classes.section} mt='md'>
									<Group position='apart'>
										<Text size='lg' weight={500}>
											{event.title}
										</Text>
										<Badge size='sm'>{event.location}</Badge>
									</Group>
									<Text size='sm' mt='xs'>
										{event.description}
									</Text>
								</Card.Section>

								<Card.Section className={classes.section}>
									<Text mt='md' className={classes.label} color='dimmed'>
										Perfect for you, if you enjoy
									</Text>
									<Group spacing={7} mt={5}>
										{features}
									</Group>
								</Card.Section>

								<Group mt='xs'>
									<Button radius='md' style={{ flex: 1 }}>
										Show details
									</Button>
									<ActionIcon variant='default' radius='md' size={36}>
										<IconHeart size={18} className={classes.like} stroke={1.5} />
									</ActionIcon>
								</Group>
							</Card>
						</div>
					))}
				</div>
			)}
		</>
	);
}
