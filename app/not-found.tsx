import { Title, Text } from '@tremor/react';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>404 - Page Not Found</Title>
      <Text>The page you are looking for does not exist.</Text>
      <Link href="/">Go back to the homepage</Link>
    </main>
  );
}
