// "use client"; // Asegúrate de que este archivo sea un componente de cliente

// import Link from 'next/link';
// import { useSession, signOut } from 'next-auth/react';
// import { useLanguage } from '../context/LanguageContext'; // Importa el hook de lenguaje
// import { useState } from 'react';

// const Navbar: React.FC = () => {
//   const { currentLang, setCurrentLang } = useLanguage(); // Obtén el estado del idioma desde el contexto
//   const { data: session } = useSession();
//   const userGroups = session?.user?.groups || [];
  
//   const [isDropdownOpen, setDropdownOpen] = useState(false); // Estado para controlar el menú desplegable

//   const handleLanguageChange = () => {
//     setCurrentLang(currentLang === 'en' ? 'es' : 'en'); // Cambia el idioma al opuesto
//   };

//   const toggleDropdown = () => {
//     setDropdownOpen(!isDropdownOpen); // Cambia el estado de visibilidad del menú
//   };

//   return (
//     <nav className="bg-gray-800 p-4">
//       <div className="container mx-auto flex items-center justify-between">
//         <div className="text-white text-2xl font-bold">
//           <Link href="/">ETRM2</Link>
//         </div>
//         <ul className="flex items-center space-x-4">
//           {session && (
//             <>
//               <li>
//                 <Link href="/deals" className="text-white hover:text-gray-400">
//                   Contratos
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/counterparties" className="text-white hover:text-gray-400">
//                   Contrapartidas
//                 </Link>
//               </li>
//             </>
//           )}

//           {session && userGroups.includes(1) && (
//             <>
//               <li>
//                 <Link href="/users" className="text-white hover:text-gray-400">
//                   Usuarios
//                 </Link>
//               </li>
//               <li>
//                 <Link href="/principals" className="text-white hover:text-gray-400">
//                   Directores
//                 </Link>
//               </li>
//             </>
//           )}

//           {/* Botón de cambio de idioma */}
//           <li>
//             <button
//               onClick={handleLanguageChange}
//               className="text-white hover:text-gray-400"
//             >
//               {currentLang === 'en' ? 'Español' : 'English'}
//             </button>
//           </li>

//           {/* Mi Perfil y opciones de Logout */}
//           {session ? (
//             <li className="relative">
//               <button onClick={toggleDropdown} className="text-white hover:text-gray-400">
//                 Mi Perfil
//               </button>
//               {isDropdownOpen && (
//                 <ul className="absolute right-0 bg-gray-700 text-white shadow-lg">
//                   <li>
//                     <Link href="/change-password" className="block px-4 py-2 hover:bg-gray-600">
//                       Cambiar Contraseña
//                     </Link>
//                   </li>
//                   <li>
//                     <button
//                       onClick={() => {
//                         signOut(); // Sign out
//                         setDropdownOpen(false); // Cierra el menú al hacer logout
//                       }}
//                       className="block px-4 py-2 w-full text-left hover:bg-gray-600"
//                     >
//                       Logout
//                     </button>
//                   </li>
//                 </ul>
//               )}
//             </li>
//           ) : (
//             <li>
//               <Link href="/login" className="text-white hover:text-gray-400">
//                 Login
//               </Link>
//             </li>
//           )}
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;




"use client"; // Asegúrate de que este archivo sea un componente de cliente

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useLanguage } from '../context/LanguageContext'; // Importa el hook de lenguaje
import { useTranslations } from '../../utils/i18n'; // Asegúrate de importar el hook de traducciones
import { useState } from 'react';

const Navbar: React.FC = () => {
  const { currentLang, setCurrentLang } = useLanguage(); // Obtén el estado del idioma desde el contexto
  const translations = useTranslations(currentLang); // Obtén las traducciones para el idioma actual
  const { data: session } = useSession();
  const userGroups = session?.user?.groups || [];
  
  const [isDropdownOpen, setDropdownOpen] = useState(false); // Estado para controlar el menú desplegable

  const handleLanguageChange = () => {
    setCurrentLang(currentLang === 'en' ? 'es' : 'en'); // Cambia el idioma al opuesto
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen); // Cambia el estado de visibilidad del menú
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white text-2xl font-bold">
          <Link href="/">ETRM2</Link>
        </div>
        <ul className="flex items-center space-x-4">
          {session && (
            <>
              <li>
                <Link href="/deals" className="text-white hover:text-gray-400">
                  {translations.contracts} {/* Traducción para Contratos */}
                </Link>
              </li>
              <li>
                <Link href="/counterparties" className="text-white hover:text-gray-400">
                  {translations.counterparties} {/* Traducción para Contrapartidas */}
                </Link>
              </li>
            </>
          )}

          {session && userGroups.includes(1) && (
            <>
              <li>
                <Link href="/users" className="text-white hover:text-gray-400">
                  {translations.users} {/* Traducción para Usuarios */}
                </Link>
              </li>
              <li>
                <Link href="/principals" className="text-white hover:text-gray-400">
                  {translations.principals} {/* Traducción para Directores */}
                </Link>
              </li>
            </>
          )}

          {/* Botón de cambio de idioma */}
          <li>
            <button
              onClick={handleLanguageChange}
              className="text-white hover:text-gray-400"
            >
              {currentLang === 'en' ? 'Español' : 'English'} {/* O puedes usar translations.languageSwitch */}
            </button>
          </li>

          {/* Mi Perfil y opciones de Logout */}
          {session ? (
            <li className="relative">
              <button onClick={toggleDropdown} className="text-white hover:text-gray-400">
                {translations.myProfile} {/* Traducción para Mi Perfil */}
              </button>
              {isDropdownOpen && (
                <ul className="absolute right-0 bg-gray-700 text-white shadow-lg">
                  <li>
                    <Link href="/change-password" className="block px-4 py-2 hover:bg-gray-600">
                      {translations.changePassword} {/* Traducción para Cambiar Contraseña */}
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        signOut(); // Sign out
                        setDropdownOpen(false); // Cierra el menú al hacer logout
                      }}
                      className="block px-4 py-2 w-full text-left hover:bg-gray-600"
                    >
                      {translations.logout} {/* Traducción para Logout */}
                    </button>
                  </li>
                </ul>
              )}
            </li>
          ) : (
            <li>
              <Link href="/login" className="text-white hover:text-gray-400">
                {translations.login} {/* Traducción para Login */}
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
