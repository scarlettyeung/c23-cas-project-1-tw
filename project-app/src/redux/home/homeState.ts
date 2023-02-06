export interface HomeState {
	loading: 'idle' | 'pending' | 'succeeded' | 'failed';
	eventArr: Event[];
	performersArr: Performer[];
}

export enum Status {
	Completed = 'completed',
	Expired = 'expired',
	Valid = 'valid',
}

export enum Properties {
	Public = 'public',
	Private = 'private',
}

export interface Event {
	error?: string;
	id: number;
	title: string;
	image?: string | null;
	description?: string | null;
	performers_id?: string | null;
	clients_id: number;
	wage_offer: number;
	start_date: Date;
	end_date: Date;
	location: string;
	events_hashtags?: string;
	hashtag_details?: string;
	status: Status;
	is_shown: boolean;
	date_published: Date;
}

export interface Performer {
	id: number;
	uuid: string;
	username: string;
	icon?: string;
}
