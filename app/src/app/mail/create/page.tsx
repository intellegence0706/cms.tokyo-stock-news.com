'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const CreateMailPage = dynamic(() => import('@/components/pages/mail/mailCreate/MailCreatePage'), {
    loading: () => <Loading />
});

const Page = () => {
    return <CreateMailPage />;
};

export default Page;
