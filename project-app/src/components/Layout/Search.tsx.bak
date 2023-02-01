import React, { useState, useEffect } from 'react';
import { NativeSelect, Select, TextInput } from '@mantine/core';
import '../../styles/search.css';
import { getAllHashTags } from '../../redux/search';
import { useRootDispatch, useRootSelector } from '../../redux/store';
import { IconHash } from '@tabler/icons';

export function Search() {
	const dispatch = useRootDispatch();
	const hashtagArr = useRootSelector((state) => state.search.hashtagArr);
	const [query, setQuery] = useState('1');
	const [input, setInputText] = useState('');
	const [hashTags, setHashtags] = useState<any[]>([]);

	let newPerformersHashtags = hashtagArr
		.map((e) => e.performers_hashtags?.map((tag) => tag.performers_id))
		.flat()
		.reduce((pv: any[], cv) => {
			return pv.filter((e) => e.value === cv).length > 0 ? pv : [...pv, { value: cv, label: cv }];
		}, []);
	console.log({ newPerformersHashtags });

	let newEventsHashtags = hashtagArr
		.map((e) => e.events_hashtags?.map((tag) => tag.events_id))
		.flat()
		.reduce((pv: any[], cv) => {
			return pv.filter((e) => e.value === cv).length > 0 ? pv : [...pv, { value: cv, label: cv }];
		}, []);
	console.log({ newEventsHashtags });

	useEffect(() => {
		dispatch(getAllHashTags({ hashTags: 'performer', name: 'Singer' }));
		console.log(hashtagArr);
	}, [dispatch]);

	const data = [
		{ value: '1', label: 'Performers' },
		{ value: '2', label: 'Events' },
	];

	let inputText = (e: any) => {
		var lowerCase = e.target.value.toLowerCase();
		setInputText(lowerCase);
	};

	const select = (
		<NativeSelect
			data={data}
			styles={{
				input: {
					fontWeight: 500,
					borderTopLeftRadius: 10,
					borderBottomLeftRadius: 10,
				},
			}}
		/>
	);

	return (
		<>
			<TextInput
				type='string'
				placeholder='Pick a hashtag'
				rightSection={
					<Select
						data={data}
						value={query}
						maxDropdownHeight={400}
						onChange={(v) => {
							if (v == '1') setHashtags(newPerformersHashtags);
							else setHashtags(newEventsHashtags);
						}}
					/>
				}
				rightSectionWidth={120}
				icon={<IconHash size={14} />}
			/>
			<Select
				onClick={(v) => {
					console.log(v);
				}}
				data={hashTags}
			/>
		</>
	);
}

export default Search;
