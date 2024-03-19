import AuthLayout from '@/components/templates/AuthLayout';
import PermissionLayout from '@/components/templates/PermissionLayout';
import MainLayout from '@/components/templates/layout/MainLayout';

const DashboardPage = () => {
    return (
        <AuthLayout>
            <PermissionLayout permission={['customer']} role={['admin', 'member']}>
                <MainLayout>
                    <div></div>
                </MainLayout>
            </PermissionLayout>
        </AuthLayout>
    );
};

export default DashboardPage;
