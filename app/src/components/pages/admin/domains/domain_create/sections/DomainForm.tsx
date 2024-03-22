import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCurrentItemValue } from '@/store/features/domain';
import { fetchIMAPData } from '@/store/features/shared_data';

import { MenuItem, Select, Switch, TextField } from '@mui/material';
import FormLabel from '@/components/atoms/FormLabel';

const DomainForm = () => {
    const dispatch = useAppDispatch();

    const currentItem = useAppSelector(state => state.domain.item.form);
    const errors = useAppSelector(state => state.domain.item.errors);
    const shared_data = useAppSelector(state => state.shared_data);

    useEffect(() => {
        dispatch(fetchIMAPData());
    }, []);

    const imap_host_data = [
        { id: 1, name: 'imap.gmail.com' },
        { id: 2, name: 'imap.yahoo.com' },
        { id: 3, name: 'imap.outlook.com' },
        { id: 4, name: 'imap.office365.com' }
    ];

    return (
        <>
            {/* ************************************************************************ */}
            <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                <FormLabel className='min-w-[134px] mt-[10px]'>SMTP ホスト</FormLabel>
                <div className='w-full lg:max-w-[420px] flex gap-[8px]'>
                    <TextField
                        size='small'
                        fullWidth
                        placeholder='smtp.gmail.com'
                        value={currentItem.host}
                        onChange={e => dispatch(setCurrentItemValue({ host: e.target.value }))}
                        error={errors.host ? true : false}
                        helperText={errors.host ? errors.host : ''}
                    />
                </div>
            </div>

            {/* ************************************************************************ */}
            <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                <FormLabel className='min-w-[134px] mt-[10px]'>SMTP ポート</FormLabel>
                <div className='w-full lg:max-w-[420px] flex gap-[8px]'>
                    <TextField
                        size='small'
                        fullWidth
                        placeholder='465'
                        value={currentItem.port}
                        onChange={e => dispatch(setCurrentItemValue({ port: e.target.value }))}
                        error={errors.port ? true : false}
                        helperText={errors.port ? errors.port : ''}
                    />
                </div>
            </div>

            {/* ************************************************************************ */}
            <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                <FormLabel className='min-w-[134px] mt-[10px]'>メールアドレス</FormLabel>
                <div className='w-full lg:max-w-[420px] flex gap-[8px]'>
                    <TextField
                        size='small'
                        fullWidth
                        placeholder='info@tokyo-stock-news.com'
                        value={currentItem.username}
                        onChange={e => dispatch(setCurrentItemValue({ username: e.target.value }))}
                        error={errors.username ? true : false}
                        helperText={errors.username ? errors.username : ''}
                    />
                </div>
            </div>

            {/* ************************************************************************ */}
            <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                <FormLabel className='min-w-[134px] mt-[10px]'>パスワード</FormLabel>
                <div className='w-full lg:max-w-[420px] flex gap-[8px]'>
                    <TextField
                        size='small'
                        fullWidth
                        value={currentItem.password}
                        onChange={e => dispatch(setCurrentItemValue({ password: e.target.value }))}
                        error={errors.password ? true : false}
                        helperText={errors.password ? errors.password : ''}
                    />
                </div>
            </div>

            {/* ************************************************************************ */}
            <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                <FormLabel className='min-w-[134px] mt-[10px]'>IMAP ホスト</FormLabel>
                <div className='w-full lg:max-w-[420px]'>
                    <Select
                        fullWidth
                        size='small'
                        value={currentItem.imap_host}
                        onChange={e => dispatch(setCurrentItemValue({ imap_host: e.target.value }))}
                        error={errors.imap_host ? true : false}
                    >
                        {shared_data.imap_data.map(imap => (
                            <MenuItem value={imap.name} key={imap.id}>
                                {imap.name}
                            </MenuItem>
                        ))}
                    </Select>

                    {errors.role && <p className='text-[12px] mt-[4px] ml-[14px] text-[#f44336]'>{errors.role}</p>}
                </div>
            </div>
        </>
    );
};

export default DomainForm;
