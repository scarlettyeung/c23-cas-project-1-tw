import React from 'react';
import { MediaPropsType } from '../../../utils/EprofileType';

import MediaContents from './MediaContents';

import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
	inner: {
		display: 'flex',
		justifyContent: 'space-between',
		paddingTop: theme.spacing.xl * 4,
		paddingBottom: theme.spacing.xl * 4,
	},

	content: {
		maxWidth: 480,
		marginRight: theme.spacing.xl * 3,

		[theme.fn.smallerThan('md')]: {
			maxWidth: '100%',
			marginRight: 0,
		},
	},

	title: {
		color: theme.colorScheme === 'dark' ? theme.white : theme.black,
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		fontSize: 44,
		lineHeight: 1.2,
		fontWeight: 900,

		[theme.fn.smallerThan('xs')]: {
			fontSize: 28,
		},
	},

	control: {
		[theme.fn.smallerThan('xs')]: {
			flex: 1,
		},
	},

	image: {
		flex: 1,

		[theme.fn.smallerThan('md')]: {
			display: 'none',
		},
	},

	highlight: {
		position: 'relative',
		backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
		borderRadius: theme.radius.sm,
		padding: '4px 12px',
	},
}));
console.log(useStyles);

function SelfIntroducePage(props: MediaPropsType) {
	const { contents } = props;

	if (contents) {
		return <MediaContents content={contents} />;
	} else {
		return <div>missing content</div>;
	}
}

export default SelfIntroducePage;
