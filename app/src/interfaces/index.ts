import { IProperty, IRole, IStatus } from './data';
export * from './data';

export interface IUser {
    id: number;
    email: string;
    user_info: {
        name: string;
        last_name: string;
        first_name: string;
        name_furi: string;
        last_name_furi: string;
        first_name_furi: string;
        phone: string;
        role: IRole;
    };
    permission: 'owner' | 'customer';
    is_active: boolean;
    is_allowed: boolean;

    created_at?: string;
    updated_at?: string;
}

export interface ICustomer {
    id: number;
    email: string;
    name?: string;
    last_name: string;
    first_name: string;
    phone: string;
    email_2: string;
    phone_2: string;
    ads: string;
    deposit_date: string | null;
    contract_start_date: string | null;
    contract_days: number;

    property: IProperty;
    status: IStatus;
    manager: IUser;
    system_provided: boolean;

    created_at?: string;
    updated_at?: string;
}
