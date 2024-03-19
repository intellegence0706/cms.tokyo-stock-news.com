import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setFilterValue } from '@/store/features/mail';

import { Pagination } from '@mui/material';

const TablePagination = () => {
    const dispatch = useAppDispatch();

    const filter = useAppSelector(state => state.mail.items.filter);
    const result = useAppSelector(state => state.mail.items.result);

    if (result.total === 0) return <></>;

    return (
        <div className='w-full flex items-center justify-center mt-[16px]'>
            <Pagination
                count={Math.ceil(result.total / filter.pageSize)}
                page={filter.page}
                onChange={(e, page) => dispatch(setFilterValue({ page: page }))}
                variant='outlined'
                color='secondary'
            />
        </div>
    );
};

export default TablePagination;
