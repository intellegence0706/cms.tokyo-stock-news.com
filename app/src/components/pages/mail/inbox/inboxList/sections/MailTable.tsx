import { useEffect, useState } from 'react';
import { useAppSelector } from '@/store/hooks';
// import moment from 'moment';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Drawer, Button } from '@mui/material';
import { setCurrentItem } from '@/store/features/createMails';

import ReplayMailSend from './ReplayMailSend';


const MailTable = () => {
    const result: any = useAppSelector(state => state.mail_inbox.items.result);
    
    const [mailsData, setMailsData]  = useState<any>({mails:[]})
    useEffect(() => {
        result.mails ? setMailsData(result) : setMailsData({mails:[]}) 
    }, [result])


    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleButtonClick = () => {
      setIsDrawerOpen(true);
    };
  
    const handleCloseDrawer = () => {
      setIsDrawerOpen(false);
    };

    return (
        <TableContainer>
            <Table stickyHeader aria-label='sticky table'>
                <TableHead>
                    <TableRow>
                        <TableCell style={{ minWidth: 100 }}>氏名</TableCell>
                        <TableCell style={{ minWidth: 100 }}>メールアドレス</TableCell>
                        <TableCell style={{ minWidth: 100 }}>電話番号</TableCell>
                        <TableCell style={{ minWidth: 100 }}>権限</TableCell>
                        <Button variant="contained" onClick={handleButtonClick}>
                                    メール送信
                        </Button>
                    </TableRow>
                </TableHead>
                <TableBody>
                    { mailsData.mails && mailsData.mails.map((mail: any) => {
                        return (
                            <TableRow hover role='checkbox' tabIndex={-1} key={mail.id}>
                                <TableCell>{mail.subject}</TableCell>
                                <TableCell>{mail.to_header}</TableCell>
                                <TableCell>{mail.to_header}</TableCell>
                                <TableCell>
                                <Button variant="contained" onClick={handleButtonClick}>
                                    メール送信
                                </Button>
                                </TableCell>
                            </TableRow>
                            
                        );
                    })}
                </TableBody>
            </Table>
            <Drawer
                anchor="right"
                open={isDrawerOpen}
                onClose={handleCloseDrawer}
            >
                <div style={{ width: 700 }}>
                    <ReplayMailSend />
                </div>
            </Drawer>
        </TableContainer>
    );
};

export default MailTable;
