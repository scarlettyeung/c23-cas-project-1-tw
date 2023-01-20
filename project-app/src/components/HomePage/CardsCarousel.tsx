import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { createStyles, Paper, useMantineTheme } from '@mantine/core';

const useStyles = createStyles((theme) => ({
	card: {
		height: 150,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	},
}));

interface CardProps {
	image: string;
}

function Card({ image }: CardProps) {
	const { classes } = useStyles();

	return (
		<Paper
			shadow='md'
			radius={100}
			sx={{ backgroundImage: `url(${image})` }}
			className={classes.card}
		></Paper>
	);
}

const data = [
	{
		image:
			'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
	},
	{
		image:
			'https://images.unsplash.com/photo-1559494007-9f5847c49d94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
	},
	{
		image:
			'https://images.unsplash.com/photo-1559494007-9f5847c49d94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
	},
	{
		image:
			'https://images.unsplash.com/photo-1559494007-9f5847c49d94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
	},
];

export function CardsCarousel() {
	const theme = useMantineTheme();
	const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
	const slides = data.map((item) => (
		<Carousel.Slide key={item.image}>
			<Card {...item} />
		</Carousel.Slide>
	));

	return (
		<Carousel
			slideSize='50%'
			breakpoints={[{ maxWidth: 'sm', slideSize: '40%', slideGap: 4 }]}
			slideGap='xl'
			align='start'
			slidesToScroll={mobile ? 1 : 2}
		>
			{slides}
		</Carousel>
	);
}
