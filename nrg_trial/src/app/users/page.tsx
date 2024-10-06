"use client"; 
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import UsersTable from '../components/UsersTable'; 
import { useLanguage } from '../context/LanguageContext'; 
import { useTranslations } from '../../utils/i18n'; 
import Loader from '../components/Loader'; 

interface User {
  id: string;          
  username: string;   
  groups: string[];   
  is_staff: boolean; 
}

export default function UsersPage() {
  const { currentLang } = useLanguage(); 
  const translations = useTranslations(currentLang); 
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
