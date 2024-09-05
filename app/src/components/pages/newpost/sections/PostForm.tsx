
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { Checkbox, TextField } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import FormLabel from '@/components/atoms/FormLabel';

const PostForm = () => {
    const dispatch = useAppDispatch();
    

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        right: 0,
        whiteSpace: 'nowrap',
        width: 'max-content'
    });
    
    return (
        <>
            {/* ************************************************************************ */}
            <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                <FormLabel className='min-w-[134px] mt-[10px]'>予定日時</FormLabel>
                <div className='w-full flex gap-[8px]'>
                    <TextField
                        type='date'
                        size='small'
                        fullWidth
                        // value={currentItem.deposit_date}
                        // onChange={e => dispatch(setCurrentItemValue({ deposit_date: e.target.value }))}
                        // error={errors.deposit_date ? true : false}
                        // helperText={errors.deposit_date ? errors.deposit_date : ''}
                    />
                    <TextField
                        type='time'
                        size='small'
                        fullWidth
                        // value={currentItem.deposit_date}
                        // onChange={e => dispatch(setCurrentItemValue({ deposit_date: e.target.value }))}
                        // error={errors.deposit_date ? true : false}
                        // helperText={errors.deposit_date ? errors.deposit_date : ''}
                    />
                </div>
            </div>

            {/* ************************************************************************ */}
            <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                <FormLabel className='min-w-[134px] mt-[10px]'>すぐに対応</FormLabel>
                <div className='w-full flex gap-[8px]'>
                    <Checkbox
                        size='small'
                        defaultChecked
                        // value={currentItem.deposit_date}
                        // onChange={e => dispatch(setCurrentItemValue({ deposit_date: e.target.value }))}
                        // error={errors.deposit_date ? true : false}
                        // helperText={errors.deposit_date ? errors.deposit_date : ''}
                    />
                </div>
            </div>

            {/* ************************************************************************ */}
            <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                <FormLabel className='min-w-[134px] mt-[10px]'>アカウントを選択</FormLabel>
                <div className='w-full flex gap-[8px]'>
                    <FormControlLabel
                        value="Youtube"
                        control={<Checkbox 
                                size='small'
                                defaultChecked
                            />}
                        label="Youtube"
                        labelPlacement="end"
                        />
                    <FormControlLabel
                        value="Instagram"
                        control={<Checkbox 
                                size='small'
                                defaultChecked
                            />}
                        label="Instagram"
                        labelPlacement="end"
                        />
                    <FormControlLabel
                        value="Tiktok"
                        control={<Checkbox 
                                size='small'
                                defaultChecked
                            />}
                        label="Tiktok"
                        labelPlacement="end"
                        />
                </div>
            </div>

            {/* ************************************************************************ */}
            <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                <div className='w-full flex gap-[8px]'>
                    <TextField
                        placeholder="見出しを入力してください。。。"
                        multiline
                        fullWidth
                        rows={2}
                        maxRows={4}
                    />
                </div>
            </div>

            {/* ************************************************************************ */}
            <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                <div className='w-full flex gap-[8px]'>
                    <TextField
                        placeholder="内容を入力してください。。。"
                        multiline
                        fullWidth
                        rows={6}
                        maxRows={8}
                    />
                </div>
            </div>

            {/* ************************************************************************ */}
            <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px] w-[max-content]'>
                <div className='flex gap-[8px]'>
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                        >
                        Upload files
                        <VisuallyHiddenInput
                            type="file"
                            onChange={(event) => console.log(event.target.files)}
                            multiple
                        />
                        </Button>
                </div>
            </div>

            
        </>
    );
};

export default PostForm;
