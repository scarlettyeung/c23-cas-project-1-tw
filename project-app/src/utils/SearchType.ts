export const tagType = [
	{ value: 'performer', label: 'Performers' },
	{ value: 'event', label: 'Events' },
];

export enum SearchTagType {
	Performer = 'performer',
	Event = 'event',
}
export interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
	tagName: string;
	performerUserName: string;
	performerUserImage: string;
	onTrigger: () => void;
}

export interface FetchPerformerType {
	name: string;
	performers_hashtags: PerformerDataType[];
	events_hashtags: EventDataType[];
}

interface PerformerDataType {
	performers_id: number;
	performers: User;
}
interface User {
	users: PerformersInfo;
}
export interface PerformersPropsInfo {
	tagName: string;
	performerUserName: string;
	performerUserImage: string;
	onTrigger: () => void;
}

interface PerformersInfo {
	id: number;
	icon: string;
	username: string;
	uuid: string;
}

export interface FetchEventDataType {
	name: string;
	events_hashtags: EventDataType[];
	performers_hashtags: PerformerDataType[];
}

export interface EventDataType {
	events_id: number;
	events: EventsHashtag;
}

interface EventsHashtag {
	id: number;
	image: string;
	title: string;
	venue_image_name?: string;
}
