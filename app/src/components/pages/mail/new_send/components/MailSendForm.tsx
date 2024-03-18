
import { postRequest } from '@/utils/axios';
import { useAuth } from '@/contexts/AuthContext';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearCurrentItem, setCurrentItemValue, setError } from '@/store/features/mail';

import { IoClose } from 'react-icons/io5';
import { Button, Drawer, IconButton, MenuItem, Select, TextField } from '@mui/material';
import FormLabel from '@/components/atoms/FormLabel';

interface Props {}

const MailSendForm = ({}: Props) => {
    const dispatch = useAppDispatch();
    const { setPending } = useAuth();

    const currentItem = useAppSelector(state => state.mail.item.form);
    const errors = useAppSelector(state => state.mail.item.errors);
    const templates = useAppSelector(state => state.mail_template.items.result)

    const handleClose = () => {
        dispatch(setCurrentItemValue({ open: false }));
    };

    const handleSelectTemplate  =(template_id: number) => {
        const template = templates.data.find(item => item.id == template_id)

        if(template){
            dispatch(setCurrentItemValue({
                subject: template.subject,
                body: template.body
            }))
        }else{
            dispatch(setCurrentItemValue({
                subject: "",
                body: ""
            }))
        }
    }

    const handleSubmit = async () => {
        const payload = {
            recipients: currentItem.recipients.map(item => item.id),
            subject: currentItem.subject,
            body: currentItem.body
        }
        
        setPending!(true);
        const res = await postRequest(`/v0/mails/new_send`, payload)
        if(res.status == 200){
            dispatch(clearCurrentItem())
        }
        
        if (res.status == 422 && res.data.errors) {
            dispatch(setError(res.data.errors));
        }

        setPending!(false);
    }

    return (
        <Drawer open={currentItem.open} onClose={handleClose} anchor='right'>
            <div className='w-full flex items-center justify-end'>
                <IconButton className='' onClick={handleClose}>
                    <IoClose />
                </IconButton>
            </div>

            <div className='w-[calc(100vw-30px)] max-w-[1000px] flex flex-col gap-3 px-3 py-10'>
                {/* *************************************************************************************** */}
                <div className='w-full flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                    <FormLabel className='min-w-[134px] mt-[10px]'>受け取る人</FormLabel>
                    <div className='w-full flex gap-[8px]'>
                        <TextField
                            size='small'
                            fullWidth
                            value={currentItem.recipients.map(item => item.name).join(", ")}
                            error={errors.recipients}
                            helperText={errors.recipients}
                        />
                    </div>
                </div>
                
                {/* *************************************************************************************** */}
                <div className='w-full flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                    <FormLabel className='min-w-[134px] mt-[10px]'>署名</FormLabel>
                    <div className='w-full flex gap-[8px]'>
                        <Select
                            fullWidth
                            size='small'
                            defaultValue={0}
                            onChange={e => handleSelectTemplate(e.target.value as number)}
                        >
                            <MenuItem value={0}>選択する</MenuItem>
                            {templates.data.map(template => (
                                <MenuItem value={template.id} key={template.id}>
                                    {template.subject}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                </div>

                {/* *************************************************************************************** */}
                <div className='w-full flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                    <FormLabel className='min-w-[134px] mt-[10px]'>件名</FormLabel>
                    <div className='w-full flex gap-[8px]'>
                        <TextField
                            size='small'
                            fullWidth
                            value={currentItem.subject}
                            onChange={e => dispatch(setCurrentItemValue({ subject: e.target.value }))}
                            error={errors.subject}
                            helperText={errors.subject}
                        />
                    </div>
                </div>

                {/* *************************************************************************************** */}
                <div className='w-full flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                    <FormLabel className='min-w-[134px] mt-[10px]'>内容</FormLabel>
                    <div className='w-full flex gap-[8px]'>
                        <TextField
                            size='small'
                            fullWidth
                            multiline
                            rows={20}
                            value={currentItem.subject}
                            onChange={e => dispatch(setCurrentItemValue({ subject: e.target.value }))}
                            error={errors.subject}
                            helperText={errors.subject}
                        />
                    </div>
                </div>

                {/* *************************************************************************************** */}
                <div className='w-full flex items-center justify-center gap-3'>
                    <Button variant="contained" onClick={handleSubmit}>送信する</Button>
                    <Button onClick={handleClose}>キャンセル</Button>
                </div>
            </div>
        </Drawer>
    );
};

export default MailSendForm;
