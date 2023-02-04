import React from 'react';
import { createStyles, Avatar, Text, Group } from '@mantine/core';
import { IconPhoneCall, IconAt } from '@tabler/icons';
const { REACT_APP_IMAGE_BASE } = process.env;
type props = {
	headerInfo: HeaderInfo;
};
type HeaderInfo = {
	iconPosition: string;
	iconName: string | null;
	backgroundImage: string;
	colorStyle: string;
	displayTab: string;
	userName: string;
	title: string;
	introduction: string;
	contactNumber: string;
	contactEmail: string;
};

const useStyles = createStyles((theme) => ({
	icon: {
		color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
	},

	name: {
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
	},
}));

function BasicInformation(props: props) {
	const headerInfo = props.headerInfo;
	const { classes } = useStyles();
	return (
		<>
			<div>
				<Group noWrap style={{ marginBottom: '0.5vh' }}>
					<Avatar src={`${REACT_APP_IMAGE_BASE}/${headerInfo.iconName}`} size={94} radius='md' />
					<div>
						<Text
							size='xs'
							sx={{ textTransform: 'uppercase' }}
							weight={700}
							color='dimmed'
							lineClamp={1}
							align={'left'}
						>
							{headerInfo.title}
						</Text>

						<Text size='lg' weight={500} className={classes.name} lineClamp={1} align={'left'}>
							{headerInfo.userName}
						</Text>

						<Group noWrap spacing={10} mt={3}>
							<IconAt stroke={1.5} size={16} className={classes.icon} />
							<Text size='xs' color='dimmed'>
								{headerInfo.contactEmail}
							</Text>
						</Group>

						<Group noWrap spacing={10} mt={5}>
							<IconPhoneCall stroke={1.5} size={16} className={classes.icon} />
							<Text size='xs' color='dimmed'>
								{headerInfo.contactNumber}
							</Text>
						</Group>
					</div>
				</Group>
			</div>
		</>
	);
}

export default BasicInformation;
