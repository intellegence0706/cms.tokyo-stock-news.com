import { IProperty, IRole, IStatus, IName } from './data';
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
    manager: IName;
    system_provided: boolean;

    created_at?: string;
    updated_at?: string;
}

export interface ICsvCustomer {
    name: string;
    email: string;
    phone: string;
    email_2: string;
    phone_2: string;
    manager?: string;
    ads: string;
    deposit_date: string;
    contract_start_date: string;
    contract_days: string;
    property: '' | 'A' | 'B' | 'C' | 'D' | 'E';
    status: '' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8';
    system_provided: 'OK' | 'NG';
}

export interface IMemo {
    id: number;
    manager: IName;
    content: string;
    created_at: string;
}

export interface IMailTemplate {
    id: number;
    publisher: IName;
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

export interface IMailDomain {
    id: number;
    host: string;
    port: string;
    username: string;
    password: string;
    imap_host: string;

    created_at?: string;
    updated_at?: string;
}

export interface IMail {
    id: number;
    domain?: string;
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
