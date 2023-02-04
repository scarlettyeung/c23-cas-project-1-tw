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
	FetchEventDataType

} from '../../utils/SearchType';

import PerformerEventSearch from './PerformerEventSearch'
import { useNavigate } from 'react-router-dom';
import Logout from '../Logout';


export function Search() {
	const dispatch = useRootDispatch();
	const hashtagArr = useRootSelector<FetchPerformerType[] | FetchEventDataType[]>((state) => state.search.hashtagArr);
	const [query, setQuery] = useState<string>('performer');
	const navigate = useNavigate();
	useEffect(() => {
		dispatch(getAllHashTags({ hashTags: query }));
	}, [dispatch, query]);

	if (query === SearchTagType.Performer) {
		hashtagArr as FetchPerformerType[]
		const mapPerformerHashtag = hashtagArr.map((TagObj, idx) => {
			const performerData = TagObj.performers_hashtags.map((data, idx2) => {
				return (
					{
						id: data.performers.users.uuid,
						title: TagObj.name,
						keywords: TagObj.name,
						description: data.performers.users.username,
						image: data.performers.users.icon,
						onTrigger: () => {
							navigate(`/about/uuid/${data.performers.users.uuid}`, { replace: true })
						}
					}
				)
			})
			return performerData
		})
		const toOneArr: SpotlightAction[] = (mapPerformerHashtag.flat(2))
		return (<Group>
			<PerformerEventSearch data={toOneArr} />
			<Select
				placeholder='Pick one'
				data={tagType}
				value={query}
				maxDropdownHeight={400}
				onChange={(v) => {
					if (v) {
						setQuery(v)
						console.log(query)
					}
				}}
			/>
			<Logout />
		</Group>)

	} else if (query === SearchTagType.Event) {
		hashtagArr as FetchEventDataType[]
		console.log(hashtagArr)
		const mapEventHashtag = hashtagArr.map((TagObj, idx) => {
			const eventData = TagObj.events_hashtags.map((data, idx2) => {
				return (
					{
						id: `${TagObj.name}_${data.events.id}`,
						title: data.events.title,
						keywords: TagObj.name,
						image: data.events.image,
						onTrigger: () => {
							navigate(`events/${data.events.id}`, { replace: true })
						}
					}
				)
			})
			return eventData
		})
		const toOneArr: SpotlightAction[] = (mapEventHashtag.flat(2))
		return (<Group>
			<PerformerEventSearch data={toOneArr} />
			<Select
				placeholder='Pick one'
				data={tagType}
				value={query}
				maxDropdownHeight={400}
				onChange={(v) => {
					if (v) {
						setQuery(v)
						console.log(query)
					}
				}}
			/>
			<Logout />
		</Group>)
	}



	// } else if (query === SearchTagType.Event) {

	// }






	// const theSearch = () => {
	// 	if (query === SearchTagType.Performer) {
	// 		return (<>123312</>)
	// 	} else if (query === SearchTagType.Event) {
	// 		return (<>q231</>)
	// 	}
	// }


	return (
		<>

			<Select
				placeholder='Pick one'
				data={tagType}
				value={query}
				maxDropdownHeight={400}
				onChange={(v) => {
					if (v) {
						setQuery(v)
						console.log(query)
					}
				}}
			/>
			{/* <Group>
				<SpotlightControl />
				<Select
					placeholder='Pick one'
					data={tagType}
					value={query}
					maxDropdownHeight={400}
					onChange={(v) => {
						if (v) {
							setQuery(v)
							console.log(query)
						}
					}}
				/>
			</Group> */}
			{/* {theSearch()} */}

			{/* <Select
				label="Choose employee of the month"
				placeholder="Find Performance"
				itemComponent={SelectItem}
				data={query}
				searchable
				maxDropdownHeight={400}
				nothingFound="Nobody here"
				filter={(value, item) =>
					item.label.toLowerCase().includes(value.toLowerCase().trim()) ||
					item.description.toLowerCase().includes(value.toLowerCase().trim())
				}
			/> */}
			{/* <TextInput
				type='string'
				placeholder='Pick a hashtag'
				rightSection={
	
				}
				rightSectionWidth={120}
				icon={<IconHash size={14} />}
				onChange={(e) => setInputText(e.target.value)}
			/> */}
			{/* <Select
				label='Your favorite framework/library'
				placeholder='Pick one'
				data={filteredHashTagArr}
			/> */}
		</>
	);
}

export default Search;



// function Demo() {
//
// }