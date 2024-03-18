import { useAppSelector } from '@/store/hooks';
import moment from 'moment';

import { Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const MailTemplateTable = () => {
    const filter = useAppSelector(state => state.mail_template.items.filter);
    const result = useAppSelector(state => state.mail_template.items.result);

    return (
        <TableContainer>
            <Table stickyHeader aria-label='sticky table'>
                <TableHead>
                    <TableRow>
                        <TableCell style={{ minWidth: 50 }}>ID</TableCell>
                        <TableCell style={{ minWidth: 100 }}>件名</TableCell>
                        <TableCell style={{ minWidth: 100 }}>投稿者</TableCell>
                        <TableCell>登録日時</TableCell>
                        <TableCell>更新日時</TableCell>
                        <TableCell style={{ minWidth: 100 }}>編集</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {result.data.map(template => {
                        return (
                            <TableRow hover role='checkbox' tabIndex={-1} key={template.id}>
                                <TableCell>{template.id}</TableCell>
                                <TableCell>{template.subject}</TableCell>
                                <TableCell>{template.publisher.user_info.name}</TableCell>
                                <TableCell>{moment(template?.created_at).format('YYYY/MM/DD  HH:mm')}</TableCell>
                                <TableCell>{moment(template?.updated_at).format('YYYY/MM/DD  HH:mm')}</TableCell>
                                <TableCell>
                                    <Link href={`/mail/templates/${template.id}`} color='secondary'>
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

export default MailTemplateTable;
