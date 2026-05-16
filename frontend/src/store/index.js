import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import authReducer from './authSlice';
import { api } from './api';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        auth: authReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});
