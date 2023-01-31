import { createAsyncThunk } from '@reduxjs/toolkit';
import { HashTags } from './state';

export const getAllHashTags = createAsyncThunk<
	{
		message: string;
		hashtags: HashTags[];
	},
	{ hashTags: string; name: string }
>('hashtags', async ({ hashTags, name }, thunkAPI) => {
	try {
		const path = process.env.REACT_APP_API_BASE;
		const jwt = localStorage.getItem('token');
		const resp = await fetch(`${path}home/hashtags?tag_type=${hashTags}&tag_name=${name}`, {
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		});
		const data = await resp.json();
		console.log('get all hashtags!!!!!!!!!!!');
		console.dir(data);
		return data;
	} catch (error) {
		console.log(error);
		return;
	}
});
