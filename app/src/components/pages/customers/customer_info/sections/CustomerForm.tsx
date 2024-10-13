import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCurrentItemValue } from '@/store/features/customer';
import { fetchPropertyData, fetchStatusData } from '@/store/features/shared_data';

import { MenuItem, Select, TextField } from '@mui/material';
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
            {/* ************************************************************************ */}
            <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                <FormLabel className='min-w-[134px] mt-[10px]'>No</FormLabel>
                <div className='w-full flex gap-[8px]'>
                    <TextField size='small' fullWidth value={currentItem.id} />
                </div>
            </div>
        </>
    );
};

export default CustomerForm;
