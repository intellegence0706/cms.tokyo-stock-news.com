// assets
import { MdKey, MdDashboard } from 'react-icons/md';
import { LuUsers, LuMail } from 'react-icons/lu';
import { AiOutlineHome } from 'react-icons/ai';
import { RiCustomerService2Line } from 'react-icons/ri';
import { LuClipboardEdit } from "react-icons/lu";

// constant
const icons = {
    MdDashboard,
    LuUsers,
    LuClipboardEdit,
    RiCustomerService2Line,
    AiOutlineHome
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'admin',
    type: 'group',
    children: [
        {
            id: 'default',
            title: 'トップページ',
            type: 'item',
            url: '/dashboard',
            icon: icons.AiOutlineHome,
            breadcrumbs: false
        },
        {
            id: 'snsaccounts',
            title: 'SNSアカウント管理',
            type: 'collapse',
            icon: icons.RiCustomerService2Line,

            children: [
                {
                    id: 'customers-list',
                    title: '接続されたSNSアカウントリスト',
                    type: 'item',
                    url: '/snsaccounts',
                    target: true
                },
                {
                    id: 'customers-create',
                    title: 'SNSアカウント新規登録',
                    type: 'item',
                    url: '/snsaccounts/create',
                    target: true
                }
            ]
        },
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
                    url: '/admin/users/',
                    target: true
                },
                {
                    id: 'users-create',
                    title: 'ユーザー新規登録',
                    type: 'item',
                    url: '/admin/users/create',
                    target: true
                }
            ]
        },
        {
            id: 'domains',
            title: '新規投稿',
            type: 'collapse',
            icon: icons.LuClipboardEdit,

            children: [
                {
                    id: 'domains-list',
                    title: '新規投稿',
                    type: 'item',
                    url: '/new_post',
                    target: true
                },
                // {
                //     id: 'domains-create',
                //     title: '新規投稿',
                //     type: 'item',
                //     url: '/admin/domains/create',
                //     target: true
                // }
            ]
        }
    ]
};

export default pages;
