import React, { useState, useEffect } from 'react';
import { HashTag } from '../../../utils/userInfoType';
type HashTagsProps = {
	tags: HashTag[] | null;
	// setHashtags: void =>{}
};
function HashTags(props: HashTagsProps) {
	return (
		<div>{props.tags && props.tags.map((tag) => <div key={`tag_${tag.id}`}>{tag.name}</div>)}</div>
	);
}

export default HashTags;
