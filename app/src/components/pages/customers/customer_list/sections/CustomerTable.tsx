import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setFilterValue } from '@/store/features/customer';
import moment from 'moment';

import { Button, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import UserAnalysisDialog from '../components/UserAnalysisDialog';
import SorterItem from '../components/SorterItem';

interface Props {
    search_url?: string;
}

const CustomerTable = ({ search_url }: Props) => {
    const { user } = useAuth();
    const router = useRouter();
    const dispatch = useAppDispatch();

    const [currentUserId, setCurrentUserId] = useState<number | null>(null);
    const filter = useAppSelector(state => state.customer.items.filter);
    const result = useAppSelector(state => state.customer.items.result);

    return (
        <>
            <TableContainer>
                <Table stickyHeader aria-label='sticky table'>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ minWidth: 50 }}>
                                <SorterItem
                                    label='No'
                                    value='id'
                                    current={filter.order_by}
                                />
                            </TableCell>
                            <TableCell style={{ minWidth: 100 }}>
                                <SorterItem
                                    label='social type'
                                    value='ads'
                                    current={filter.order_by}
                                />
                            </TableCell>
                            <TableCell style={{ minWidth: 130 }}>
                                <SorterItem
                                    label='User ID'
                                    value='userid'
                                    current={filter.order_by}
                                />
                            </TableCell>
                            <TableCell style={{ minWidth: 100 }}>
                                <SorterItem
                                    label='Password'
                                    value='password'
                                    current={filter.order_by}
                                />
                            </TableCell>
                            <TableCell style={{ minWidth: 100 }}>
                                <SorterItem
                                    label='登録日'
                                    value='created_at'
                                    current={filter.order_by}
                                />
                            </TableCell>
                            <TableCell style={{ minWidth: 100 }}>編集</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {result.data.map(customer => {
                            
                            return (
                                <TableRow
                                    hover
                                    role='checkbox'
                                    tabIndex={-1}
                                    key={customer.id}
                                    className=' hover:cursor-pointer'
                                    onClick={() => router.push(`/customers/${customer.id}?${search_url}`)}
                                >
                                    <TableCell>{customer.id}</TableCell>
                                    <TableCell>{customer.ads}</TableCell>
                                    <TableCell>{customer.userid}</TableCell>
                                    <TableCell>{customer.password}</TableCell>
                                    <TableCell>{moment(customer?.created_at).format('YYYY/MM/DD  HH:mm')}</TableCell>
                                    <TableCell>
                                        <Link href={`/snsaccounts/${customer.id}?${search_url}`} color='secondary'>
                                            編集
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            );
                        })}

                        {result.data.length === 0 && (
                            <TableRow className='h-[100px]'>
                                <TableCell colSpan={user?.user_info.role.role_id == 'admin' ? 15 : 14} align='center'>
                                    <div className='w-full flex flex-col items-center justify-center gap-3'>
                                        <FolderOpenIcon sx={{ fontSize: 100 }} className='text-[#697586]' />
                                        <p>
                                            接続されているアカウントがありません。
                                        </p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <UserAnalysisDialog userId={currentUserId} onClose={() => setCurrentUserId(null)} />
        </>
    );
};

export default CustomerTable;
