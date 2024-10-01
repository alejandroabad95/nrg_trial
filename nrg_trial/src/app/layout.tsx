// src/app/layout.tsx

"use client"; // Esto marca el archivo como un Client Component

import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// Este es un componente de cliente
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <SessionProvider>
          <Navbar /> {/* Navbar aquí */}
          <main className="flex-grow">{children}</main> {/* Contenido principal */}
          <Footer /> {/* Footer aquí */}
        </SessionProvider>
      </body>
    </html>
  );
}
