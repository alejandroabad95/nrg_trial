// "use client"; // Asegúrate de que este archivo sea un componente de cliente

// import { useEffect, useState } from 'react';
// import { getSession } from 'next-auth/react';
// import UsersTable from '../components/UsersTable'; // Asegúrate de que la ruta sea correcta
// import { useLanguage } from '../context/LanguageContext'; // Importa el contexto de lenguaje
// import { useTranslations } from '../../utils/i18n'; // Asegúrate de que esta ruta sea correcta

// interface User {
//   id: string;          // El ID del usuario, es un string que representa un UUID
//   username: string;    // El nombre de usuario, un string
//   groups: string[];    // Un array de strings que representan los grupos a los que pertenece el usuario
//   is_staff: boolean;   // Un booleano que indica si el usuario tiene permisos de personal administrativo
// }

// export default function UsersPage() {
//   const { currentLang } = useLanguage(); // Obtiene el idioma actual desde el contexto
//   const translations = useTranslations(currentLang); // Obtiene las traducciones según el idioma actual

//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const session = await getSession();

//       if (!session || !session.accessToken) {
//         setError(translations.notAuthorized || 'No estás autorizado');
//         setLoading(false);
//         return;
//       }


//       try {
//         const response = await fetch('/api/users', {
//           headers: {
//             Authorization: `Token ${session.accessToken}`, // Asegúrate de usar "Token"
//           },
//         });

//         if (!response.ok) {
//           const errorText = await response.text(); // Captura el texto de error
//           console.error("Error Response:", errorText); // Log del error
//           throw new Error(`${translations.fetchError}: ${errorText}`); // Añade el mensaje de error traducido
//         }

//         const data = await response.json();
//         setUsers(data); // Almacena los usuarios en el estado
//       } catch (error) {
//         console.error("Error fetching users:", error); // Log del error
//         setError(error instanceof Error ? error.message : 'Error desconocido');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, [translations]); // Añade translations como dependencia

//   if (loading) {
//     return <div className="text-center">{translations.loading || 'Cargando...'}</div>;
//   }

//   if (error) {
//     return <div className="text-red-500 text-center">{translations.error || 'Error: ' + error}</div>;
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">{translations.users || 'Usuarios'}</h1>
//       <UsersTable users={users} translations={translations} /> {/* Pasamos las traducciones a la tabla */}
//     </div>
//   );
// }

"use client"; // Asegúrate de que este archivo sea un componente de cliente

import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import UsersTable from '../components/UsersTable'; // Asegúrate de que la ruta sea correcta
import { useLanguage } from '../context/LanguageContext'; // Importa el contexto de lenguaje
import { useTranslations } from '../../utils/i18n'; // Asegúrate de que esta ruta sea correcta
import Loader from '../components/Loader'; // Asegúrate de importar el Loader

interface User {
  id: string;          // El ID del usuario, es un string que representa un UUID
  username: string;    // El nombre de usuario, un string
  groups: string[];    // Un array de strings que representan los grupos a los que pertenece el usuario
  is_staff: boolean;   // Un booleano que indica si el usuario tiene permisos de personal administrativo
}

export default function UsersPage() {
  const { currentLang } = useLanguage(); // Obtiene el idioma actual desde el contexto
  const translations = useTranslations(currentLang); // Obtiene las traducciones según el idioma actual
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const session = await getSession();

      if (!session || !session.accessToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/users', {
          headers: {
            Authorization: `Token ${session.accessToken}`, // Asegúrate de usar "Token"
          },
        });

        if (!response.ok) {
          const errorText = await response.text(); // Captura el texto de error
          console.error("Error Response:", errorText); // Log del error
          throw new Error(`${translations.fetchError}: ${errorText}`); // Añade el mensaje de error traducido
        }

        const data = await response.json();
        setUsers(data); // Almacena los usuarios en el estado
      } catch (error) {
        console.error("Error fetching users:", error); // Log del error
        
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [translations]); // Añade translations como dependencia

  return (
    <div className="m-20">
      <h2>{translations.users}</h2>
      {loading ? (
        <Loader />
      ) : (
        <div className="mt-10"> 
          <UsersTable users={users} translations={translations} />
        </div>
      )}
    </div>
  );
}
