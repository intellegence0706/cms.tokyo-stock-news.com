import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import logger from 'redux-logger';

import sharedDataReducer from './features/sharedDataSlice';
import utilReducer from './features/utilSlice';
import loginReducer from './features/loginSlice';

export const store = configureStore({
    reducer: {
        sharedDataReducer,
        utilReducer,
        loginReducer
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: getDefaultMiddleware => getDefaultMiddleware({}).concat([logger])
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
