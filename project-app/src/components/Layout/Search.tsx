import React, { useState, useEffect } from 'react';
import { NativeSelect, Select, TextInput } from '@mantine/core';
import '../../styles/search.css';
import { getAllHashTags } from '../../redux/search';
import { useRootDispatch, useRootSelector } from '../../redux/store';
import { IconHash } from '@tabler/icons';

const TAG_TYPE = [
	{ value: 'performer', label: 'Performers' },
	{ value: 'event', label: 'Events' },
];

export function Search() {
	const dispatch = useRootDispatch();
	const hashtagArr = useRootSelector((state) => state.search.hashtagArr);
	const [query, setQuery] = useState('performer');
	const [input, setInputText] = useState('');

	useEffect(() => {
		dispatch(getAllHashTags({ hashTags: query }));
	}, [dispatch, query]);

	const filteredHashTagArr = hashtagArr.filter(
		(hashTag) => hashTag.name.toLowerCase().indexOf(input.toLowerCase()) >= 0,
	);
	console.log(input);
	console.log(filteredHashTagArr);

	return (
		<>
			<TextInput
				type='string'
				placeholder='Pick a hashtag'
				rightSection={
					<Select data={TAG_TYPE} value={query} maxDropdownHeight={400} onChange={(v) => {}} />
				}
				rightSectionWidth={120}
				icon={<IconHash size={14} />}
				onChange={(e) => setInputText(e.target.value)}
			/>
			<Select onClick={(v) => console.log(v)} data={[]} />
		</>
	);
}

export default Search;
