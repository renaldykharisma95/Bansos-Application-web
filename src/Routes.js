import {
    UsergroupAddOutlined,
    UserOutlined
} from '@ant-design/icons';

export const Routes = [
    {
        path: '/user-management',
        name: 'User Management',
        icon: <UserOutlined />,
        key: 1
    },
    {
        path: '/bansos-receiver',
        name: 'Penerima Bansos',
        icon: <UsergroupAddOutlined />,
        key: 2
    },
    {
        path: '/add-bansos-receiver',
        name: 'Tambah Penerima Bansos',
        icon: '',
        key: 0
    }
];