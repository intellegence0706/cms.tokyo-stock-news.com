import { FormEvent, useEffect } from 'react';
import { postRequest } from '@/utils/axios';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearCurrentItem, setError } from '@/store/features/createMails';

import { Button } from '@mui/material';
import TitleBar from '@/components/atoms/TitleBar';
import MainPannel from '@/components/atoms/MainPannel';
import ReplayMailForm from './components/ReplaymailForm';

const mailCreatePage = () => {
    const dispatch = useAppDispatch();

    const currentItem = useAppSelector(state => state.createMails.item.form);

    // console.log(currentItem);

    // useEffect(() => {
    //     dispatch(clearCurrentItem());
    // }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const res = await postRequest(`/v0/mails/create`, currentItem);
        if (res.status == 200) {
            dispatch(clearCurrentItem());
        }

        if (res.status == 422 && res.data.errors) {
            dispatch(setError(res.data.errors));
        }
    };

    return (
        <>
            <TitleBar>新規メール作成</TitleBar>

            <MainPannel>
                <form className='w-full flex flex-col gap-[10px]' onSubmit={handleSubmit}>
                    <ReplayMailForm />

                    {/* ************************************************************************ */}
                    <div className='mt-[16px] flex'>
                        <Button type='submit' variant='contained' color='secondary'>
                        作成する
                        </Button>
                    </div>
                </form>
            </MainPannel>
        </>
                   
    );
};

export default mailCreatePage;
