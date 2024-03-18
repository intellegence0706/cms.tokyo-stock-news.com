import { FormEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useAuth } from '@/contexts/AuthContext';
import { fetchTemplates } from '@/store/features/mail_template';

import AuthLayout from '@/components/templates/AuthLayout';
import PermissionLayout from '@/components/templates/PermissionLayout';
import MainLayout from '@/components/templates/layout/MainLayout';
import TitleBar from '@/components/atoms/TitleBar';
import MainPannel from '@/components/atoms/MainPannel';
import TemplateTable from './sections/templateTable';
import TablePagination from './sections/TablePageination';

const UserListPage = () => {
    const dispatch = useAppDispatch();
    const { setPending } = useAuth();

    const result = useAppSelector(state => state.mail_template.items);
    


    useEffect(() => {
        dispatch(fetchTemplates());
    }, []);
    return (
        <AuthLayout>
            <PermissionLayout permission={['customer']} role={['admin', 'member']}>
                <MainLayout>
                    <TitleBar>テンプレート
                    </TitleBar>

                    <MainPannel>
                        <TemplateTable />
                        <TablePagination />
                    </MainPannel>
                </MainLayout>
            </PermissionLayout>
        </AuthLayout>
    );
};

export default UserListPage;
