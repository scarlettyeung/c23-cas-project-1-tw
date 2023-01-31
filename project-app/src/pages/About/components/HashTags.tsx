// import React, { useState, useEffect } from 'react'
import { HashtagData } from '../index';
type HashTagsProps = {
	tags: HashtagData[] | null;
	// setHashtags: void =>{}
};
function HashTags(info: HashTagsProps) {
	const tags = info.tags;

	return <div>{tags && tags.map((tag) => <div key={tag.id}>{tag.name}</div>)}</div>;
}

export default HashTags;
