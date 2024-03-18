import { createSlice } from '@reduxjs/toolkit';
import { ICustomer, IMailCreate } from '@/interfaces';

type State = {
    item: {
        form: {
            recipients: ICustomer[];
            subject: string;
            body: string;
            open: boolean;
        };
        errors: any;
    };
    items: {
        result: {
            data: IMailCreate[];
            total: number;
        };
    };
};

const initialState: State = {
    item: {
        form: {
            recipients: [],
            subject: '',
            body: '',
            open: false
        },
        errors: {}
    },

    items: {
        result: {
            data: [],
            total: 0
        }
    }
};

export const slice = createSlice({
    name: 'mail',
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
                errors: initialState.item.errors
            };
        }
    }
});

export const { reset, clearCurrentItem, setCurrentItem, setCurrentItemValue, setError, clearError } = slice.actions;

export default slice.reducer;
