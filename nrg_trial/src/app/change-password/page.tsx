"use client"; // Marca el archivo como un componente de cliente

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { changePassword } from '../services/auth';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext'; // Importa el hook de lenguaje
import { useTranslations } from '../../utils/i18n'; // Importa el hook de traducciones
import styles from "../styles/componentStyles/ChangePassword.module.scss"; // Asegúrate de tener este módulo

const ChangePassword = () => {
  const { data: session } = useSession(); // Obtener la sesión para acceder al token
  const { currentLang } = useLanguage(); // Obtén el idioma actual
  const translations = useTranslations(currentLang); // Obtén las traducciones

  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!session || !session.accessToken) {
      setError(translations.notAuthorized || "No estás autenticado."); // Traducción de no autorizado
      return;
    }

    try {
      // Llama a la función de cambio de contraseña pasando solo la nueva contraseña
      await changePassword(newPassword, session.accessToken);
      setSuccess(translations.changePassword || "Contraseña cambiada con éxito."); // Traducción de éxito
      setNewPassword(''); // Limpia el campo de la contraseña después de éxito
      router.push('/'); 
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message); // Accede al mensaje de error si es un Error
      } else {
        setError(translations.fetchError || "Error desconocido al cambiar la contraseña."); // Mensaje de error por defecto
      }
    }
  };

  return (
    <div className="flex items-start justify-center mt-28">
      <form onSubmit={handleSubmit}>
        <h2>{translations.passwordTitle}</h2>


        {error && <div className="text-red-500 mb-4">{error}</div>} {/* Muestra error si existe */}
        {success && <div className="text-green-500 mb-4">{success}</div>} {/* Mensaje de éxito */}
        
        <div className='mt-8'>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            placeholder={translations.newPassword || "Nueva Contraseña"} // Usa traducción de password
            className="w-full border rounded p-2"
          />
        </div>
        
        <div className='text-center'>
          <button
            type="submit"
            className={`${styles['change-password-button']} mt-8`}
          >
            {translations.changePassword} {/* Usa traducción de cambiar contraseña */}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
