import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    template: '%s | My Awesome AI lists',
    default: 'My Awesome AI lists',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-indigo-900/75 via-purple-900/75 to-pink-900/75`}
      >
        <main>
          <div className="grid grid-cols-8 items-center justify-items-center min-h-screen grid-flow-col-dense p-2">
            {children}
          </div>
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-indigo-500">
          Created with love in Almere
        </footer>
      </body>
    </html>
  );
}
