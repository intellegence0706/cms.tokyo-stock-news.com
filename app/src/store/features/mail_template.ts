import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getRequest } from '@/utils/axios';
import { ITemplate } from '@/interfaces';

type State = {
    item: {
        form: {
            id: number;
            subject: string;
            body: string;
        };
        errors: any;
    };
    items: {
        result: {
            data: ITemplate[];
            total: number;
        };
    }

};

const initialState: State = {
    item: {
        form: {
            id: 0,
            subject: '',
            body: '',
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


export const fetchTemplates = createAsyncThunk('Template/fetchTemplates', async () => {
    const res = await getRequest('/v0/mail_templates');
    return res;
});

export const fetchTemplate = createAsyncThunk('mail/fetchTemplate', async (id: number) => {
    const res = await getRequest(`/v0/mail_templates/${id}`);
    return res;
});



export const slice = createSlice({
    name: 'Template',
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
    extraReducers: builder => {
        builder.addCase(fetchTemplates.fulfilled, (state, action) => {
            state.items = {
                ...state.items,
                result: action.payload.data as any
            };
        });
        builder.addCase(fetchTemplate.fulfilled, (state, action) => {
            state.item = {
                ...state.item,
                form: action.payload.data as any
            };
        });
    }

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
