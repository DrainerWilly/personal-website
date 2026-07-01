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
  title: "William",
  description:
    "Personal Website for William, CS and Math Double Major at the University of Rochester.",
  keywords: [
    "William",
    "Mertkan Karaaslan",
    "Software Engineer",
    "Computer Science",
    "Mathematics",
    "University of Rochester",
    "Research Assistant",
    "AI",
    "Machine Learning",
  ],
  authors: [{ name: "William" }],
  openGraph: {
    title: "William",
    description:
      "Computer Science & Mathematics student at the University of Rochester.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');document.documentElement.classList.toggle('dark',t!=='light')}catch(e){}`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
