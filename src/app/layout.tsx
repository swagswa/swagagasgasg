import type { Metadata } from "next";
import "./globals.css";
import { Bodoni_Moda } from 'next/font/google';
import AnimationProvider from './components/AnimationProvider';

const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: "SAS Art Fashion Gallery",
  description: "Частная закрытая галерея",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className={bodoni.className}>
        <AnimationProvider>
          {children}
        </AnimationProvider>
      </body>
    </html>
  );
}