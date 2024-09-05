import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCurrentItemValue } from '@/store/features/customer';
import { fetchPropertyData, fetchStatusData } from '@/store/features/shared_data';

import { MenuItem, Select, Switch, TextField } from '@mui/material';
import FormLabel from '@/components/atoms/FormLabel';

const CustomerForm = () => {
    const dispatch = useAppDispatch();

    const currentItem = useAppSelector(state => state.customer.item.form);
    const errors = useAppSelector(state => state.customer.item.errors);
    const shared_data = useAppSelector(state => state.shared_data);

    useEffect(() => {
        dispatch(fetchStatusData());
        dispatch(fetchPropertyData());
    }, []);

    return (
        <>
            <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                <FormLabel className='min-w-[134px] mt-[10px]'>social type</FormLabel>
                <div className='w-full'>
                    <Select
                        fullWidth
                        value={currentItem.ads}
                        onChange={e => dispatch(setCurrentItemValue({ ads: e.target.value }))}
                        error={errors.ads ? true : false}
                    >
                        <MenuItem value={0}>Youtube</MenuItem>
                        <MenuItem value={1}>Tiktok</MenuItem>
                        <MenuItem value={2}>Instagram</MenuItem>
                    </Select>

                    {errors.system_provided && (
                        <p className='text-[12px] mt-[4px] ml-[14px] text-[#f44336]'>{errors.ads}</p>
                    )}
                </div>
            </div>

            {/* ************************************************************************ */}
            {/* <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                <FormLabel className='min-w-[134px] mt-[10px]'>social type</FormLabel>
                <div className='w-full flex gap-[8px]'>
                    <TextField
                        size='small'
                        fullWidth
                        value={currentItem.ads}
                        onChange={e => dispatch(setCurrentItemValue({ ads: e.target.value }))}
                        error={errors.ads ? true : false}
                        helperText={errors.ads ? errors.ads : ''}
                    />
                </div>
            </div> */}

            {/* ************************************************************************ */}
            <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                <FormLabel className='min-w-[134px] mt-[10px]'>User ID</FormLabel>
                <div className='w-full flex gap-[8px]'>
                    <TextField
                        size='small'
                        fullWidth
                        value={currentItem.userid}
                        onChange={e => dispatch(setCurrentItemValue({ userid: e.target.value }))}
                        error={errors.userid ? true : false}
                        helperText={errors.userid ? errors.userid : ''}
                    />
                </div>
            </div>

            {/* ************************************************************************ */}
            <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                <FormLabel className='min-w-[134px] mt-[10px]'>Password</FormLabel>
                <div className='w-full flex gap-[8px]'>
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
                <FormLabel className='min-w-[134px] mt-[10px]'>API key</FormLabel>
                <div className='w-full flex gap-[8px]'>
                    <TextField
                        size='small'
                        fullWidth
                        value={currentItem.api_key}
                        onChange={e => dispatch(setCurrentItemValue({ api_key: e.target.value }))}
                        error={errors.api_key ? true : false}
                        helperText={errors.api_key ? errors.api_key : ''}
                    />
                </div>
            </div>



            {/* ************************************************************************ */}
            {/* <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                <FormLabel className='min-w-[134px] mt-[10px]'>入金日</FormLabel>
                <div className='w-full flex gap-[8px]'>
                    <TextField
                        type='date'
                        size='small'
                        fullWidth
                        value={currentItem.deposit_date}
                        onChange={e => dispatch(setCurrentItemValue({ deposit_date: e.target.value }))}
                        error={errors.deposit_date ? true : false}
                        helperText={errors.deposit_date ? errors.deposit_date : ''}
                    />
                </div>
            </div> */}

        </>
    );
};

export default CustomerForm;
