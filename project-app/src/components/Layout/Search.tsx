import { useState, useEffect } from 'react';
import type { SpotlightAction } from '@mantine/spotlight';
import { Group, Select } from '@mantine/core';
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
			<Group className='SearchBox'>
				<PerformerEventSearch data={toOneArr} />
				<Select
					className='TagPicker'
					data={tagType}
					value={query}
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
			<Group className='SearchBox'>
				<PerformerEventSearch data={toOneArr} />
				<Select
					data={tagType}
					value={query}
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
		<div className='SearchBox'>
			<Select
				data={tagType}
				value={query}
				onChange={(v) => {
					if (v) {
						setQuery(v);
						console.log(query);
					}
				}}
			/>
		</div>
	);
}

export default Search;
