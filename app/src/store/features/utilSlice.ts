import { createSlice } from '@reduxjs/toolkit';

export type Message = {
    message: string;
    type: 'success' | 'warning' | 'error';
};

type utilState = {
    loading: boolean;
    messages: Message[];
};

const initialState: utilState = {
    loading: false,
    messages: []
};

export const util = createSlice({
    name: 'utils',
    initialState,
    reducers: {
        reset: () => initialState,
        loading: (state: utilState, action) => {
            const payload = action.payload;
            state.loading = payload;
        },
        appendMessage: (state: utilState, action) => {
            const payload = action.payload as Message;
            state.messages = [...state.messages, payload];
        },
        clearMessages: (state: utilState) => {
            state.messages = [];
        }
    }
});

export const { reset, loading, appendMessage, clearMessages } = util.actions;

export default util.reducer;
