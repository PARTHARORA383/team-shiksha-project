import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Assignment By Parth Arora",
  description: "Assignment for request to join team shiksha includes 3 screens , Signup/Signin and a Dashboard with user information",
  openGraph: {
    title: "Assignment By Parth Arora",
    description: "Assignment for request to join team shiksha includes 3 screens , Signup/Signin and a Dashboard with user information",
    images: [
      {
        url: "/Images/hero.png",
        width: 800,
        height: 600,
      },
    ],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
