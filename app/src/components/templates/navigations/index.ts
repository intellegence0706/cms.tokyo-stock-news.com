import { useAuth } from '@/contexts/AuthContext';

import member from './member';
import admin from './admin';
import super_list from './super';

const useMenuItems = () => {
    const { user } = useAuth();

    // if (user?.permission === 'owner' || user?.permission === 'super') {
    //     return {
    //         items: [super_list]
    //     };
    // }

    // if (user && user?.user_info.role.role_id == 'admin')
    return {
        items: [admin]
    };
    // else if (user && user?.user_info.role.role_id == 'member')
    //     return {
    //         items: [member]
    //     };
    // else
    //     return {
    //         items: []
    //     };
};

export default useMenuItems;
