import { useEffect } from 'react';

import { fetchStatusData } from '@/store/features/shared_data';
import { fetchPropertyData } from '@/store/features/shared_data';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setFilterValue } from '@/store/features/user';

import { InputAdornment, TextField, FormLabel, Select, MenuItem, Button} from '@mui/material';
import { IoSearch } from 'react-icons/io5';

const Filter = () => {
    const dispatch = useAppDispatch();

    const filter = useAppSelector(state => state.user.items.filter);
    const shared_data = useAppSelector(state => state.shared_data);

    const currentItem = useAppSelector(state => state.mail_inbox.item.form);
    const errors = useAppSelector(state => state.mail_inbox.item.errors);
    

    useEffect(() => {
        dispatch(fetchStatusData());
        dispatch(fetchPropertyData());

    }, []);

    return (
        <div className=' flex'>
            <div className='w-full flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-[4px] items-center m-auto'>
                <TextField
                    size='small'
                    value={filter.keyword}
                    onChange={e => dispatch(setFilterValue({ keyword: e.target.value }))}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <IoSearch />
                            </InputAdornment>
                        )
                    }}
                    placeholder='検索ワードを入力'
                />
            </div>
            <div className='flex gap-8 items-center'>
                <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                    <FormLabel className='min-w-[134px] mt-[10px]'>状態</FormLabel>
                    <div className='w-[300px] lg:max-w-[420px]'>
                        <Select
                            fullWidth
                            size='small'
                            // value={currentItem.status}
                            onChange={e => dispatch(setFilterValue({ status: e.target.value }))}
                            error={errors.role ? true : false}
                        >
                            <MenuItem value={0}>選択する</MenuItem>
                            {shared_data.status_data.map(status => (
                                <MenuItem value={status.id} key={status.id}>
                                    {status.name}
                                </MenuItem>
                            ))}
                        </Select>

                        {errors.role && <p className='text-[12px] mt-[4px] ml-[14px] text-[#f44336]'>{errors.role}</p>}
                    </div>
                </div>
                {/* ************************************************************************ */}
                <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                    <FormLabel className='min-w-[134px] mt-[10px]'>属性</FormLabel>
                    <div className=' w-[300px] lg:max-w-[420px]'>
                        <Select
                            fullWidth
                            size='small'
                            // value={currentItem.property}
                            onChange={e => dispatch(setFilterValue({ property: e.target.value }))}
                            error={errors.role ? true : false}
                        >
                            <MenuItem value={0}>選択する</MenuItem>
                            {shared_data.property_data.map(property => (
                                <MenuItem value={property.id} key={property.id}>
                                    {property.name}
                                </MenuItem>
                            ))}
                        </Select>

                        {errors.role && <p className='text-[12px] mt-[4px] ml-[14px] text-[#f44336]'>{errors.role}</p>}
                    </div>
                </div>
                {/* ************************************************************************
                <div className=' Max-Width flex justify-center items-center'>
                    <Button type='submit' variant='contained' color='secondary' className=' w-max'>
                        検索する
                    </Button>
                </div> */}
            </div>
        </div>
            
    );
};

export default Filter;
