import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setFilterValue } from '@/store/features/mail_template';

import { InputAdornment, TextField } from '@mui/material';
import { IoSearch } from 'react-icons/io5';

const Filter = () => {
    const dispatch = useAppDispatch();

    const filter = useAppSelector(state => state.mail_template.items.filter);

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
        </div>
    );
};

export default Filter;
