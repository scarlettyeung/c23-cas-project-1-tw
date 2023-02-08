import type { SpotlightAction } from '@mantine/spotlight';
// import { getAllHashTags } from '../../redux/search';
// import { useRootDispatch, useRootSelector } from '../../redux/store';
import { SearchTagType, FetchPerformerType, FetchEventDataType } from '../../utils/SearchType';
import PerformerEventSearch from './PerformerEventSearch';
import { useNavigate } from 'react-router-dom';

type propsType = {
	query: string;
	hashtagArr?: FetchPerformerType[] | FetchEventDataType[];
};

export function Search({ query, hashtagArr }: propsType) {
	// const dispatch = useRootDispatch();

	const navigate = useNavigate();

	if (query === SearchTagType.Performer && hashtagArr) {
		hashtagArr as FetchPerformerType[];
		const mappingPerformer = new Map<
			string,
			{
				id: string;
				title: string[];
				keywords: string;
				description: string;
				icon: string;
				onTrigger: () => void;
			}
		>();

		for (const data of hashtagArr) {
			const performersHashtags = data.performers_hashtags;
			for (const user of performersHashtags) {
				const performer = user.performers.users;
				if (!mappingPerformer.has(performer.uuid)) {
					mappingPerformer.set(performer.uuid, {
						id: performer.uuid,
						title: [],
						keywords: performer.username,
						description: performer.username,
						icon: performer.icon,
						onTrigger: () => {
							navigate(`/about/uuid/${performer.uuid}`, { replace: true });
						},
					});
				}
				mappingPerformer.get(performer.uuid)?.title.push(data.name);
			}
		}
		const result = Array.from(mappingPerformer.values());
		const toOneArr = result.map((item) => {
			const titleArr = item.title.toString();
			const toReturn = { ...item, title: titleArr };
			return toReturn;
		});

		return (
			<>
				<PerformerEventSearch data={toOneArr} />
			</>
		);
	} else if (query === SearchTagType.Event && hashtagArr) {
		hashtagArr as FetchEventDataType[];

		const mapEventHashtag = hashtagArr.map((TagObj) => {
			const eventData = TagObj.events_hashtags.map((data) => {
				return {
					id: `${TagObj.name}_${data.events.id}`,
					title: data.events.title,
					keywords: TagObj.name,
					description: TagObj.name,
					image: data.events.image,
					onTrigger: () => {
						navigate(`events/${data.events.id}`, { replace: true });
					},
				};
			});
			return eventData;
		});
		const toOneArr: SpotlightAction[] = mapEventHashtag.flat(2);

		return (
			<>
				<PerformerEventSearch data={toOneArr} />
			</>
		);
	}
	return <div className='SearchBox'>err</div>;
}

export default Search;
