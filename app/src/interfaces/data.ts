export interface IRole {
    id?: number;
    role_id: 'admin' | 'member';
    name: string;
}

export interface IStatus {
    id?: number;
    name: string;
}

export interface IProperty {
    id?: number;
    name: string;
}
