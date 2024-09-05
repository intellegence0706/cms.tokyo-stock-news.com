import AuthLayout from '@/components/templates/AuthLayout';
import PermissionLayout from '@/components/templates/PermissionLayout';
import MainLayout from '@/components/templates/layout/MainLayout';

import { Button } from '@mui/material';
import TitleBar from '@/components/atoms/TitleBar';
import MainPannel from '@/components/atoms/MainPannel';
import PostForm from './sections/PostForm';

const NewPost = () => {
    return (
        <AuthLayout>
            <PermissionLayout permission={['customer', 'owner', 'super']} role={['admin', 'member']}>
                <MainLayout>
                    <TitleBar>新規投稿</TitleBar>
                    <MainPannel>
                        <form className='w-full max-w-[600px] flex flex-col gap-[10px]' >
                            <PostForm />

                            {/* ************************************************************************ */}
                            <div className='mt-[16px]'>
                                <Button type='submit' variant='contained' color='secondary'>
                                    確認する
                                </Button>
                            </div>
                        </form>
                    </MainPannel>
                </MainLayout>
            </PermissionLayout>
        </AuthLayout>
    );
};

export default NewPost;
