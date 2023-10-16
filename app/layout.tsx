import './globals.css';

import { Suspense } from 'react';
import Navbar from '_components/navbar';
import { AuthContextProvider } from '_context/auth';

export const metadata = {
  title: 'BookStore + NextAuth + Tailwind CSS',
  description:
    'DF typesafe demo for FE 2023.'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <AuthContextProvider>
          <Suspense>
            <Navbar />
          </Suspense>
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
