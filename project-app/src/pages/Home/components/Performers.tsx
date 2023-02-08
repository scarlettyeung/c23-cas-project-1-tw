import { useEffect } from 'react';
import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { createStyles, Paper, useMantineTheme } from '@mantine/core';
import { getAllDataThunk } from '../../../redux/home';
import { useRootDispatch, useRootSelector } from '../../../redux/store';
import { Link } from 'react-router-dom';
const { REACT_APP_IMAGE_BASE } = process.env;

const useStyles = createStyles((theme) => ({
	card: {
		height: 150,
		width: 150,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		marginLeft: 5
	},
}));

interface CardProps {
	image: string | undefined;
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

export function CardsCarousel() {
	const dispatch = useRootDispatch();
	const loading = useRootSelector((state) => state.home.loading);
	const performers = useRootSelector((state) => state.home.performersArr);

	useEffect(() => {
		dispatch(getAllDataThunk());
	}, [dispatch]);

	const theme = useMantineTheme();
	const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
	const slides =
		performers &&
		performers.map((item) => (
			<Carousel.Slide key={`item-${item.id}`}>
				<Link to={`/about/uuid/${item.uuid}`}>
					<Card image={`${REACT_APP_IMAGE_BASE}/${item.icon}`} {...item} />{' '}
				</Link>
			</Carousel.Slide>
		));

	if (loading !== 'succeeded') {
		return <>loading...</>;
	} else
		return (
			<Carousel
				slideSize='50%'
				breakpoints={[{ maxWidth: 'sm', slideSize: '40%', slideGap: 4 }]}
				slideGap='xl'
				align='center'
				slidesToScroll={mobile ? 1 : 2}
				loop
			>
				{slides}
			</Carousel>
		);
}

export default CardsCarousel;
