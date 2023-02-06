import { createSlice } from '@reduxjs/toolkit';
import { AuthState, JWTPayload } from './state';
import { loginThunk } from '../auth/index';
import jwt_decode from 'jwt-decode';

// Step 1 - InitState
let initAuthState: AuthState;

let decodedToken: JWTPayload;
if (window.localStorage.getItem('token')) {
	const getToken = window.localStorage.getItem('token')!;
	decodedToken = jwt_decode(getToken);

	initAuthState = {
		isAuth: !!decodedToken,
		loading: false,
		username: decodedToken!.username,
		uuid: decodedToken!.uuid,
		id: decodedToken!.id,
		performerId: decodedToken!.performerId,
		clientId: decodedToken!.clientId,
		identity: decodedToken!.identity,
		exp: decodedToken!.exp,
		error: undefined,
	};
} else {
	initAuthState = {
		isAuth: false,
		loading: false,
		username: undefined,
		uuid: undefined,
		id: undefined,
		performerId: undefined,
		clientId: undefined,
		identity: undefined,
		exp: undefined,
		error: undefined,
	};
}
// Step 2 - Slice
const authSlice = createSlice({
	name: 'auth',
	initialState: initAuthState,
	reducers: {
		logout: (state) => {
			state.isAuth = false;
			localStorage.removeItem('token');
			localStorage.removeItem('uuid');
		},
		chooseType: (state, action) => {
			state.accountType = action.payload;
		},
		checkPswValidation: (state, action) => {
			state.password = action.payload;
		},

		checkHashValidation: (state, action) => {
			state.hashTagArr = action.payload;
		},
		checkEmailValidation: (state, action) => {
			state.email = action.payload;
		},
	},
	extraReducers: (builder) =>
		builder
			.addCase(loginThunk.pending, (state) => {
				state.loading = true;
			})
			.addCase(loginThunk.fulfilled, (state, action) => {
				state.loading = false;
				let decoded: JWTPayload = jwt_decode(action.payload);

				state.uuid = decoded.uuid;
				state.username = decoded.username;
				state.id = decoded.id;
				state.performerId = decoded.performerId;
				state.clientId = decoded.clientId;
				state.identity = decoded.identity;
				state.exp = decoded.exp;
				state.isAuth = true;
				localStorage.setItem('token', action.payload);
				localStorage.setItem('uuid', state.uuid);
			})
			.addCase(loginThunk.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			}),
});

// Step 3 - Action Creator
export const { logout, chooseType, checkPswValidation, checkHashValidation, checkEmailValidation } =
	authSlice.actions;

// Step 4 - Reducer
export const authReducer = authSlice.reducer;
