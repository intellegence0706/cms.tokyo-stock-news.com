import { useAppSelector } from '@/store/hooks';
import moment from 'moment';

import { Link, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const UserTable = () => {
    const filter = useAppSelector(state => state.user.items.filter);
    const result = useAppSelector(state => state.user.items.result);

    return (
        <TableContainer>
            <Table stickyHeader aria-label='sticky table'>
                <TableHead>
                    <TableRow>
                        <TableCell style={{ minWidth: 50 }}>#</TableCell>
                        <TableCell style={{ minWidth: 100 }}>氏名</TableCell>
                        <TableCell>メールアドレス</TableCell>
                        <TableCell style={{ minWidth: 150 }}>電話番号</TableCell>
                        <TableCell style={{ minWidth: 100 }}>権限</TableCell>
                        <TableCell style={{ minWidth: 100 }}>状況</TableCell>
                        <TableCell>登録日</TableCell>
                        <TableCell>更新日</TableCell>
                        <TableCell style={{ minWidth: 100 }}>編集</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {result.data
                        .map(user => {
                            return (
                                <TableRow hover role='checkbox' tabIndex={-1} key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.user_info.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.user_info.phone}</TableCell>
                                    <TableCell>{user.user_info.role.name}</TableCell>
                                    <TableCell>{user.is_active ? '通常' : '停止中'}</TableCell>
                                    <TableCell>{moment(user?.created_at).format('YYYY/MM/DD  HH:mm')}</TableCell>
                                    <TableCell>{moment(user?.updated_at).format('YYYY/MM/DD  HH:mm')}</TableCell>
                                    <TableCell>
                                        <Link href={`/admin/users/${user.id}`} color='secondary'>
                                            編集
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UserTable;
