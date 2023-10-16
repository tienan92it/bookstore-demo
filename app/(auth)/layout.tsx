/* eslint-disable @next/next/no-async-client-component */
import '../globals.css';

export const metadata = {
  title: 'BookStore + NextAuth + Tailwind CSS',
  description: 'DF typesafe demo for FE 2023.'
};

export default async function AuthLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {children}
    </section>
  );
}
