import React from 'react';
interface PageInfo {
	id: number;
	title: string;
	pageName: string;
	pageStyle: string;
}
interface PageDetial {
	id: number;
	title: string;
	pageName: string;
	pageStyle: string;
}
type props = {
	pageInfo: PageInfo[];
	// pageDetial:
};

function Tag(props: props) {
	return <div>Tag</div>;
}

export default Tag;
