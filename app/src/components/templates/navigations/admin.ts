// assets
import { MdKey, MdDashboard } from 'react-icons/md';
import { LuUsers, LuMail } from 'react-icons/lu';

// constant
const icons = {
    MdDashboard,
    LuUsers,
    LuMail
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'admin',
    title: '管理者',
    caption: '担当管理..',
    type: 'group',
    children: [
        {
            id: 'users',
            title: '担当管理',
            type: 'collapse',
            icon: icons.LuUsers,

            children: [
                {
                    id: 'users-list',
                    title: '担当一覧',
                    type: 'item',
                    url: '/admin/users/',
                    target: true
                },
                {
                    id: 'users-create',
                    title: '担当新規登録',
                    type: 'item',
                    url: '/admin/users/create',
                    target: true
                }
            ]
        },
        {
            id: 'domains',
            title: 'ドメイン管理',
            type: 'collapse',
            icon: icons.LuMail,

            children: [
                {
                    id: 'domains-list',
                    title: 'ドメイン一覧',
                    type: 'item',
                    url: '/admin/domains/',
                    target: true
                },
                {
                    id: 'domains-create',
                    title: 'ドメイン新規登録',
                    type: 'item',
                    url: '/admin/domains/create',
                    target: true
                }
            ]
        }
    ]
};

export default pages;
