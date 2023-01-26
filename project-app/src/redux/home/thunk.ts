import { createAsyncThunk } from '@reduxjs/toolkit';
import { Event } from './state';

export const getAllEventsThunk = createAsyncThunk<{ message: string; events: Event[] }>(
	'home',
	async (_, thunkAPI) => {
		try {
			const path = process.env.REACT_APP_API_BASE;
			const resp = await fetch(`${path}home`);
			const data = await resp.json();
			console.log('get all events!!!!!!!!!!!');
			console.dir(data);
			return data;
		} catch (error) {
			console.log(error);
			return;
		}
	},
);
