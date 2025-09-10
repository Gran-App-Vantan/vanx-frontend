"use client";

import "./globals.css";

import { usePathname } from "next/navigation";
import { Header, FooterNavItem } from "@/components/shared/";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();

  return (
    <html lang="ja">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet"/>
      </head>
      <body>
        {pathName === "/" ? <Header />: ""}
        {children}
        {pathName === "/" ? <FooterNavItem />: ""}
      </body>
    </html>
  );
}
