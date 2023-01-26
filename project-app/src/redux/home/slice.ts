import { createSlice } from '@reduxjs/toolkit';
import { EventState } from './state';
import { getAllEventsThunk } from './thunk';
import { Event } from './state';

// Step 1 - InitState
let event_storage = localStorage.getItem('allEvents');
console.log(event_storage);

const initEventState: EventState = {
	loading: 'idle',
	eventArr: [],
};

// Step 2 - Slice
const eventsSlice = createSlice({
	name: 'allEvents',
	initialState: initEventState,
	reducers: {},
	extraReducers: (builder) =>
		builder
			.addCase(getAllEventsThunk.pending, (state, action) => {
				state.loading = 'pending';
			})
			.addCase(getAllEventsThunk.fulfilled, (state, action) => {
				state.loading = 'succeeded';
				state.eventArr = action.payload.events;
			}),
});

// Step 3 - Action Creator
export const {} = eventsSlice.actions;

// Step 4 - Reducer
export const eventsReducer = eventsSlice.reducer;
