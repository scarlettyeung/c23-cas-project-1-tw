import { SpotlightProvider, openSpotlight, SpotlightActionProps } from '@mantine/spotlight';
import type { SpotlightAction } from '@mantine/spotlight';

import { IconHome, IconDashboard, IconFileText, IconSearch } from '@tabler/icons';
import { createStyles, Badge, Text, Image, Button, Center, UnstyledButton, Group, Select } from '@mantine/core';
const { REACT_APP_IMAGE_BASE } = process.env;
interface PropsType {
    data: SpotlightAction[]
}

function SpotlightControl() {
    return (
        <Group position="center">
            <Button onClick={() => openSpotlight()}>search</Button>
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
    const { classes, cx } = useStyles( );
    return (
        <UnstyledButton
            className={cx(classes.action)}
            tabIndex={-1}
            onMouseDown={(event) => event.preventDefault()}
            onClick={onTrigger}
            {...others}
        >
            <Group noWrap>
                {action.image && (
                    <Center>
                        <Image src={`${REACT_APP_IMAGE_BASE}/${action.image}`} alt={action.title} width={50} height={50} />
                    </Center>
                )}

                <div style={{ flex: 1 }}>
                    <Text>{action.title}</Text>

                    {action.description && (
                        <Text color="dimmed" size="xs">
                            {action.description}
                        </Text>
                    )}
                </div>

                {action.new && <Badge>new</Badge>}
            </Group>
        </UnstyledButton>
    );
}

function PerformerEventSearch(props: PropsType) {

    return (
        <>
            <SpotlightProvider
                actions={props.data}
                actionComponent={CustomAction}
                searchPlaceholder="Search..."
                shortcut="mod + shift + 1"
                nothingFoundMessage="Nothing found..."
            >
                <SpotlightControl />
            </SpotlightProvider>

        </>
    )
}

export default PerformerEventSearch