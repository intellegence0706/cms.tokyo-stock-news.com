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

export interface IMemo {
    id: number;
    manager: IUser;
    content: string;
    created_at: string;
}

export interface IMailTemplate {
    id: number;
    publisher: IUser;
    subject: string;
    body: string;

    created_at?: string;
    updated_at?: string;
}

export interface IMailAttachment {
    id: number;
    document?: string;
    info?: {
        name: string;
        content_type: string;
    };

    created_at?: string;
    updated_at?: string;
}
export interface IMail {
    id: number;
    customers: ICustomer[];
    managers: {
        id: number;
        email: string;
        name: string;
    }[];

    subject: string;
    body: string;
    outgoing: boolean;
    attachments: IMailAttachment[];
    read?: string;
    processed?: string;

    created_at?: string;
    updated_at?: string;
}

export interface IMailInbox {
    id?: number;

    email: string;
    name?: string;
    last_name: string;
    first_name: string;

    last_message?: IMail;
    message_cnt?: number;
    new_message_cnt?: number;
}
