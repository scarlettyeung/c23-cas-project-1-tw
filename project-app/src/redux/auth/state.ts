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
export interface AuthState {
	isAuth: boolean;
	loading: boolean;
	username?: string;
	uuid?: string | null;
	identity?: string | null;
	exp?: Date | string;
	error?: string | undefined;
	//register
	accountType?: AccountType | null;
	email?: string | null;
	password?: string | null;
	password2?: string | null;
	//performer
	tagId?: number | null;
	firstName?: string | null;
	lastName?: string | null;
	gender?: Gender | null;
	experience?: number | null;
	birthday?: Date | null;
	contact?: number | null;
	teams?: string | null;
	descriptions?: string | null;
	socialMediaUrl?: string | null;
}

export interface JWTPayload {
	uuid: string;
	username: string;
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
