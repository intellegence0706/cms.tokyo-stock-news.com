import { ReactNode } from 'react';

interface Props {
    children?: ReactNode;
}

const MainLayout = ({ children }: Props) => {
    return <>{children}</>;
};

export default MainLayout;
