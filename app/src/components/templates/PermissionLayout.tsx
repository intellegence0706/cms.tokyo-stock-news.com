'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

import Loading from './Loading';

interface Props {
    permission: ('super' | 'owner' | 'customer')[];
    role: ('admin' | 'member')[];
    children?: ReactNode;
}

const PermissionLayout = ({ children, permission, role }: Props) => {
    const router = useRouter();
    const pathname = usePathname()!;
    const { user, logout } = useAuth();

    useEffect(() => {
        if (user) {
            if (!permission.includes(user.permission)) {
                console.log(permission, user.permission);
                router.push(`/accounts/sign_in?redirect_to=${pathname}`);
            }

            if (user.permission == 'customer' && !role.includes(user.user_info?.role.role_id as 'admin' | 'member')) {
                router.push(`/accounts/sign_in?redirect_to=${pathname}`);
            }
        }
    }, [user]);

    if (user) {
        return children;
    } else return <Loading />;
};

export default PermissionLayout;
