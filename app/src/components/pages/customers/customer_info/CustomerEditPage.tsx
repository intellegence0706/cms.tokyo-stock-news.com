import { FormEvent, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { patchRequest } from '@/utils/axios';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearCurrentItem, clearError, fetchCustomer, setError } from '@/store/features/customer';

import { Button, useMediaQuery } from '@mui/material';
import AuthLayout from '@/components/templates/AuthLayout';
import PermissionLayout from '@/components/templates/PermissionLayout';
import MainLayout from '@/components/templates/layout/MainLayout';
import TitleBar from '@/components/atoms/TitleBar';
import MainPannel from '@/components/atoms/MainPannel';
import CustomerForm from './sections/CustomerForm';
import MemoForm from './sections/MemoForm';

const CustomerEditPage = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();

    const less_xl = useMediaQuery('(max-width: 1280px)');
    const currentItem = useAppSelector(state => state.customer.item.form);

    useEffect(() => {
        dispatch(clearCurrentItem());
        dispatch(fetchCustomer(parseInt(`${id}`)));
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const res = await patchRequest(`/v0/customers/${id}`, currentItem);
        if (res.status == 200) {
            dispatch(clearError());
        }

        if (res.status == 422 && res.data.errors) {
            dispatch(setError(res.data.errors));
        }
    };

    return (
        <AuthLayout>
            <PermissionLayout permission={['customer']} role={['admin', 'member']}>
                <MainLayout>
                    <TitleBar>顧客情報</TitleBar>

                    <MainPannel>
                        <div className='w-full h-full flex flex-col xl:flex-row gap-[24px]'>
                            <form className='w-full flex flex-col gap-[10px]' onSubmit={handleSubmit}>
                                <CustomerForm />

                                {/* ************************************************************************ */}
                                <div className='mt-[16px]'>
                                    <Button type='submit' variant='contained' color='secondary'>
                                        保存する
                                    </Button>
                                </div>
                            </form>

                            {!less_xl && (
                                <div className='w-full h-full overflow-y-auto'>
                                    <MemoForm />
                                </div>
                            )}
                        </div>
                    </MainPannel>

                    {less_xl && (
                        <div className='mt-[24px]'>
                            <MainPannel>
                                <MemoForm />
                            </MainPannel>
                        </div>
                    )}
                </MainLayout>
            </PermissionLayout>
        </AuthLayout>
    );
};

export default CustomerEditPage;
