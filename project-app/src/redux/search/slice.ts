import { createSlice } from '@reduxjs/toolkit';
import { TagsState } from './state';
import { getAllHashTags } from './thunk';

// Step 1 - InitState
const initTagsState: TagsState = {
	loading: 'idle',
	hashtagArr: [],
};

// Step 2 - Slice
const tagsSlice = createSlice({
	name: 'allTags',
	initialState: initTagsState,
	reducers: {},
	extraReducers: (builder) =>
		builder
			.addCase(getAllHashTags.pending, (state, action) => {
				state.loading = 'pending';
			})
			.addCase(getAllHashTags.fulfilled, (state, action) => {
				state.loading = 'succeeded';
				state.hashtagArr = action.payload.hashtags;
			}),
});

// Step 3 - Action Creator
// export const {} = tagsSlice.actions;

// Step 4 - Reducer
export const tagsReducer = tagsSlice.reducer;
