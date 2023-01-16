import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from './state';

// Step 1 - InitState
const initAuthState: AuthState = {
	isAuth: false,
	userEmail: null,
};

// Step 2 - Slice
const authSlice = createSlice({
	name: 'auth',
	initialState: initAuthState,
	reducers: {
		login: (state, action: PayloadAction<string>) => {
			console.log('reducer login');
			state.isAuth = true;
			state.userEmail = action.payload;
		},
	},
});

// Step 3 - Action Creator
export const { login } = authSlice.actions;

// Step 2 - Reducer
export const authReducer = authSlice.reducer;
