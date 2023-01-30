import { createAsyncThunk } from '@reduxjs/toolkit';
import { Event, Performer } from './state';

export const getAllDataThunk = createAsyncThunk<{
	message: string;
	events: Event[];
	performers: Performer[];
}>('home', async (_, _thunkAPI) => {
	try {
		const path = process.env.REACT_APP_API_BASE;
		const jwt = localStorage.getItem('token');
		const resp = await fetch(`${path}home`, {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		});
		const data = await resp.json();
		console.dir(data);
		return data;
	} catch (error) {
		console.log(error);
		return;
	}
});
