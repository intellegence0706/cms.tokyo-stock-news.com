import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import moment from 'moment';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox } from '@mui/material';
import { Drawer, Button } from '@mui/material';

import { setCurrentItemValue } from '@/store/features/createMails';
import ReplayMailSend from './ReplayMailSend'


const UserTable = () => {
    const dispatch = useAppDispatch();
    const [state, setState] = useState('');


    const filter = useAppSelector(state => state.user.items.filter);
    const result = useAppSelector(state => state.user.items.result);

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleButtonClick = (selectedEmail: string,  id: number) => {
        setIsDrawerOpen(true);
        dispatch(setCurrentItemValue({recipients: id}));


      };
    
      const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
      };

    return (
        <TableContainer>
            <Table stickyHeader aria-label='sticky table'>
                <TableHead>
                    <TableRow>
                        <TableCell style={{ minWidth: 50 }}>ID</TableCell>
                        <TableCell style={{ minWidth: 100 }}>氏名</TableCell>
                        <TableCell>メールアドレス</TableCell>
                        <TableCell style={{ minWidth: 150 }}>電話番号</TableCell>
                        <TableCell style={{ minWidth: 100 }}>権限</TableCell>
                        <TableCell style={{ minWidth: 100 }}>状況</TableCell>
                        <TableCell>登録日</TableCell>
                        <TableCell style={{ minWidth: 100 }}>編集</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {result.data.map(user => {
                        {console.log("user", user)}
                        return (
                            <TableRow hover role='checkbox' tabIndex={0} key={user.id}>
                                <TableCell>
                                    <Checkbox
                                    // checked={checked}
                                    // onChange={handleChange}
                                    // inputProps={{ 'aria-label': 'controlled' }}
                                    /></TableCell>
                                <TableCell>{user.user_info.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.user_info.phone}</TableCell>
                                <TableCell>{user.user_info.role.name}</TableCell>
                                <TableCell>{user.is_active ? '通常' : '停止中'}</TableCell>
                                <TableCell>{moment(user?.created_at).format('YYYY/MM/DD  HH:mm')}</TableCell>
                                <TableCell>
                                    <Button variant="contained" onClick={() => handleButtonClick(user.email, user.id)}>
                                        メール送信
                                    </Button>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
                <Drawer
                anchor="right"
                open={isDrawerOpen}
                onClose={handleCloseDrawer}
                >
                    <div style={{ width: 700 }}>
                        <ReplayMailSend />
                    </div>
                </Drawer>
            </Table>
        </TableContainer>
    );
};

export default UserTable;
