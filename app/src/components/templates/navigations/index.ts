import { useAuth } from '@/contexts/AuthContext';

import member from './member';
import admin from './admin';

const useMenuItems = () => {
    const { user } = useAuth();

    if (user && user?.user_info.role.role_id == 'admin')
        return {
            items: [member, admin]
        };
    else if (user && user?.user_info.role.role_id == 'member')
        return {
            items: [member]
        };
    else
        return {
            items: []
        };
};

export default useMenuItems;
