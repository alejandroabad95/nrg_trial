// export default Navbar;
"use client"; 
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useLanguage } from '../context/LanguageContext'; 
import { useTranslations } from '../../utils/i18n'; 
import { useState } from 'react';
import styles from "../styles/componentStyles/Navbar.module.scss"

const Navbar: React.FC = () => {
  const { currentLang, setCurrentLang } = useLanguage(); 
  const translations = useTranslations(currentLang); 
  const { data: session } = useSession();
  const userGroups = session?.user?.groups || [];
  const [isDropdownOpen, setDropdownOpen] = useState(false); 

  const handleLanguageChange = () => {
    setCurrentLang(currentLang === 'en' ? 'es' : 'en'); 
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen); 
  };

  return (
    <nav className="p-4">
      <div className="container flex items-center justify-between">
        

        <ul>
        <li className={styles['nav-title']}> 
          <Link href="/" >ETRM2</Link>
        </li>
        </ul>



        <ul className="flex items-center space-x-6">
          {session && (
            <>
              <li>
                <Link href="/deals">
                  {translations.contracts} {/* Traducción para Contratos */}
                </Link>
              </li>
              <li>
                <Link href="/counterparties">
                  {translations.counterparties} {/* Traducción para Contrapartidas */}
                </Link>
              </li>
            </>
          )}

          {session && userGroups.includes(1) && (
            <>
              <li>
                <Link href="/users">
                  {translations.users} {/* Traducción para Usuarios */}
                </Link>
              </li>
              <li>
                <Link href="/principals">
                  {translations.principals} {/* Traducción para Directores */}
                </Link>
              </li>
            </>
          )}

          {/* Mi Perfil y opciones de Logout <ul className="absolute right-0 bg-gray-700"> */}
          {session ? (
            <li className="relative">
              <button onClick={toggleDropdown}>
                {translations.myProfile} {/* Traducción para Mi Perfil */}
              </button>
              {isDropdownOpen && (

                
                
                <ul className={`${styles.dropdown} absolute right-0`}>

                  <li>
                    <Link href="/change-password">
                      {translations.changePassword} {/* Traducción para Cambiar Contraseña */}
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        signOut(); // Sign out
                        setDropdownOpen(false); // Cierra el menú al hacer logout
                      }}
                    >
                      {translations.logout} {/* Traducción para Logout */}
                    </button>
                  </li>
                </ul>
              )}
            </li>
          ) : (
            <li>
              <Link href="/login">
                {translations.login} {/* Traducción para Login */}
              </Link>
            </li>
          )}

          {/* Botón de cambio de idioma */}
          <li>
            <button
              className={`${styles['translate-button']}`}
              onClick={handleLanguageChange}
              aria-haspopup="true"
              aria-expanded={isDropdownOpen}
            >
              <span className="font-bold">{currentLang === 'en' ? 'ES' : 'EN'}</span> {/* Código del idioma */}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
