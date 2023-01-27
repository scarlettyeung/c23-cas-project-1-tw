import { createSlice } from '@reduxjs/toolkit';
import { HomeState } from './state';
import { getAllDataThunk } from './thunk';
import { Event, Performer } from './state';

// Step 1 - InitState
let auth_storage = localStorage.getItem('auth');
const initHomeState: HomeState = {
	loading: 'idle',
	eventArr: [],
	performersArr: [],
};

// Step 2 - Slice
const homeSlice = createSlice({
	name: 'allData',
	initialState: initHomeState,
	reducers: {},
	extraReducers: (builder) =>
		builder
			.addCase(getAllDataThunk.pending, (state, action) => {
				state.loading = 'pending';
			})
			.addCase(getAllDataThunk.fulfilled, (state, action) => {
				state.loading = 'succeeded';
				state.eventArr = action.payload.events;
				state.performersArr = action.payload.performers;
			}),
});

// Step 3 - Action Creator
export const {} = homeSlice.actions;

// Step 4 - Reducer
export const homeReducer = homeSlice.reducer;
