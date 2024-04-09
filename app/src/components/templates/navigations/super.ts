import { AiOutlineHome } from 'react-icons/ai';
import { LuDatabaseBackup } from "react-icons/lu";
import { MdOutlineBackup } from "react-icons/md";
// constant
const icons = {
    AiOutlineHome,
    LuDatabaseBackup,
    MdOutlineBackup
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'super',
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
            id: 'backup',
            title: 'バックアップ管理',
            type: 'item',
            url: '/backup',
            icon: icons.MdOutlineBackup,
            breadcrumbs: false
        }
    ]
};

export default pages;
