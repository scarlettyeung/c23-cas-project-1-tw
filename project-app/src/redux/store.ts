import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { AuthState, authReducer } from './auth';
import { HomeState, homeReducer } from './home';
import { TagsState, tagsReducer } from './search';
import logger from 'redux-logger';

// Step 1 - State
export interface RootState {
	auth: AuthState;
	home: HomeState;
	search: TagsState;
}

// Step 2 - Reducer (Function)
const rootReducer = { auth: authReducer, home: homeReducer, search: tagsReducer };

// Step 3 - configureStore
export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([logger]),
	devTools: process.env.NODE_ENV === 'development',
});

// Step 4 - ActionDispatch
export type RootDispatch = typeof store.dispatch;

// Step 5 - useRootSelector
export const useRootDispatch: () => RootDispatch = useDispatch;
export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;
