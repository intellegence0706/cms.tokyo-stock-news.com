import { createSlice } from '@reduxjs/toolkit';

type State = {
    item: {
        form: {
            last_name: string;
            first_name: string;
            last_name_furi: string;
            first_name_furi: string;
            email: string;
            phone: string;
            role: number;
            is_allowed: boolean;
        };
        errors: any;
    };
};

const initialState: State = {
    item: {
        form: {
            last_name: '',
            first_name: '',
            last_name_furi: '',
            first_name_furi: '',
            email: '',
            phone: '',
            role: 0,
            is_allowed: true
        },
        errors: {}
    }
};

export const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        reset: () => initialState,
        clearCurrentItem: (state: State) => {
            state.item = initialState.item;
        },
        setCurrentItem: (state: State, action) => {
            state.item = {
                ...state.item,
                form: action.payload
            };
        },
        setCurrentItemValue: (state: State, action) => {
            state.item = {
                ...state.item,
                form: {
                    ...state.item.form,
                    ...action.payload
                }
            };
        },
        setError: (state: State, action) => {
            state.item = {
                ...state.item,
                errors: action.payload
            };
        },
        clearError: (state: State) => {
            state.item = {
                ...state.item,
                errors: {}
            };
        }
    }
});

export const { reset, clearCurrentItem, setCurrentItem, setCurrentItemValue, setError, clearError } = slice.actions;

export default slice.reducer;
