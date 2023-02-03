import { useEffect } from 'react';
import { createStyles, SimpleGrid, Card, Image, Text, Container, AspectRatio } from '@mantine/core';
import { getAllDataThunk } from '../../../redux/home';
import { useRootDispatch, useRootSelector } from '../../../redux/store';
import { PacmanLoader } from 'react-spinners';
const { REACT_APP_IMAGE_BASE } = process.env;

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
	const loading = useRootSelector((state) => state.home.loading);
	const eventArr = useRootSelector((state) => state.home.eventArr);

	useEffect(() => {
		dispatch(getAllDataThunk());
	}, [dispatch]);

	const cards =
		eventArr &&
		eventArr.map((event) => (
			<Card
				key={`event-${event.id}`}
				p='md'
				radius='md'
				component='a'
				href='#'
				className={classes.card}
			>
				<AspectRatio ratio={1920 / 1080}>
					<Image src={`${REACT_APP_IMAGE_BASE}/${event.image}`} />
				</AspectRatio>
				<Text color='dimmed' size='xs' transform='uppercase' weight={700} mt='md'>
					{event.description}
				</Text>
				<Text className={classes.title} mt={5}>
					{event.title}
				</Text>
			</Card>
		));
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
