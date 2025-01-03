import type { Metadata } from "next";
import { Geist, Geist_Mono, Bilbo_Swash_Caps } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bilbo = Bilbo_Swash_Caps({
  display: "swap",
  weight: "400",
  variable: "--font-bilbo",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ahmed's Blog",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${bilbo.variable} antialiased`}
        >
          {/* <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          > */}
          {children}
          {/* </ThemeProvider> */}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
