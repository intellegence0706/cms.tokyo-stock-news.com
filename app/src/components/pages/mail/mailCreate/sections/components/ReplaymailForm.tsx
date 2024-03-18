import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setCurrentItemValue } from '@/store/features/createMails';

import { MenuItem, Select, TextField } from '@mui/material';


import FormLabel from '@/components/atoms/FormLabel';
import { fetchTemplates } from '@/store/features/mail_template';

const ReplayMailForm = () => {
    const dispatch = useAppDispatch();

    const result = useAppSelector(state => state.mail_template.items.result);
    // const template = useAppSelector(state => state.mail_template.item.form);
    const currentItem = useAppSelector(state => state.createMails.item.form);
    const errors = useAppSelector(state => state.createMails.item.errors);

    useEffect(() => {
        dispatch(fetchTemplates());
    }, []);

    return (
        <>
            <div className='flex flex-coltemplates sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                <FormLabel className='min-w-[134px] mt-[10px]'>受信者</FormLabel>
                <div className='w-full lg:max-w-[420px] flex gap-[8px]'>
                    <TextField
                        size='small'
                        fullWidth
                        value={currentItem.recipients}
                        // onChange={e => dispatch(setCurrentItemValue({ recipients: e.target.value }))}
                        error={errors.recipients ? true : false}
                        helperText={errors.recipients ? errors.recipients : ''}
                        disabled
                    />
                </div>
            </div>

            <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                <FormLabel className='min-w-[134px] mt-[10px]'>タイトル</FormLabel>
                <div className='w-full lg:max-w-[420px] flex gap-[8px]'>
                    <TextField
                        size='small'
                        fullWidth
                        value={currentItem.subject}
                        onChange={e => dispatch(setCurrentItemValue({ subject: e.target.value }))}
                        error={errors.subject ? true : false}
                        helperText={errors.subject ? errors.subject : ''}   
                    />
                </div>
                
            </div>

            <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px] w-[87%]'>
            <FormLabel className='min-w-[134px] mt-[10px]'>氏名</FormLabel>
                <Select
                        fullWidth
                        size='small'
                        // value={template.subject}
                        onChange={e => dispatch(setCurrentItemValue({ templates: e.target.value }))}
                        error={errors.templates ? true : false}
                    >
                        <MenuItem value={0}>選択する</MenuItem>
                        {result.data.map(list => (
                            <MenuItem value={list.id} key={list.id}>
                                {list.subject}
                            </MenuItem>
                        ))}
                    </Select>
            </div>


            <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                <FormLabel className='min-w-[134px] mt-[10px]'>メール内容</FormLabel>
                <div className='w-full lg:max-w-[420px] flex gap-[8px]'>
                    <TextField
                        size='small'
                        fullWidth
                        multiline={true}
                        inputProps={{
                            style: {
                              height: '250px',
                              padding: '0 14px',
                            },
                        }}
                        value={currentItem.body}
                        onChange={e => dispatch(setCurrentItemValue({ body: e.target.value }))}
                        error={errors.body ? true : false}
                        helperText={errors.body ? errors.body : ''}
                    />
                </div>
            </div>

        </>
    );
};

export default ReplayMailForm;
