import { useState } from 'react';
import { ICustomer } from '@/interfaces';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCurrentItemValue } from '@/store/features/mail';
import moment from 'moment';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, Button } from '@mui/material';
import customer from '@/store/features/customer';

const CustomerTable = () => {
    const dispatch = useAppDispatch();
    const [state, setState] = useState('');

    const filter = useAppSelector(state => state.customer.items.filter);
    const result = useAppSelector(state => state.customer.items.result);
    const currentItem = useAppSelector(state => state.mail.item.form);

    const handleCheckCustomer = (customer: ICustomer) => {
        if (currentItem.recipients.findIndex(item => item.id == customer.id) == -1) {
            dispatch(
                setCurrentItemValue({
                    recipients: [...currentItem.recipients, customer]
                })
            );
        } else {
            dispatch(
                setCurrentItemValue({
                    recipients: currentItem.recipients.filter(item => item.id != customer.id)
                })
            );
        }
    };

    return (
        <div className='w-full'>
            {currentItem.recipients.length > 0 && (
                <div className='w-full flex items-center justify-end mb-3'>
                    <Button variant='contained' onClick={() => dispatch(setCurrentItemValue({ open: true }))}>
                        <span className='whitespace-nowrap'>メール送信する</span>
                    </Button>
                </div>
            )}
            <TableContainer>
                <Table stickyHeader aria-label='sticky table'>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ minWidth: 50 }}>ID</TableCell>
                            <TableCell style={{ minWidth: 100 }}>氏名</TableCell>
                            <TableCell>メールアドレス</TableCell>
                            <TableCell style={{ minWidth: 150 }}>電話番号</TableCell>
                            <TableCell style={{ minWidth: 100 }}>属性</TableCell>
                            <TableCell style={{ minWidth: 100 }}>ステータス</TableCell>
                            <TableCell style={{ minWidth: 100 }}>システム提供</TableCell>
                            <TableCell>登録日</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {result.data.map(customer => {
                            return (
                                <TableRow hover role='checkbox' tabIndex={0} key={customer.id}>
                                    <TableCell>
                                        <Checkbox
                                            checked={
                                                currentItem.recipients.findIndex(item => item.id == customer.id) > -1
                                            }
                                            onChange={() => handleCheckCustomer(customer)}
                                        />
                                    </TableCell>
                                    <TableCell>{customer.name}</TableCell>
                                    <TableCell>{customer.email}</TableCell>
                                    <TableCell>{customer.phone}</TableCell>
                                    <TableCell>{customer.status?.name}</TableCell>
                                    <TableCell>{customer.property?.name}</TableCell>
                                    <TableCell>{customer.system_provided ? 'OK' : 'NG'}</TableCell>
                                    <TableCell>{moment(customer?.created_at).format('YYYY/MM/DD  HH:mm')}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default CustomerTable;
