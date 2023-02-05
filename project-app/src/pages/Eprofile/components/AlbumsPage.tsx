import React from 'react';
import { MediaPropsType, PageContent } from '../../../utils/EprofileType';
import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { createStyles, Paper, Text, Title, useMantineTheme } from '@mantine/core';

const { REACT_APP_IMAGE_BASE } = process.env;

const useStyles = createStyles((theme) => ({
	card: {
		height: 440,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	},

	title: {
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		fontWeight: 900,
		color: theme.white,
		lineHeight: 1.2,
		fontSize: 32,
		marginTop: theme.spacing.xs,
	},

	category: {
		color: theme.white,
		opacity: 0.7,
		fontWeight: 700,
		textTransform: 'uppercase',
	},
}));

function Card({ id, type, content1: title, content2: description, content3: url }: PageContent) {
	const { classes } = useStyles();

	return (
		<Paper
			shadow='md'
			p='xl'
			radius='md'
			sx={{ backgroundImage: `url(${REACT_APP_IMAGE_BASE}/${url})` }}
			className={classes.card}
		>
			<div>
				<Text className={classes.category} size='xs'>
					{description}
				</Text>
				<Title order={3} className={classes.title}>
					{title}
				</Title>
			</div>
		</Paper>
	);
}

function AlbumsPage(props: MediaPropsType) {
	const theme = useMantineTheme();
	const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
	const slides = props.contents.map((item) => (
		<Carousel.Slide key={`img_id_${item.id}`}>
			<Card {...item} />
		</Carousel.Slide>
	));

	return (
		<Carousel
			slideSize='50%'
			breakpoints={[{ maxWidth: 'sm', slideSize: '100%', slideGap: 2 }]}
			slideGap='xl'
			align='start'
			slidesToScroll={mobile ? 1 : 2}
		>
			{slides}
		</Carousel>
	);
}

export default AlbumsPage;
