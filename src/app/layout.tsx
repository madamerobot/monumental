import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Monumental",
  description: "Monumental Robot Crane UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
