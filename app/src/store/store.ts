import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import logger from 'redux-logger';

import shared_data from './features/shared_data';
import utils from './features/utils';
import login from './features/login';
import forgot_password from './features/forgot_password';
import reset_password from './features/reset_password';
import change_password from './features/change_password';
import profile from './features/profile';

export const store = configureStore({
    reducer: {
        shared_data,
        utils,
        login,
        forgot_password,
        reset_password,
        change_password,
        profile
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: getDefaultMiddleware => getDefaultMiddleware({}).concat([logger])
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
