'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const TemplateListPage = dynamic(() => import('@/components/pages/mail/template/templateList/templateListPage'), {
    loading: () => <Loading />
});

const Page = () => {
    return <TemplateListPage />;
};

export default Page;