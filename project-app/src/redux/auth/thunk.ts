import { createAsyncThunk } from '@reduxjs/toolkit';
// import { AuthState } from './state';
// createAsyncThunk<token(???), pass in, reject>
// (action name, function)
// function::
//(__ , thunkAPI)=>{}
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

		return JWT_token.data;
	} catch (error) {
		return thunkAPI.rejectWithValue('AUTH Login failed');
	}
});
//type err
export const testThunk = createAsyncThunk<{ rejectValue: string }>(
	'users/forTest',
	async (_, thunkAPI) => {
		try {
			const path = process.env.REACT_APP_API_BASE;
			const jwt = localStorage.getItem('token');
			console.log('check JWT token', jwt);
			const resp = await fetch(`${path}users/forTest`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${jwt}`,
				},
				body: JSON.stringify({}),
			});
			const data = await resp.json();
			console.log(data.message);
			return data;
		} catch (error) {
			console.log(error);
			return;
		}
	},
);
