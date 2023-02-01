export enum AccountType {
	Performer = 'performer',
	Client = 'individual',
	CorporateClient = 'corporate',
}
export enum Gender {
	Male = 'male',
	Female = 'female',
	Other = 'other',
}

export enum Identity {
	Performer = 'performer',
	Client = 'client',
}
export interface AuthState {
	isAuth: boolean;
	loading?: boolean;
	username?: string;
	uuid?: string;
	id?: number;
	performerId?: number | null;
	clientId?: number | null;
	identity?: Identity | string;
	exp?: Date | string;
	error?: string | undefined;
	//register
	accountType?: AccountType | null;
	email?: string | null;
	password?: string | null;
	hashTagArr?: string[] | null;
	// password2?: string | null;
	//performer
	// tagId?: number[] | null;
	// firstName?: string | null;
	// lastName?: string | null;
	// gender?: Gender | null;
	// experience?: number | null;
	// birthday?: Date | null;
	// contact?: number | null;
	// description?: string | null;
	// facebookURL: string | null;
	// twitterURL: string | null;
	// youtubeURL: string | null;
	// igURL: string | null;
}

export interface JWTPayload {
	uuid: string;
	username: string;
	id: number;
	performerId?: number | null;
	clientId?: number | null;
	identity: string;
	exp: Date;
}

// const payload = {
// 	uuid: user.uuid,
// 	username: user.username,
// 	identity: user.identity,
// 	exp: exp,
// };

// export interface RegisterState {
// 	accountType?: AccountType | null;
// }
