export enum Role {
	Performer = 'performer',
	Individual = 'individual',
	Corporate = 'corporate',
}

export interface RespType {
	message: string;
	userInfo: PerformersSettingValue | IndividualClientsSettingValue | CorporateClientsSettingValue;
}
export interface RespTypeInProfile {
	message: string;
	data: PerformanceInfo | IndividualClientsInfo | CorporateClientsInfo;
}

export interface HashTag {
	id: number;
	name: string;
}

export interface Event {
	id: number;
	title: string;
}

//// ---- part of setting page ---- ////

export interface PerformersSettingValue {
	identity: string;
	icon: string | null; //can be null
	email: string;
	username: string;
	name: string; //can be null
	contact_number: number | null; //can be null
	contact_email: string | null;
	performers_hashtags: HashTag[];
	gender: string;
	years_of_exp: number;
	birthday: Date | null; //can be null
	description: string; //can be null
	facebook_url: string; //can be null
	twitter_url: string; //can be null
	youtube_url: string; //can be null
	ig_url: string; //can be null
	events: Event[]; //can be null
	//rm one
	avgScore: number;
	sumOfEven: number;
	avg_score: number;
	sum_of_even: number;
}
export interface IndividualClientsSettingValue {
	identity: string;
	client_type: string;
	icon: string | null; //can be null
	email: string;
	username: string;
	name: string; //can be null
	contact_number: number | null; //can be null
	contact_email: string | null; //can be null
	gender: string;
	avg_score: number;
	sum_of_even: number;
	description: string; //can be null
	events: Event[] | null; //can be null
}
export interface CorporateClientsSettingValue extends IndividualClientsSettingValue {
	business_address: string;
	business_BR_no: string;
	business_website_url: string | null;
}

//// ---- part of setting page ---- ////

//// ---- part of profile page ---- ////

export interface PerformanceInfo {
	uuid: string;
	id: number;
	username: string;
	icon?: string | null;
	email: string;
	identity: string;
	years_of_exp: number;
	contact_number: number;
	gender: string;
	description?: string;
	facebook_url?: string;
	twitter_url?: string;
	youtube_url?: string;
	ig_url?: string;
	performers_hashtags: HashTag[];
	events?: Event[];
	avg_score: number;
	sum_of_even: number;
}

export interface IndividualClientsInfo {
	uuid: string;
	id: number;
	username: string;
	icon?: string | null;
	email: string;
	name: string;
	identity: string;
	contact_number: number;
	gender: string;
	description?: string;
	client_type: string;
	events?: Event[];
	avg_score: number;
	sum_of_even: number;
}
export interface CorporateClientsInfo extends IndividualClientsInfo {
	business_address: string;
	business_BR_no: string;
	business_website_url: string | null;
}
//// ---- part of profile page ---- ////

export interface PersonalData {
	userIcon: string;
	userName: string;
	gender: string;
	expYear?: number;
	clientType?: string;
	avgScore: number;
	sumOfEvent: number;
}

export interface MediaURL {
	facebook: string | null;
	twitter: string | null;
	youtube: string | null;
	ig: string | null;
}

export interface LoadingObj {
	message: string;
	data?: LoadingPersonaInfo;
}

export interface LoadingPersonaInfo {
	uuid: string;
	id: number;
	username: string;
	icon?: string;
	email: string;
	identity: string;
	performers?: LoadingPerformanceInfo;
	clients?: LoadingClientInfo;
}

export interface LoadingPerformanceInfo {
	years_of_exp: number;
	contact_number: number;
	gender: string;
	description?: string;
	facebook_url?: string;
	twitter_url?: string;
	youtube_url?: string;
	ig_url?: string;
	performers_hashtags?: HashTag[] | null;
	events?: Event[] | null;
}

export interface LoadingClientInfo {
	gender: string;
	description?: string;
	client_type: string;
	business_address?: string;
	business_BR_no?: string;
	business_website_url?: string;
	events?: Event[] | null;
}
