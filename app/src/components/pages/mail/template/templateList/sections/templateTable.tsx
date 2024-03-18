import { useEffect, useState } from 'react';
import moment from 'moment';
import { useParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearCurrentItem, fetchTemplate } from '@/store/features/mail_template';

import { Link, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { Button } from '@mui/material';

import ConfirmDialog from './confirmDialog';


const TemplateTable = () => {
    const result = useAppSelector(state => state.mail_template.items.result);
    const { id } = useParams();
    const dispatch = useAppDispatch();

    const [currentDialog, setCurrentDialog] = useState('');

    useEffect(() => {
        dispatch(clearCurrentItem());
        dispatch(fetchTemplate(parseInt(`${id}`)));
    }, [id]);

  
    const [templateId, setTemplateId] = useState('')

    const setDelete = (id:any) => {
        setCurrentDialog('delete') ;
        setTemplateId(id);
    }


    return (
        <TableContainer>
            <Table stickyHeader aria-label='sticky table'>
                <TableBody>
                    {result.data.map( template => {
                        return (
                            <TableRow hover role='checkbox' tabIndex={-1} key={template.id}>
                                <TableCell>{moment(template?.created_at).format('YYYY/MM/DD  HH:mm')}</TableCell>
                                <TableCell>{template.subject}</TableCell>
                                <TableCell>{template.body}</TableCell>
                                <TableCell>
                                    <Link href={`/mail/template/update/${template.id}`} color='secondary'>
                                        編集
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        type='button'
                                        variant='contained'
                                        onClick={() => setDelete(template.id)}
                                    >
                                        削除
                                    </Button>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            <ConfirmDialog
                open={currentDialog === 'delete'}
                handleClose={() => setCurrentDialog('')}
                currentId={templateId}
            />
        </TableContainer>
    );
};

export default TemplateTable;
