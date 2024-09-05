'use client';

import dynamic from 'next/dynamic';
import Loading from '@/components/templates/Loading';

const NewPost = dynamic(() => import('@/components/pages/newpost/NewPost'), {
    loading: () => <Loading />
});

const Page = () => {
    return <NewPost/>;
};

export default Page;
