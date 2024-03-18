import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchMails } from '@/store/features/mail_inbox';

import AuthLayout from '@/components/templates/AuthLayout';
import PermissionLayout from '@/components/templates/PermissionLayout';
import MainLayout from '@/components/templates/layout/MainLayout';
import TitleBar from '@/components/atoms/TitleBar';
import MainPannel from '@/components/atoms/MainPannel';
import Filter from './sections/Filter';
import MailTable from './sections/MailTable';
import TablePagination from './sections/TablePagination';

const MailListPage = () => {
    const dispatch = useAppDispatch();

    const filter = useAppSelector(state => state.mail_inbox.items.filter);
    const result = useAppSelector(state => state.mail_inbox.items.result);

    useEffect(() => {
        dispatch(fetchMails(filter));
    }, [filter]);

    return (
        <AuthLayout>
            <PermissionLayout permission={['customer']} role={['admin', 'member']}>
                <MainLayout>
                    <TitleBar>受信トレイ一覧</TitleBar>

                    <MainPannel>
                        <Filter />
                        <MailTable />
                        <TablePagination />
                    </MainPannel>
                </MainLayout>
            </PermissionLayout>
        </AuthLayout>
    );
};

export default MailListPage;
