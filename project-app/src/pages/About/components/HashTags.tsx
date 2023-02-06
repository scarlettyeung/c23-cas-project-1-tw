import { Badge, Group, Title, Flex } from '@mantine/core';
import { HashTag } from '../../../utils/userInfoType';

type HashTagsProps = {
	tags: HashTag[] | null;
};
function HashTags(props: HashTagsProps) {
	return (
		<>
			{/* <Group position='center' spacing='lg'> */}
			<div className='EventHistory'>
				<Title align='left' order={4}>
					HASH TAGS
				</Title>

				<Flex mih={50} gap='xs' justify='flex-start' align='flex-start' direction='row' wrap='wrap'>
					{props.tags &&
						props.tags.map((tag) => (
							<div className='HashTagsKey' key={`userTag_${tag.id}`}>
								<Badge size='sm' sx={{ paddingLeft: 0 }} radius='xl' key={`tag_${tag.id}`}>
									{tag.name}
								</Badge>
							</div>
						))}
				</Flex>
			</div>
			{/* </Group> */}
		</>
	);
}

export default HashTags;
