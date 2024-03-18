'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const TemplateEditPage = dynamic(() => import('@/components/pages/mail/template/templateEdit/templateEditPage'), {
    loading: () => <Loading />
});

const Page = () => {
    return <TemplateEditPage />;
};

export default Page;