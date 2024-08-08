import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { NextUIProvider } from "@nextui-org/react";
// Local
import "./globals.css";

const fontFace = Poppins({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "AI Resume Refiner",
  description: "Created by Abhishek Murthy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={fontFace.className}>
        <NextUIProvider>{children}</NextUIProvider>
      </body>
    </html>
  );
}
