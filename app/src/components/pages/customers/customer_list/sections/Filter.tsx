import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearFilter, setFilterValue } from '@/store/features/customer';

import { Button, InputAdornment, MenuItem, Select, TextField } from '@mui/material';
import { IoSearch } from 'react-icons/io5';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import FormLabel from '@/components/atoms/FormLabel';
import ImportCSVDialog from '../components/ImportCSVDialog';

const Filter = () => {
    const dispatch = useAppDispatch();

    const [open, setOpen] = useState(false);
    const filter = useAppSelector(state => state.customer.items.filter);
    const shared_data = useAppSelector(state => state.shared_data);

    return (
        <div className='w-full flex flex-col-reverse xl:flex-row items-end xl:items-center justify-between gap-[16px] mb-[16px]'>
            <div className='w-full flex flex-col xl:flex-row items-center gap-[20px]'>
                <div className='w-full xl:max-w-[320px] flex'>
                    <TextField
                        fullWidth
                        size='small'
                        value={filter.keyword}
                        onChange={e => dispatch(setFilterValue({ keyword: e.target.value, manager: 0 }))}
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
                <div className='w-full flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                    <FormLabel className='min-w-[54px] mt-[10px]'>状態</FormLabel>
                    <div className='w-full xl:max-w-[420px]'>
                        <Select
                            fullWidth
                            size='small'
                            value={filter.status}
                            onChange={e => dispatch(setFilterValue({ status: e.target.value, manager: 0 }))}
                        >
                            <MenuItem value={0}>選択する</MenuItem>
                            {shared_data.status_data.map(status => (
                                <MenuItem value={status.id} key={status.id}>
                                    {status.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                </div>
                {/* ************************************************************************ */}
                <div className='w-full flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                    <FormLabel className='min-w-[54px] mt-[10px]'>属性</FormLabel>
                    <div className='w-full xl:max-w-[420px]'>
                        <Select
                            fullWidth
                            size='small'
                            value={filter.property}
                            onChange={e => dispatch(setFilterValue({ property: e.target.value, manager: 0 }))}
                        >
                            <MenuItem value={0}>選択する</MenuItem>
                            {shared_data.property_data.map(property => (
                                <MenuItem value={property.id} key={property.id}>
                                    {property.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                </div>

                <Button
                    variant='contained'
                    fullWidth
                    color='primary'
                    size='small'
                    onClick={() => dispatch(clearFilter())}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        px: 3,
                        whiteSpace: 'nowrap',
                        maxWidth: 150
                    }}
                >
                    検索条件クリア
                </Button>
            </div>

            <div className='flex items-center'>
                <Button
                    variant='text'
                    color='primary'
                    size='small'
                    onClick={() => setOpen(true)}
                    sx={{ display: 'flex', alignItems: 'center', gap: '8px', px: 3, whiteSpace: 'nowrap' }}
                >
                    <FolderCopyIcon sx={{ fontSize: 16 }} /> CSV一括登録
                </Button>
            </div>

            <ImportCSVDialog open={open} onClose={() => setOpen(false)} />
        </div>
    );
};

export default Filter;
