import { createSlice } from '@reduxjs/toolkit';
import { AccountType, AuthState, Gender, JWTPayload } from './state';
// import type { PayloadAction } from '@reduxjs/toolkit';
import { loginThunk, testThunk, performerThunk } from '../auth/index';
import jwt_decode from 'jwt-decode';

// Step 1 - InitState
let initAuthState: AuthState;
// let auth_storage = localStorage.getItem('auth');
// console.log("==============auth_storage=============");
// console.log(auth_storage);
// console.log("==============auth_storage=============");

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
			console.log('reducer logout');
			state.isAuth = false;
			localStorage.removeItem('token');
			localStorage.removeItem('uuid');
		},
		chooseType: (state, action) => {
			state.accountType = action.payload as AccountType;
		},
		allUsersP1: (state, action) => {
			state.email = action.payload;
			state.password = action.payload;
			state.password2 = action.payload;
			state.username = action.payload;
		},
		performerP2: (state, action) => {
			state.tagId = action.payload;
		},
		IndividualP2: (state, action) => {},
	},
	extraReducers: (builder) =>
		builder
			.addCase(loginThunk.pending, (state) => {
				state.loading = true;
			})
			.addCase(loginThunk.fulfilled, (state, action) => {
				state.loading = false;
				console.log('check jwt', action.payload);
				let decoded: JWTPayload = jwt_decode(action.payload);
				console.log('check decoded', decoded);
				// localStorage.setItem('token', action.payload);

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
			})
			.addCase(testThunk.pending, (state) => {
				state.loading = true;
			})
			.addCase(testThunk.fulfilled, (state, action) => {
				state.loading = false;
				console.log('fulfilled called ');
				console.log('check jwt', action.payload);
			})
			.addCase(testThunk.rejected, (state, action) => {
				state.loading = false;
			}),
	// //test
	// .addCase(performerThunk.pending, (state) => {
	// 	state.loading = true;
	// })
	// .addCase(performerThunk.fulfilled, (state, action) => {
	// 	state.loading = false;
	// 	state.accountType = action.payload as AccountType;
	// 	// state.tagId = action.payload;
	// 	state.firstName = action.payload;
	// 	state.lastName = action.payload;
	// 	state.gender = action.payload as Gender;
	// 	// state.experience = action.payload;
	// 	// state.birthday = action.payload as Date;
	// 	state.teams = action.payload;
	// 	state.descriptions = action.payload;
	// 	state.socialMediaUrl = action.payload;
	// 	console.log('register fulfilled called ');
	// 	console.log('check accType', state.accountType);
	// })
	// .addCase(performerThunk.rejected, (state, action) => {
	// 	state.loading = false;
	// 	state.error = action.payload;
	// }),
});

// Step 3 - Action Creator
export const { logout, chooseType, allUsersP1, performerP2 } = authSlice.actions;

// Step 4 - Reducer
export const authReducer = authSlice.reducer;
