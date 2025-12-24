import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '../styles/theme.css';
import './globals.css';
import ClientThemeProvider from '../context/ClientThemeProvider';
import ThemeToggle from '../components/header/ThemeToggle';
import ErrorBoundary from '../components/ErrorBoundary';
import ReactQueryProvider from '../context/ReactQueryProvider';

const satoshi = localFont({
  src: [
    {
      path: '../assets/fonts/Satoshi-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Satoshi-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Satoshi-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Satoshi-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Satoshi-Black.woff2',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../assets/fonts/Satoshi-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../assets/fonts/Satoshi-LightItalic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../assets/fonts/Satoshi-MediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../assets/fonts/Satoshi-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../assets/fonts/Satoshi-BlackItalic.woff2',
      weight: '900',
      style: 'italic',
    },
  ],
  variable: '--font-satoshi',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Mbarndouka | Full-Stack Developer Portfolio',
    template: '%s | Mbarndouka',
  },
  description:
    'Full-stack developer specializing in React, Next.js, TypeScript, and Node.js. View my portfolio, blog, and get in touch.',
  keywords: [
    'Mbarndouka',
    'Full-Stack Developer',
    'React',
    'Next.js',
    'TypeScript',
    'Web Development',
    'Portfolio',
  ],
  authors: [{ name: 'Mbarndouka' }],
  creator: 'Mbarndouka',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mbarndouka.com',
    title: 'Mbarndouka | Full-Stack Developer Portfolio',
    description:
      'Full-stack developer specializing in React, Next.js, TypeScript, and Node.js.',
    siteName: 'Mbarndouka Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mbarndouka | Full-Stack Developer Portfolio',
    description:
      'Full-stack developer specializing in React, Next.js, TypeScript, and Node.js.',
    creator: '@mbarndouka',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={satoshi.variable}>
      <head />
      <body className={satoshi.className}>
        <ReactQueryProvider>
          <ClientThemeProvider>
            <ErrorBoundary>{children}</ErrorBoundary>
            <ThemeToggle />
          </ClientThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
