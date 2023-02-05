import { Badge, Title } from '@mantine/core';
import { HashTag } from '../../../utils/userInfoType';

type HashTagsProps = {
	tags: HashTag[] | null;
};
function HashTags(props: HashTagsProps) {
	return (
		<>
			<div className='EventHistory'>
				<Title order={4}>HASH TAGS</Title>
				{props.tags &&
					props.tags.map((tag) => (
						<div className='HashTagsKey'>
							<Badge size='sm' sx={{ paddingLeft: 0 }} radius='xl' key={`tag_${tag.id}`}>
								{tag.name}
							</Badge>
						</div>
					))}
			</div>
		</>
	);
}

export default HashTags;
