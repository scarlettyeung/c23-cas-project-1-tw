export interface AuthState {
	isAuth: boolean;
	loading: boolean;
	username?: string;
	uuid?: string | null;
	identity?: string | null;
	exp?: Date | string;
	error?: string | undefined;
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
