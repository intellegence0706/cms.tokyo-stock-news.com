import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setFilterValue } from '@/store/features/customer';

import { Button, InputAdornment, TextField } from '@mui/material';
import { IoSearch } from 'react-icons/io5';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import ImportCSVDialog from '../components/ImportCSVDialog';

const Filter = () => {
    const dispatch = useAppDispatch();

    const [open, setOpen] = useState(false);
    const filter = useAppSelector(state => state.customer.items.filter);

    return (
        <div className='w-full flex flex-col-reverse sm:flex-row items-end sm:items-center justify-between gap-[4px] mb-[16px]'>
            <div className='w-full sm:max-w-[300px]'>
                <TextField
                    size='small'
                    fullWidth
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

            <div className='flex items-center'>
                <Button
                    variant='text'
                    color='primary'
                    size='small'
                    onClick={() => setOpen(true)}
                    sx={{ display: 'flex', alignItems: 'center', gap: '8px', px: 3 }}
                >
                    <FolderCopyIcon sx={{ fontSize: 16 }} /> CSV一括登録
                </Button>
            </div>

            <ImportCSVDialog open={open} onClose={() => setOpen(false)} />
        </div>
    );
};

export default Filter;
