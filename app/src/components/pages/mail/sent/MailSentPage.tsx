import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchSentMails, reset } from '@/store/features/mail';

import AuthLayout from '@/components/templates/AuthLayout';
import PermissionLayout from '@/components/templates/PermissionLayout';
import MainLayout from '@/components/templates/layout/MainLayout';
import TitleBar from '@/components/atoms/TitleBar';
import MainPannel from '@/components/atoms/MainPannel';
import InboxTable from './sections/InboxTable';
import TablePagination from './sections/TablePagination';

const MailSentPage = () => {
    const dispatch = useAppDispatch();

    const filter = useAppSelector(state => state.mail.items.filter);
    const result = useAppSelector(state => state.mail.items.result);

    useEffect(() => {
        return () => {
            dispatch(reset());
        };
    }, []);

    useEffect(() => {
        dispatch(fetchSentMails(filter));
    }, [filter]);

    return (
        <AuthLayout>
            <PermissionLayout permission={['customer']} role={['admin', 'member']}>
                <MainLayout>
                    <TitleBar>送信トレイ</TitleBar>

                    <MainPannel>
                        <InboxTable />
                        <TablePagination />
                    </MainPannel>
                </MainLayout>
            </PermissionLayout>
        </AuthLayout>
    );
};

export default MailSentPage;
