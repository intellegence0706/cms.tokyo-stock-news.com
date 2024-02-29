import { createSlice } from '@reduxjs/toolkit';

type MeState = {
    item: {
        form: {
            email: string;
            password: string;
        };
        error: any;
    };
};

const initialState: MeState = {
    item: {
        form: {
            email: '',
            password: ''
        },
        error: {}
    }
};

export const slice = createSlice({
    name: 'me_data',
    initialState,
    reducers: {
        reset: () => initialState,
        clearCurrentItem: (state: MeState) => {
            state.item = initialState.item;
        },
        setCurrentItem: (state: MeState, action) => {
            state.item = {
                ...state.item,
                form: action.payload
            };
        },
        setCurrentItemValue: (state: MeState, action) => {
            state.item = {
                ...state.item,
                form: {
                    ...state.item.form,
                    ...action.payload
                }
            };
        },
        setError: (state: MeState, action) => {
            state.item = {
                ...state.item,
                error: action.payload
            };
        }
    }
});

export const { reset, clearCurrentItem, setCurrentItem, setCurrentItemValue, setError } = slice.actions;

export default slice.reducer;
