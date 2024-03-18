import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IInbox } from '@/interfaces';
import { getRequest } from '@/utils/axios';

type State = {
    item: {
        form: {
            id?: number;
            body: string;
            encoded: boolean;
            form_header: string;
            in_reply_to: null;
            mailbox: number;
            massage_id: string;
            outgoing: boolean;
            read: null;
            subject: string;
            processed: Date;
            to_header: string;

            status: string;
            property: string;
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
            data: IInbox[];
            total: number;
        };
    };
};

const initialState: State = {
    item: {
        form: {
            status: '選択する',
            property: '選択する',
            body: '',
            encoded: false,
            form_header: '',
            id: 0,
            in_reply_to: null,
            mailbox: 0,
            massage_id: '',
            outgoing: false,
            read: null,
            subject: '',
            processed: new Date('2024-03-09'),
            to_header: ''
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

export const fetchMails = createAsyncThunk('v0/mails', async (filter: any) => {
    const res = await getRequest('v0/mails', filter);
    return res;
});

export const fetchMail = createAsyncThunk('v0/mail', async (id: number) => {
    const res = await getRequest(`/v0/mails/${id}`);
    return res;
});

export const slice = createSlice({
    name: 'mail_inbox',
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
        builder.addCase(fetchMail.fulfilled, (state, action) => {
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
    clearError,
    setFilter,
    setFilterValue,
    clearFilter,
    setResult
} = slice.actions;

export default slice.reducer;
