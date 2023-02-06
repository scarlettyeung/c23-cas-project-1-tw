import { SpotlightProvider, openSpotlight, SpotlightActionProps } from '@mantine/spotlight';
import type { SpotlightAction } from '@mantine/spotlight';
import { createStyles, Badge, Text, Image, Button, Center, Group } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

const { REACT_APP_IMAGE_BASE } = process.env;
interface PropsType {
	data: SpotlightAction[];
}

function SpotlightControl() {
	return (
		<Group position='center'>
			<Button onClick={() => openSpotlight()}>
				<IconSearch />
			</Button>
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
			className={cx(classes.action)}
			tabIndex={-1}
			onMouseDown={(event) => event.preventDefault()}
			onClick={onTrigger}
			{...others}
		>
			<Group noWrap>
				{action.image && (
					<Center>
						<Image
							src={`${REACT_APP_IMAGE_BASE}/${action.image}`}
							alt={action.title}
							width={50}
							height={50}
						/>
					</Center>
				)}

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
				searchPlaceholder='Search...'
				shortcut='mod + shift + 1'
				nothingFoundMessage='Nothing found...'
			>
				<SpotlightControl />
			</SpotlightProvider>
		</>
	);
}

export default PerformerEventSearch;
