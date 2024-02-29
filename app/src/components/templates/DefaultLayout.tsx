'use client';

import { useEffect, ReactNode, memo } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Providers } from '@/store/provider';
import { reset } from '@/store/features/utilSlice';
import clsx from 'clsx';
import moment from 'moment';
import 'moment/locale/ja';
moment.locale('ja');

import { AnimatePresence } from 'framer-motion';
import Loading from '@/components/templates/Loading';
import Pending from '@/components/templates/Pending';

interface Props {
    children: ReactNode;
}

const Auth = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useAppDispatch();
    const { loading, pending, isAuthenticated } = useAuth();
    const pathname = usePathname()!;
    const params = useSearchParams()!;

    useEffect(() => {
        dispatch(reset());
    }, [pathname, params]);

    return (
        <div className={clsx('flex flex-col w-full min-h-screen overflow-x-hidden', {})}>
            {loading ? (
                <Loading />
            ) : (
                <>
                    {children}
                    <Pending pending={pending} />
                </>
            )}
        </div>
    );
};

const DefaultLayout = ({ children }: Props) => {
    return (
        <body className='w-full'>
            <AnimatePresence>
                <Providers>
                    <AuthProvider>
                        <Auth>
                            <div id='top'></div>

                            <main className='bg-[#F4F5FA] w-full flex-grow tracking-wide font-normal text-[14px]'>
                                {children}
                            </main>
                        </Auth>
                    </AuthProvider>
                </Providers>
            </AnimatePresence>
        </body>
    );
};

export default memo(DefaultLayout);
