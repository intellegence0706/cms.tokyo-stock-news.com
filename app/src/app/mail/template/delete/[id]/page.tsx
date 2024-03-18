'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const TemplateDeletePage = dynamic(() => import('@/components/pages/mail/template/templateDelete/templateDeletePage'), {
    loading: () => <Loading />
});

const Page = () => {
    return <TemplateDeletePage />;
};

export default Page;
