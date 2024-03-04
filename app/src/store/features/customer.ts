import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ICustomer, IUser } from '@/interfaces';
import { getRequest } from '@/utils/axios';

type State = {
    item: {
        form: {
            id?: number;
            email: string;
            last_name: string;
            first_name: string;
            phone: string;
            email_2: string;
            phone_2: string;
            ads: string;
            deposit_date: string | null;
            contract_start_date: string | null;
            contract_days: number;
            property: number;
            status: number;
            manager?: IUser;
            system_provided: boolean;
        };
        errors: any;
    };
    items: {
        filter: {
            keyword: string;
            order_by: string;
            page: number;
            pageSize: number;
        };
        result: {
            data: ICustomer[];
            total: number;
        };
    };
};

const initialState: State = {
    item: {
        form: {
            id: 0,
            email: '',
            last_name: '',
            first_name: '',
            phone: '',
            email_2: '',
            phone_2: '',
            ads: '',
            deposit_date: null,
            contract_start_date: null,
            contract_days: 0,
            property: 0,
            status: 0,
            system_provided: false
        },
        errors: {}
    },
    items: {
        filter: {
            keyword: '',
            order_by: 'id',
            page: 1,
            pageSize: 10
        },
        result: {
            data: [],
            total: 0
        }
    }
};

export const fetchCustomers = createAsyncThunk('customer/fetchCustomers', async (filter: any) => {
    const res = await getRequest('/v0/customers', filter);
    return res;
});

export const fetchCustomer = createAsyncThunk('customer/fetchCustomer', async (id: number) => {
    const res = await getRequest(`/v0/customers/${id}`);
    return res;
});

export const slice = createSlice({
    name: 'customer',
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
        builder.addCase(fetchCustomers.fulfilled, (state, action) => {
            state.items = {
                ...state.items,
                result: action.payload.data as any
            };
        });
        builder.addCase(fetchCustomer.fulfilled, (state, action) => {
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
