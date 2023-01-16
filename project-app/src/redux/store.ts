import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { AuthState, authReducer } from './auth';
import logger from 'redux-logger';

// Step 1 - State
export interface RootState {
	auth: AuthState;
}

// Step 2 - Reducer (Function)
const rootReducer = { auth: authReducer };

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
