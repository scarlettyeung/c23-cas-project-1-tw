export interface AuthState {
	isAuth: boolean;
	uuid: string | null;
	loading: boolean;
	error: string | undefined;
	info: any;
}

export interface JWTPayload {
	username: string;
	uuid: string;
	identity: string;
	exp: Date;
}
