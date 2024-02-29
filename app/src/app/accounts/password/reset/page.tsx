'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const RedirectPage = dynamic(() => import('@/components/templates/RedirectPage'), {
    loading: () => <Loading />
});

const Page = () => {
    return <RedirectPage />;
};

export default Page;
