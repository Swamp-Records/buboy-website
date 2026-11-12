import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DraggableWindowNav from "./components/DraggableWindowNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Buboy | Gainesville Music Artist",
  description: "Official website of Buboy, a Filipino-American indie rock artist on Swamp Records. Listen to music, watch videos, and find tickets, merch, and the press kit.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="page-shell">
          <img
            src="/star.png"
            alt=""
            aria-hidden="true"
            className="star-image star-image-left"
          />
          <img
            src="/star.png"
            alt=""
            aria-hidden="true"
            className="star-image star-image-center"
          />
          <img
            src="/star.png"
            alt=""
            aria-hidden="true"
            className="star-image star-image-right"
          />
          <DraggableWindowNav />
          {children}
        </div>
      </body>
    </html>
  );
}
