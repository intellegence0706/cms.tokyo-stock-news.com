'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const MailListPage = dynamic(() => import('@/components/pages/mail/inbox/inboxList/inboxListPage'), {
    loading: () => <Loading />
});

const Page = () => {
    return <MailListPage />;
};

export default Page;