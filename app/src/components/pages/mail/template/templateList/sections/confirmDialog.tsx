import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useAuth } from '@/contexts/AuthContext';
import { deleteRequest } from '@/utils/axios';
import { useRouter } from 'next/navigation';

interface Props {
    open: boolean;
    handleClose: () => void;
    currentId: any;
};


const ConfirmDialog = ({ open, handleClose, currentId }: Props) => {
    const { setPending } = useAuth();
    const router = useRouter();

    const handleDelete = async () => {
        setPending!(true);

        const res = await deleteRequest(`/v0/mail_templates/${currentId}`, null);
            if (res.status == 200) {
                router.push('/mail/template');
            }

        setPending!(false);

    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
            <DialogTitle></DialogTitle>
            <DialogContent>
                <p>
                    本当に削除しますか？ <br />
                    この処理は元に戻せません。
                </p>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDelete} autoFocus color='secondary'>
                    はい
                </Button>
                <Button onClick={handleClose} color='inherit'>
                    いいえ
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;
