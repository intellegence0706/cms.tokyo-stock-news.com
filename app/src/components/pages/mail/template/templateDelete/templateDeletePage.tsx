import { FormEvent, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { deleteRequest, patchRequest } from '@/utils/axios';
import { useAuth } from '@/contexts/AuthContext';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearCurrentItem, clearError, fetchTemplate, setError } from '@/store/features/mail_template';


import ConfirmDialog from './sections/confirmDialog';

const TemplateDeletePage = () => {
    const router = useRouter();
    const { id } = useParams();
    const { setPending } = useAuth();
    const dispatch = useAppDispatch();

    const [currentDialog, setCurrentDialog] = useState('');
    const currentItem = useAppSelector(state => state.mail_template.item.form);

    useEffect(() => {
        dispatch(clearCurrentItem());
        dispatch(fetchTemplate(parseInt(`${id}`)));
        setCurrentDialog('delete');
    }, []);

    const handleDelete = async () => {
        setPending!(true);

        const res = await deleteRequest(`/v0/mail_templates/${currentItem.id}`, null);
        if (res.status == 200) {
            router.push('/mail/template');
        }

        setPending!(false);
    };

    return (
            <ConfirmDialog
                open={currentDialog === 'delete'}
                handleClose={() => setCurrentDialog('')}
                handleConfirm={handleDelete}
            />
    );
};

export default TemplateDeletePage;
