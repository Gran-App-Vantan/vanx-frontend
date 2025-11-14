"use client";

import "./globals.css";
import { usePathname } from "next/navigation";
import { UserProvider } from "@/contexts/UserContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAuthRoute = pathname?.startsWith('/auth');
  
  return (
    <html lang="ja">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
      </head>
      <body>
        <UserProvider skipInitialFetch={isAuthRoute}>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
