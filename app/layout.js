// app/layout.js
import './globals.css';
import { Inter } from 'next/font/google';
import { ReduxProvider } from './ReduxProvider';
import Navigation from './components/Navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'CRM Application',
  description: 'A modern CRM application built with Next.js and Redux',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <div className="min-h-screen bg-gray-100">
            <Navigation />
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
