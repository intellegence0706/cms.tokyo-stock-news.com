import { FormEvent, useEffect } from 'react';
import { getRequest, postRequest } from '@/utils/axios';
import { useAuth } from '@/contexts/AuthContext';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { clearError, setCurrentItem, setCurrentItemValue, setError } from '@/store/features/profile';
import { fetchRoleData } from '@/store/features/shared_data';

import { Button, MenuItem, Select, TextField } from '@mui/material';
import FormLabel from '@/components/atoms/FormLabel';
import TitleBar from '@/components/atoms/TitleBar';
import MainPannel from '@/components/atoms/MainPannel';

const ProfileForm = () => {
    const { refresh, setPending, user } = useAuth();
    const dispatch = useAppDispatch();

    const currentItem = useAppSelector(state => state.profile.item.form);
    const errors = useAppSelector(state => state.profile.item.errors);
    const shared_data = useAppSelector(state => state.shared_data);

    useEffect(() => {
        fetchProfile();
        dispatch(fetchRoleData());
    }, []);

    const fetchProfile = async () => {
        const res = await getRequest(`/profile`);
        if (res.status == 200) {
            dispatch(setCurrentItem(res.data));
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setPending!(true);

        const res = await postRequest(`/profile`, currentItem);

        if (res.status == 200) {
            dispatch(clearError());
            refresh && refresh();
        }
        if (res.status == 422 && res.data.errors) {
            dispatch(setError(res.data.errors));
        }

        setPending!(false);
    };

    return (
        <div>
            <TitleBar>アカウント情報</TitleBar>

            <MainPannel>
                <form className='w-full flex flex-col gap-[10px]' onSubmit={handleSubmit}>
                    {/* ************************************************************************ */}
                    <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                        <FormLabel className='min-w-[134px] mt-[10px]'>氏名</FormLabel>
                        <div className='w-full lg:max-w-[420px] flex gap-[8px]'>
                            <TextField
                                size='small'
                                fullWidth
                                value={currentItem.last_name}
                                onChange={e => dispatch(setCurrentItemValue({ last_name: e.target.value }))}
                                error={errors.last_name ? true : false}
                                helperText={errors.last_name ? errors.last_name : ''}
                            />
                            <TextField
                                size='small'
                                fullWidth
                                value={currentItem.first_name}
                                onChange={e => dispatch(setCurrentItemValue({ first_name: e.target.value }))}
                                error={errors.first_name ? true : false}
                                helperText={errors.first_name ? errors.first_name : ''}
                            />
                        </div>
                    </div>

                    {/* ************************************************************************ */}
                    <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                        <FormLabel className='min-w-[134px] mt-[10px]'>氏名(ふりがな)</FormLabel>
                        <div className='w-full lg:max-w-[420px] flex gap-[8px]'>
                            <TextField
                                size='small'
                                fullWidth
                                value={currentItem.last_name_furi}
                                onChange={e => dispatch(setCurrentItemValue({ last_name_furi: e.target.value }))}
                                error={errors.last_name_furi ? true : false}
                                helperText={errors.last_name_furi ? errors.last_name_furi : ''}
                            />
                            <TextField
                                size='small'
                                fullWidth
                                value={currentItem.first_name_furi}
                                onChange={e => dispatch(setCurrentItemValue({ first_name_furi: e.target.value }))}
                                error={errors.first_name_furi ? true : false}
                                helperText={errors.first_name_furi ? errors.first_name_furi : ''}
                            />
                        </div>
                    </div>

                    {/* ************************************************************************ */}
                    <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                        <FormLabel className='min-w-[134px] mt-[10px]'>メールアドレス</FormLabel>
                        <div className='w-full lg:max-w-[420px] flex gap-[8px]'>
                            <TextField
                                size='small'
                                fullWidth
                                value={currentItem.email}
                                onChange={e => dispatch(setCurrentItemValue({ email: e.target.value }))}
                                error={errors.email ? true : false}
                                helperText={errors.email ? errors.email : ''}
                            />
                        </div>
                    </div>

                    {/* ************************************************************************ */}
                    <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                        <FormLabel className='min-w-[134px] mt-[10px]'>電話番号</FormLabel>
                        <div className='w-full lg:max-w-[420px] flex gap-[8px]'>
                            <TextField
                                size='small'
                                fullWidth
                                value={currentItem.phone}
                                onChange={e => dispatch(setCurrentItemValue({ phone: e.target.value }))}
                                error={errors.phone ? true : false}
                                helperText={errors.phone ? errors.phone : ''}
                            />
                        </div>
                    </div>

                    {/* ************************************************************************ */}
                    {user?.permission == 'customer' && (
                        <div className='flex flex-col sm:flex-row sm:items-start gap-[4px] sm:gap-[16px]'>
                            <FormLabel className='min-w-[134px] mt-[10px]'>権限</FormLabel>
                            <div className='w-full lg:max-w-[420px] flex gap-[8px]'>
                                <Select
                                    fullWidth
                                    size='small'
                                    value={currentItem.role}
                                    onChange={e => dispatch(setCurrentItemValue({ role: e.target.value }))}
                                    readOnly
                                >
                                    {shared_data.role_data.map(role => (
                                        <MenuItem value={role.id} key={role.id}>
                                            {role.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </div>
                        </div>
                    )}

                    {/* ************************************************************************ */}
                    <div className='mt-[16px]'>
                        <Button type='submit' variant='contained' color='secondary'>
                            保存する
                        </Button>
                    </div>
                </form>
            </MainPannel>
        </div>
    );
};

export default ProfileForm;
