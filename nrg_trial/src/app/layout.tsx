"use client"; // Esto marca el archivo como un Client Component

import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";

import { LanguageProvider } from '../app/context/LanguageContext'; // Importa el LanguageProvider

const inter = Inter({ subsets: ["latin"] });

// Este es un componente de cliente
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en"> {/* Establece el idioma por defecto aquí, pero se puede cambiar */}
      <body className={`${inter.className} flex flex-col min-h-screen`}>
         <LanguageProvider>
        <SessionProvider>
         
            <Navbar /> {/* Navbar aquí */}
            <main className="flex-grow">{children}</main> {/* Contenido principal */}
            <Footer /> {/* Footer aquí */}
         
          </SessionProvider>
         </LanguageProvider>
      </body>
    </html>
  );
}










