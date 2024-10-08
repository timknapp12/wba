import type { Metadata } from 'next';
import { inter } from './fonts';
import './globals.css';
import AppProvider from '@/contexts/AppContext';

export const metadata: Metadata = {
  title: 'Twizzin',
  description: 'A game for trivia wizzes',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
