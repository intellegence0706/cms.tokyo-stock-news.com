import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ICustomer, IMail, IMailInbox, IProperty, IStatus } from '@/interfaces';
import { getRequest } from '@/utils/axios';

type State = {
    item: {
        form: {
            group: IStatus | IProperty | null;
            group_type: 'status' | 'property';
            recipients: ICustomer[];
            subject: string;
            body: string;
            open: boolean;
        };
        errors: any;
    };
    items: {
        filter: {
            keyword: string;
            page: number;
            pageSize: number;
        };
        result: {
            customer?: ICustomer;
            data: IMail[];
            total: number;
        };
    };
};

const initialState: State = {
    item: {
        form: {
            group: null,
            group_type: 'status',
            recipients: [],
            subject: '',
            body: '',
            open: false
        },
        errors: {}
    },

    items: {
        filter: {
            keyword: '',
            page: 1,
            pageSize: 10
        },
        result: {
            data: [],
            total: 0
        }
    }
};

export const fetchMails = createAsyncThunk('mail/fetchMails', async (id: number) => {
    const res = await getRequest(`/v0/mails/inbox/${id}`);
    return res;
});

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
        },
        setFilter: (state: State, action) => {
            state.items = {
                ...state.items,
                filter: action.payload
            };
        },
        setFilterValue: (state: State, action) => {
            state.items = {
                ...state.items,
                filter: {
                    ...state.items.filter,
                    ...action.payload
                }
            };
        },
        clearFilter: (state: State) => {
            state.items = {
                ...state.items,
                filter: initialState.items.filter
            };
        },
        setResult: (state: State, action) => {
            state.items = {
                ...state.items,
                result: action.payload
            };
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchMails.fulfilled, (state, action) => {
            state.items = {
                ...state.items,
                result: action.payload.data as any
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
    clearError,
    setFilter,
    setFilterValue,
    clearFilter,
    setResult
} = slice.actions;

export default slice.reducer;
