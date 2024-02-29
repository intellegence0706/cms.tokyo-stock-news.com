import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Props {}

const RedirectPage = ({}: Props) => {
    const router = useRouter();

    useEffect(() => {
        router.push(`/dashboard`);
    }, []);

    return null;
};

export default RedirectPage;
