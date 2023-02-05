import { useState, useEffect } from 'react';
import type { SpotlightAction } from '@mantine/spotlight';
// import { Select } from '@mantine/core';
import { Group, Select } from '@mantine/core';
import '../../styles/search.css';
import { getAllHashTags } from '../../redux/search';
import { useRootDispatch, useRootSelector } from '../../redux/store';

import {
	tagType,
	SearchTagType,
	FetchPerformerType,
	FetchEventDataType,
} from '../../utils/SearchType';

import PerformerEventSearch from './PerformerEventSearch';
import { useNavigate } from 'react-router-dom';
import Logout from '../Logout';

export function Search() {
	const dispatch = useRootDispatch();
	const hashtagArr = useRootSelector<FetchPerformerType[] | FetchEventDataType[]>(
		(state) => state.search.hashtagArr,
	);
	const [query, setQuery] = useState<string>('performer');
	const navigate = useNavigate();
	useEffect(() => {
		dispatch(getAllHashTags({ hashTags: query }));
	}, [dispatch, query]);

	if (query === SearchTagType.Performer) {
		hashtagArr as FetchPerformerType[];
		const mapPerformerHashtag = hashtagArr.map((TagObj) => {
			const performerData = TagObj.performers_hashtags.map((data) => {
				return {
					id: data.performers.users.uuid,
					title: TagObj.name,
					keywords: TagObj.name,
					description: data.performers.users.username,
					image: data.performers.users.icon,
					onTrigger: () => {
						navigate(`/about/uuid/${data.performers.users.uuid}`, { replace: true });
					},
				};
			});
			return performerData;
		});
		const toOneArr: SpotlightAction[] = mapPerformerHashtag.flat(2);
		return (
			<Group>
				<PerformerEventSearch data={toOneArr} />
				<Select
					placeholder='Pick one'
					data={tagType}
					value={query}
					maxDropdownHeight={400}
					onChange={(v) => {
						if (v) {
							setQuery(v);
							console.log(query);
						}
					}}
				/>
				<Logout />
			</Group>
		);
	} else if (query === SearchTagType.Event) {
		hashtagArr as FetchEventDataType[];
		console.log(hashtagArr);
		const mapEventHashtag = hashtagArr.map((TagObj) => {
			const eventData = TagObj.events_hashtags.map((data) => {
				return {
					id: `${TagObj.name}_${data.events.id}`,
					title: data.events.title,
					keywords: TagObj.name,
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
			<Group>
				<PerformerEventSearch data={toOneArr} />
				<Select
					placeholder='Pick one'
					data={tagType}
					value={query}
					maxDropdownHeight={400}
					onChange={(v) => {
						if (v) {
							setQuery(v);
							console.log(query);
						}
					}}
				/>
				<Logout />
			</Group>
		);
	}

	return (
		<>
			<Select
				placeholder='Pick one'
				data={tagType}
				value={query}
				maxDropdownHeight={400}
				onChange={(v) => {
					if (v) {
						setQuery(v);
						console.log(query);
					}
				}}
			/>
		</>
	);
}

export default Search;
