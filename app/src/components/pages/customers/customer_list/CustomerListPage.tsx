import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchCustomers, reset } from '@/store/features/customer';
import { fetchPropertyData, fetchStatusData } from '@/store/features/shared_data';

import AuthLayout from '@/components/templates/AuthLayout';
import PermissionLayout from '@/components/templates/PermissionLayout';
import MainLayout from '@/components/templates/layout/MainLayout';
import TitleBar from '@/components/atoms/TitleBar';
import MainPannel from '@/components/atoms/MainPannel';
import Filter from './sections/Filter';
import CustomerTable from './sections/CustomerTable';
import TablePagination from './sections/TablePagination';

const CustomerListPage = () => {
    const dispatch = useAppDispatch();

    const filter = useAppSelector(state => state.customer.items.filter);
    const result = useAppSelector(state => state.customer.items.result);

    useEffect(() => {
        dispatch(fetchStatusData());
        dispatch(fetchPropertyData());

        return () => {
            dispatch(reset());
        };
    }, []);

    useEffect(() => {
        dispatch(fetchCustomers(filter));
    }, [filter]);

    return (
        <AuthLayout>
            <PermissionLayout permission={['customer']} role={['admin', 'member']}>
                <MainLayout>
                    <TitleBar>顧客一覧</TitleBar>

                    <MainPannel>
                        <Filter />
                        <CustomerTable />
                        <TablePagination />
                    </MainPannel>
                </MainLayout>
            </PermissionLayout>
        </AuthLayout>
    );
};

export default CustomerListPage;
