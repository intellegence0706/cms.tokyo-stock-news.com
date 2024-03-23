export interface IIMAP {
    id?: number;
    name: string;
}

export interface IDomain {
    id?: number;
    name: string;
}

export interface IRole {
    id?: number;
    role_id: 'admin' | 'member';
    name: string;
}

export interface IStatus {
    id?: number;
    name: string;
    customer_cnt?: number;
}

export interface IProperty {
    id?: number;
    name: string;
    customer_cnt?: number;
}
