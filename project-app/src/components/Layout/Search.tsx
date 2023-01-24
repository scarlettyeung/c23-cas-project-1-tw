import React, { useState } from 'react';
import { NativeSelect, TextInput } from '@mantine/core';
import '../../styles/search.css';
import { IconHash } from '@tabler/icons';

function Search() {
	// const [query, setQuery] = useState('');

	const data = [
		{ value: 'Performers', label: 'Performers' },
		{ value: 'Events', label: 'Events' },
	];

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

	// const handleOnclick = () => {
	// 	const searchTags = tags?.length > 0 && tags?.filter((u) => u?.name === Text);
	// 	setUserList(searchTags);
	// };

	return (
		<TextInput
			type='string'
			placeholder='Pick a hashtag'
			rightSection={select}
			rightSectionWidth={100}
			icon={<IconHash size={14} />}
		/>
	);
	// <div className='SearchBar'>
	// 	<input
	// 		type='text'
	// 		placeholder='Search...'
	// 		className='search'
	// 		onChange={(e) => setQuery(e.target.value)}
	// 	/>
	// 	<button disabled={!Text} onClick={handleOnclick} type='submit'>
	// 		Search
	// 	</button>
	// </div>
	// );
}

export default Search;
