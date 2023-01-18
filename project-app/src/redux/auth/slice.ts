import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, JWTPayload } from './state';
import { loginThunk, testThunk } from '../auth/index';
import jwt_decode from 'jwt-decode';

// Step 1 - InitState
const initAuthState: AuthState = {
	isAuth: !!window.localStorage.getItem('token'),
	uuid: null,
	loading: false,
	error: undefined,
	info: null,
};

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
				console.log('check decoded');
				console.log(decoded);
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
				state.info = action.payload;
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
