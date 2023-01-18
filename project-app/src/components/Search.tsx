import { taggedTemplateExpression } from '@babel/types';
import React, { useState } from 'react';
import '../styles/search.css';

function Search() {
	const [query, setQuery] = useState('');
	const tags = [
		{ id: 1, name: 'Singer' },
		{ id: 2, name: 'DJ' },
		{ id: 3, name: 'Musician' },
		{ id: 4, name: 'Juggling' },
		{ id: 5, name: 'Dancer' },
		{ id: 6, name: 'Mime' },
		{ id: 7, name: 'Emcee(MC)' },
		{ id: 8, name: 'Comedian' },
		{ id: 9, name: 'clowning' },
		{ id: 10, name: 'magician ' },
	];

	return (
		<div className='app'>
			<input
				type='text'
				placeholder='Search...'
				className='search'
				onChange={(e) => setQuery(e.target.value)}
			/>

			<table className='list'>
				<tbody>
					<tr>
						<th>Tags Name</th>
					</tr>
					{tags
						.filter((tags) => tags.name.toLowerCase().includes(query))
						.map((tag) => (
							<tr key={tag.id}>
								<td>{tag.name}</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
}

export default Search;
