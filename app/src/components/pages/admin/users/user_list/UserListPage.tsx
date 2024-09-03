import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchUsers } from '@/store/features/user';

import AuthLayout from '@/components/templates/AuthLayout';
import PermissionLayout from '@/components/templates/PermissionLayout';
import MainLayout from '@/components/templates/layout/MainLayout';
import TitleBar from '@/components/atoms/TitleBar';
import MainPannel from '@/components/atoms/MainPannel';
import Filter from './sections/Filter';
import UserTable from './sections/UserTable';
import TablePagination from './sections/TablePagination';

const UserListPage = () => {
    const dispatch = useAppDispatch();

    const filter = useAppSelector(state => state.user.items.filter);
    const result = useAppSelector(state => state.user.items.result);

    useEffect(() => {
        dispatch(fetchUsers(filter));
    }, [filter]);

    return (
        <AuthLayout>
            <PermissionLayout permission={['customer', 'owner', 'super']} role={['admin', 'member']}>
                <MainLayout>
                    <TitleBar>ユーザー一覧</TitleBar>

                    <MainPannel>
                        <Filter />
                        <UserTable />
                        <TablePagination />
                    </MainPannel>
                </MainLayout>
            </PermissionLayout>
        </AuthLayout>
    );
};

export default UserListPage;
