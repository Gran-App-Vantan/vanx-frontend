"use client";

import "./globals.css";

import { usePathname } from "next/navigation";
import { Header } from "@/components/shared/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  console.log(pathName);

  return (
    <html lang="ja">
      <body>
        {pathName === "/" ? <Header />: ""}
        {children}
      </body>
    </html>
  );
}
