import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchInboxMails } from '@/store/features/mail_inbox';

import AuthLayout from '@/components/templates/AuthLayout';
import PermissionLayout from '@/components/templates/PermissionLayout';
import MainLayout from '@/components/templates/layout/MainLayout';
import TitleBar from '@/components/atoms/TitleBar';
import MainPannel from '@/components/atoms/MainPannel';
import InboxTable from './sections/InboxTable';
import TablePagination from './sections/TablePagination';

const MailInboxPage = () => {
    const dispatch = useAppDispatch();

    const filter = useAppSelector(state => state.mail_inbox.items.filter);
    const result = useAppSelector(state => state.mail_inbox.items.result);

    useEffect(() => {
        dispatch(fetchInboxMails(filter));
    }, [filter]);

    return (
        <AuthLayout>
            <PermissionLayout permission={['customer']} role={['admin', 'member']}>
                <MainLayout>
                    <TitleBar>受信トレイ</TitleBar>

                    <div className='w-full grid grid-cols-3 xl:grid-cols-4 gap-[20px] mb-[24px]'>
                        <MainPannel>
                            <h2 className='text-md mb-[16px]'>送受信箱</h2>

                            <p className='font-bold text-lg'>{result.message_total} 件</p>
                        </MainPannel>

                        <MainPannel>
                            <h2 className='text-md mb-[16px]'>未読</h2>

                            <p className='font-bold text-lg'>{result.message_unread} 件</p>
                        </MainPannel>
                    </div>

                    <MainPannel>
                        <InboxTable />
                        <TablePagination />
                    </MainPannel>
                </MainLayout>
            </PermissionLayout>
        </AuthLayout>
    );
};

export default MailInboxPage;
