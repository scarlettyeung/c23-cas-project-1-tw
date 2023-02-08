import { Badge, Title, Flex } from '@mantine/core';
import { HashTag } from '../../../utils/userInfoType';

type HashTagsProps = {
	tags: HashTag[] | null;
};
function HashTags(props: HashTagsProps) {
	return (
		<>
			<div className='about__hashtags__eventHistory'>
				<Title align='center' order={4}>
					HASH TAGS
				</Title>

				<Flex mih={50} gap='xs' justify='center' align='center' direction='row' wrap='wrap'>
					{props.tags &&
						props.tags.map((tag) => (
							<div className='about__hashtags__hashTagsKey' key={`userTag_${tag.id}`}>
								<Badge size='sm' sx={{ paddingLeft: 0 }} radius='xl' key={`tag_${tag.id}`}>
									{tag.name}
								</Badge>
							</div>
						))}
				</Flex>
			</div>
		</>
	);
}

export default HashTags;
