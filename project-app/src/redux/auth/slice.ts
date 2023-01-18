import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, JWTPayload } from './state';
import { loginThunk, testThunk } from '../auth/index';
import jwt_decode from 'jwt-decode';

// Step 1 - InitState
let initAuthState: AuthState;
let auth_storage = localStorage.getItem('auth');
console.log(auth_storage);

initAuthState = {
	isAuth: !!window.localStorage.getItem('token'),
	loading: false,
	username: undefined,
	uuid: undefined,
	identity: undefined,
	exp: undefined,
	error: undefined,
};
// if (auth_storage){
// 	 initAuthState = JSON.parse(auth_storage)
// }else{
// }
// Step 2 - Slice
const authSlice = createSlice({
	name: 'auth',
	initialState: initAuthState,
	reducers: {
		logout: () => {
			console.log('reducer logout');
			localStorage.removeItem('token');
		},
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
				localStorage.setItem('token', action.payload);
				state.uuid = decoded.uuid;
				state.username = decoded.uuid;
				state.identity = decoded.identity;
				state.exp = decoded.exp;
				state.isAuth = true;
				localStorage.setItem('token', action.payload);
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
});

// Step 3 - Action Creator
export const { logout } = authSlice.actions;

// Step 4 - Reducer
export const authReducer = authSlice.reducer;
