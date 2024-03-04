import './globals.css';
import '@/styles/style.css';
import '@/styles/custom.css';
import 'react-perfect-scrollbar/dist/css/styles.css';

import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import DefaultLayout from '@/components/templates/DefaultLayout';

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <head>
                <Suspense>
                    <meta name='keywords' content='' />
                </Suspense>

                <link href='https://fonts.googleapis.com/earlyaccess/notosansjapanese.css' rel='stylesheet' />
                <link href='https://fonts.googleapis.com/css?family=Kosugi' rel='stylesheet' />
            </head>
            <DefaultLayout>
                {children}
                <Analytics />
            </DefaultLayout>
        </html>
    );
}
