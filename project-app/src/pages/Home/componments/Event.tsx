import { useEffect } from 'react';
import { createStyles, SimpleGrid, Card, Image, Text, Container, AspectRatio } from '@mantine/core';
import { getAllEventsThunk } from '../../../redux/home';
import { useRootDispatch, useRootSelector } from '../../../redux/store';
import { PacmanLoader } from 'react-spinners';

const useStyles = createStyles((theme) => ({
	card: {
		transition: 'transform 150ms ease, box-shadow 150ms ease',

		'&:hover': {
			transform: 'scale(1.01)',
			boxShadow: theme.shadows.md,
		},
	},

	title: {
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		fontWeight: 600,
	},
}));

export function EventsCard() {
	const { classes } = useStyles();
	const dispatch = useRootDispatch();
	const loading = useRootSelector((state) => state.event.loading);
	const eventArr = useRootSelector((state) => state.event.eventArr);

	useEffect(() => {
		dispatch(getAllEventsThunk());
	}, [dispatch]);

	const cards = eventArr.map((event) => (
		<Card
			key={`event-${event.id}`}
			p='md'
			radius='md'
			component='a'
			href='#'
			className={classes.card}
		>
			<AspectRatio ratio={1920 / 1080}>
				<Image src={event.image} />
			</AspectRatio>
			<Text color='dimmed' size='xs' transform='uppercase' weight={700} mt='md'>
				{event.description}
			</Text>
			<Text className={classes.title} mt={5}>
				{event.title}
			</Text>
		</Card>
	));
	console.log('========load data========');
	console.dir(cards);
	return (
		<>
			{loading === 'pending' ? (
				<PacmanLoader />
			) : (
				<Container py='xl'>
					<SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
						{cards}
					</SimpleGrid>
				</Container>
			)}
		</>
	);
}
