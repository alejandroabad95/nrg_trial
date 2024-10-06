"use client"; // Marca el archivo como un componente de cliente
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { changePassword } from '../services/auth';
import { useLanguage } from '../context/LanguageContext'; // Importa el hook de lenguaje
import { useTranslations } from '../../utils/i18n'; // Importa el hook de traducciones

const ChangePassword = () => {
  const { data: session } = useSession(); // Obtener la sesión para acceder al token
  const { currentLang } = useLanguage(); // Obtén el idioma actual
  const translations = useTranslations(currentLang); // Obtén las traducciones
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [succes, setSucces] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSucces('');

    if (!session || !session.accessToken) {
      setError(translations.notAuthorized || "No estás autenticado."); // Traducción de no autorizado
      return;
    }

    try {
      // Llama a la función de cambio de contraseña pasando solo la nueva contraseña
      await changePassword(newPassword, session.accessToken);
      setSucces(translations.changePassword || "Contraseña cambiada con éxito."); // Traducción de éxito
      setNewPassword(''); // Limpia el campo de la contraseña después de éxito

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
        <h3 className='text-nowrap'>{translations.passwordTitle}</h3>

        {error && <div className="errorContainer"><span className="error">{error}</span></div>} 
        {succes && <div className="succesContainer"><span className="success">{succes}</span></div>} 
        
        <div className='mt-8'>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            placeholder={translations.newPassword || "Nueva Contraseña"} 
            className="w-full border rounded p-2"
          />
        </div>
        
        <div className='text-center'>
          <button
            type="submit"
            className="mt-8 bg-blue-500 text-white rounded p-2" // Ajusta los estilos según necesites
          >
            {translations.changePassword}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
