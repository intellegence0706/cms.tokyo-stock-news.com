import { createSlice } from '@reduxjs/toolkit';
import { IMailCreate } from '@/interfaces';

type State = {
    item: {
        form: {
            recipients: string;
            subject: string;
            body: string;
            templateId: number;
        };
        errors: any;
    };
    items: {
        result: {
            data: IMailCreate[];
            total: number;
        };
    }

};

const initialState: State = {
    item: {
        form: {
            recipients: '',
            subject: '',
            body: '',
            templateId: -1,
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
    name: 'mailCreate',
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
        },


    },

});

export const {
    reset,
    clearCurrentItem,
    setCurrentItem,
    setCurrentItemValue,
    setError,
    clearError

} = slice.actions;

export default slice.reducer;
