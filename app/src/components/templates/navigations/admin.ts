// assets
import { MdKey, MdDashboard } from 'react-icons/md';
import { LuUsers } from 'react-icons/lu';

// constant
const icons = {
    MdDashboard,
    LuUsers
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'admin',
    title: '管理者',
    caption: 'ユーザー管理..',
    type: 'group',
    children: [
        {
            id: 'users',
            title: 'ユーザー管理',
            type: 'collapse',
            icon: icons.LuUsers,

            children: [
                {
                    id: 'users-list',
                    title: 'ユーザー一覧',
                    type: 'item',
                    url: '/users/',
                    target: true
                },
                {
                    id: 'users-create',
                    title: 'ユーザー新規登録',
                    type: 'item',
                    url: '/users/create',
                    target: true
                }
            ]
        }
    ]
};

export default pages;
