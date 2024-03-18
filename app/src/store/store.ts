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
import user from './features/user';
import customer from './features/customer';
import memo from './features/memo';
import user_analysis from './features/user_analysis';
import mail_template from './features/mail_template';
import mail from './features/mail';

export const store = configureStore({
    reducer: {
        shared_data,
        utils,
        login,
        forgot_password,
        reset_password,
        change_password,
        profile,
        user,
        customer,
        memo,
        user_analysis,
        mail_template,
        mail
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: getDefaultMiddleware => getDefaultMiddleware({}).concat([logger])
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
