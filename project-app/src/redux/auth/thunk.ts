import { createAsyncThunk } from '@reduxjs/toolkit';

export const loginThunk = createAsyncThunk<
	string,
	{ userEmail: string; userPassword: string },
	{ rejectValue: string }
>('users/login', async ({ userEmail, userPassword }, thunkAPI) => {
	try {
		const path = process.env.REACT_APP_API_BASE;
		const resp = await fetch(`${path}/users/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: userEmail,
				password: userPassword,
			}),
		});

		const JWT_token = await resp.json();

		return JWT_token.data;
	} catch (error) {
		return thunkAPI.rejectWithValue('AUTH Login failed');
	}
});

export const testThunk = createAsyncThunk<{ rejectValue: string }>(
	'users/forTest',
	async (_, thunkAPI) => {
		try {
			const path = process.env.REACT_APP_API_BASE;
			const jwt = localStorage.getItem('token');
			const resp = await fetch(`${path}/users/forTest`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${jwt}`,
				},
				body: JSON.stringify({}),
			});
			const data = await resp.json();
			return data;
		} catch (error) {
			return;
		}
	},
);
