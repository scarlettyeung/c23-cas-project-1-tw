import { Badge } from '@mantine/core';
import React, { FormEvent, useEffect, useState } from 'react';
import '../../../../styles/register.css';
export type PerformerHashData = {
	tagId: number;
	name: string;
};
type IdProps = {
	tagId: number[] | null;
};

type UserFormProps = Omit<IdProps, 'name'> & {
	updateFields: (fields: Partial<Omit<IdProps, 'name'>>) => void;
};

function PerformerHash({ tagId, updateFields }: UserFormProps) {
	const [tags, setTags] = useState<PerformerHashData[]>([]);
	const [ids, setIds] = useState<number[]>([]);

	useEffect(() => {
		async function getAllTags() {
			const path = process.env.REACT_APP_API_BASE;
			let data = await fetch(`${path}users/getPerformerHashtag`);
			let result = await data.json();
			return setTags(
				result.map((r: { name: string; id: number }) => ({ name: r.name, tagId: r.id })),
			);
		}
		getAllTags();
	}, []);

	return (
		<div>
			<div style={{ fontSize: 25, marginBottom: 20 }}>Choose upto 5 hashtags</div>

			{tags.map((tag) => (
				<Badge
					key={tag.tagId}
					onClick={(e) => {
						let arr = [...ids];
						if (arr.includes(tag.tagId)) {
							arr = arr.filter((idd) => idd !== tag.tagId);
						} else if (arr.length < 5) {
							arr.push(tag.tagId);
						}
						setIds(arr);

						updateFields({ tagId: arr });
						tagId = arr;
					}}
					className={tagId?.includes(tag.tagId) ? 'tagStyle2' : 'tagStyle'}
				>
					{tag.name}
				</Badge>
			))}
		</div>
	);
}

export default PerformerHash;
