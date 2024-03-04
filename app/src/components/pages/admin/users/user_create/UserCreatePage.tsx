import { FormEvent, useEffect } from 'react';
import { postRequest } from '@/utils/axios';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearCurrentItem, setError } from '@/store/features/user';

import { Button } from '@mui/material';
import AuthLayout from '@/components/templates/AuthLayout';
import PermissionLayout from '@/components/templates/PermissionLayout';
import MainLayout from '@/components/templates/layout/MainLayout';
import UserForm from './sections/UserForm';

const UserCreatePage = () => {
    const dispatch = useAppDispatch();

    const currentItem = useAppSelector(state => state.user.item.form);

    useEffect(() => {
        dispatch(clearCurrentItem());
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const res = await postRequest(`/v0/admin/users/create`, currentItem);
        if (res.status == 200) {
            dispatch(clearCurrentItem());
        }

        if (res.status == 422 && res.data.errors) {
            dispatch(setError(res.data.errors));
        }
    };

    return (
        <AuthLayout>
            <PermissionLayout permission={['customer']} role={['admin', 'member']}>
                <MainLayout>
                    <div className='w-full flex items-center gap-[8px] mb-[24px]'>
                        <h2 className=' whitespace-nowrap font-bold text-[20px] '>新規ユーザー登録</h2>
                        <hr className='w-full border-t border-solid border-[#C8CBD9]' />
                    </div>

                    <form className='w-full flex flex-col gap-[10px]' onSubmit={handleSubmit}>
                        <UserForm />

                        {/* ************************************************************************ */}
                        <div className='mt-[16px]'>
                            <Button type='submit' variant='contained' color='secondary'>
                                登録する
                            </Button>
                        </div>
                    </form>

                    <p className='mt-[24px]'>
                        ※登録後、ユーザーにメールが送信されます。メール内のURLからアカウントの有効化を行ってください。
                    </p>
                </MainLayout>
            </PermissionLayout>
        </AuthLayout>
    );
};

export default UserCreatePage;
