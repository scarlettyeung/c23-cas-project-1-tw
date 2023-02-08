import { createAsyncThunk } from '@reduxjs/toolkit';
import { Event, Performer } from './homeState';

export const getAllDataThunk = createAsyncThunk<{
	message: string;
	events: Event[];
	performers: Performer[];
}>('home', async (_, _thunkAPI) => {
	try {
		console.log('find data');
		const path = process.env.REACT_APP_API_BASE;
		const jwt = localStorage.getItem('token');
		const resp = await fetch(`${path}/home`, {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		});
		const data = await resp.json();

		return data;
	} catch (error) {
		return;
	}
});
