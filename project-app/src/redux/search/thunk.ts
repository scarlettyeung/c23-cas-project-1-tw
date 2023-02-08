import { createAsyncThunk } from '@reduxjs/toolkit';
import { HashTags } from './state';

export const getAllHashTags = createAsyncThunk<
	{ message: string; hashtags: HashTags[] },
	{ hashTags: string; name?: string }
>('hashtags', async ({ hashTags, name }, thunkAPI) => {
	try {
		const path = process.env.REACT_APP_API_BASE;
		const jwt = localStorage.getItem('token');
		let url = `${path}/home/hashtags?tag_type=${hashTags}`;
		if (name) {
			url += `&tag_name=${name}`;
		}
		console.log(url);
		const resp = await fetch(url, {
			headers: { Authorization: `Bearer ${jwt}` },
		});
		const data = await resp.json();
		return data;
	} catch (error) {
		return;
	}
});
