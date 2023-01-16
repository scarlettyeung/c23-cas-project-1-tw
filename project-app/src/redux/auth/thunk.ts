import { createAsyncThunk } from '@reduxjs/toolkit';

export const loginThunk = createAsyncThunk<
	string,
	{ userEmail: string; userPassword: string },
	{ rejectValue: string }
>('users/login', async ({ userEmail, userPassword }, thunkAPI) => {
	try {
		const path = process.env.REACT_APP_API_BASE;
		console.log(userEmail, userPassword);
		const resp = await fetch(`${path}users/login`, {
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
		console.log(JWT_token);

		return JWT_token.data;
	} catch (error) {
		return thunkAPI.rejectWithValue('AUTH Login failed');
	}
});
