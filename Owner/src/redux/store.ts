import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './slice.ts';
import authReducer from './authSlice.ts'
import classReducer from './classSlice.ts'
// Example reducer (replace with your actual reducers)

const store = configureStore({
    reducer: {
        example: dataReducer,
        auth:authReducer,
        class:classReducer
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;