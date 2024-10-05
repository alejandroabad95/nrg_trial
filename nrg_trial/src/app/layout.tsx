"use client"; // Esto marca el archivo como un Client Component
import "./styles/globals.scss";
import { SessionProvider } from "next-auth/react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { LanguageProvider } from '../app/context/LanguageContext'; // Importa el LanguageProvider
import { Nunito, Raleway } from 'next/font/google';


// Cargar las fuentes
const nunito = Nunito({
  subsets: ['latin'],
});

const raleway = Raleway({
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en"> {/* Establece el idioma por defecto aquí, pero se puede cambiar */}
      <body className={`${nunito.className} ${raleway.className} flex flex-col min-h-screen`}>
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










