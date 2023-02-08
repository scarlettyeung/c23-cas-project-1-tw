import { SpotlightProvider, openSpotlight, SpotlightActionProps } from '@mantine/spotlight';
import type { SpotlightAction } from '@mantine/spotlight';
import { createStyles, Badge, Text, Avatar, Button, Center, Group } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import '../../index.css';
const { REACT_APP_IMAGE_BASE } = process.env;
interface PropsType {
	data: SpotlightAction[];
}

function SpotlightControl() {
	return (
		<Group position='center'>
			<button className='search-Btn' onClick={() => openSpotlight()}>
				<IconSearch />
			</button>
		</Group>
	);
}
const useStyles = createStyles(() => ({
	action: {
		position: 'relative',
		display: 'block',
		width: '100%',
		padding: '10px 12px',
	},
}));

function CustomAction({
	action,
	styles,
	classNames,
	hovered,
	onTrigger,
	...others
}: SpotlightActionProps) {
	const { classes, cx } = useStyles();

	return (
		<Button
			className={(cx(classes.action), 'header__performerEventSearch')}
			tabIndex={-1}
			onMouseDown={(event) => event.preventDefault()}
			onClick={onTrigger}
			{...others}
		>
			<Group noWrap>
				<Center>
					{action.icon ? (
						<Avatar
							src={`${REACT_APP_IMAGE_BASE}/${action.icon}`}
							alt={action.title}
							key={`s_${action.image}_${action.id}`}
						/>
					) : (
						<Avatar alt={action.title} key={`s_${action.image}_${action.id}`} />
					)}
				</Center>

				<div style={{ flex: 1 }}>
					<Text>{action.title}</Text>

					{action.description && (
						<Text color='dimmed' size='xs'>
							{action.description}
						</Text>
					)}
				</div>

				{action.new && <Badge>new</Badge>}
			</Group>
		</Button>
	);
}

function PerformerEventSearch(props: PropsType) {
	return (
		<>
			<SpotlightProvider
				actions={props.data}
				actionComponent={CustomAction}
				limit={7}
				searchPlaceholder='Search...'
				nothingFoundMessage='Nothing found...'
			>
				<SpotlightControl />
			</SpotlightProvider>
		</>
	);
}

export default PerformerEventSearch;
