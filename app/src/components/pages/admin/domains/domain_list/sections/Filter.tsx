import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setFilterValue } from '@/store/features/domain';

import { Button, InputAdornment, TextField } from '@mui/material';
import { IoSearch, IoAdd } from 'react-icons/io5';

const Filter = () => {
    const dispatch = useAppDispatch();

    const filter = useAppSelector(state => state.domain.items.filter);

    return (
        <div className='w-full flex items-center justify-between mb-[16px]'>
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
            <Link href='/admin/domains/create'>
                <Button variant='contained' size='small' color='secondary'>
                    <IoAdd className='mr-2' />
                    新規作成
                </Button>
            </Link>
        </div>
    );
};

export default Filter;
