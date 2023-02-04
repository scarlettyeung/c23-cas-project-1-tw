export enum ItemType {
	video = 'video',
	image = 'image',
	text = 'text',
}
export type PageContent = {
	id: number;
	type: string;
	content1: string;
	content2: string;
	content3: string;
};
export type MediaPropsType = {
	// pageStyleName: string;
	// mediaContentsStyle: string;
	contents: PageContent[];
};
export type PropsDownType = {
	pageName: string;
	pageDetail: PageContent[][];
	pageStyle: string[];
};
export type PageInfo = {
	id: number;
	title: string;
	pageName: string;
	pageStyle: string;
};
export type PropsDownAllData = {
	pageInfo: PageInfo[];
	pageDetail: PageContent[][];
};

export interface EporfileResDataType {
	message: string;
	eProfileInfo: string;
}
export interface EporfileDataType {
	header: Header;
	page: PageDetail[];
}

interface Header {
	iconPosition: string;
	iconName: string;
	backgroundImage: string;
	colorStyle: string;
	displayTab: string;
	userName: string;
	title: string;
	introduction: string;
	contactNumber: string;
	contactEmail: string;
}

interface PageDetail {
	page: number;
	pageTitle: string;
	pageName: string;
	style: string;
	mainColor: string;
	contentsOrMedia: ContentsOrMedia[];
}

interface ContentsOrMedia {
	id: number;
	type: string;
	content1: string;
	content2: string;
	content3: string;
}
