export interface HomeState {
	eventArr: Event[];
	performersArr: Performer[];
	loading: 'idle' | 'pending' | 'succeeded' | 'failed';
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
	id: number;
	error?: string;
	performers_id?: string | null;
	clients_id: number;
	title: string;
	wage_offer: number;
	start_date: Date;
	end_date: Date;
	start_time: Date;
	end_time: Date;
	image?: string | null;
	venue_image_name?: string | null;
	description?: string | null;
	location: string;
	status: Status;
	rehearsal_needed?: boolean | null;
	properties: Properties;
	is_shown: boolean;
	date_published: Date;
	reviews?: string | null;
	events_hashtags?: string | null;
	hashtag_details?: string | null;
}

export interface Performer {
	id: number;
	uuid: string;
	username: string;
	icon?: string;
}
