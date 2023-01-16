import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, JWTPayload } from './state';
import { loginThunk } from '../auth/index';
import jwt_decode from 'jwt-decode';

// Step 1 - InitState
const initAuthState: AuthState = {
	isAuth: !!window.localStorage.getItem('token'),
	uuid: null,
	loading: false,
	error: undefined,
};

// Step 2 - Slice
const authSlice = createSlice({
	name: 'auth',
	initialState: initAuthState,
	reducers: {
		login: (state, action: PayloadAction<string>) => {
			console.log('reducer login');
			state.isAuth = true;
			state.uuid = action.payload;
			console.log('check action payload', action.payload);
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
				console.log('line34');
				// eslint-disable-next-line prefer-const
				let decoded: JWTPayload = jwt_decode(action.payload);
				console.log('line36');
				console.log('check decoded');
				console.log(decoded);
				state.uuid = decoded.uuid;
				state.isAuth = true;
				localStorage.setItem('token', action.payload);
			})
			.addCase(loginThunk.rejected, (state, action) => {
				console.log('line44');
				state.loading = false;
				state.error = action.payload;
			}),
});

// Step 3 - Action Creator
export const { login } = authSlice.actions;

// Step 4 - Reducer
export const authReducer = authSlice.reducer;
