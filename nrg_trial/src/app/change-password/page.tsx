"use client"; // Marca el archivo como un componente de cliente

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { changePassword } from '../services/auth';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext'; // Importa el hook de lenguaje
import { useTranslations } from '../../utils/i18n'; // Importa el hook de traducciones
import Loader from '../components/Loader'; // Asegúrate de importar el Loader

const ChangePassword = () => {
  const { data: session } = useSession(); // Obtener la sesión para acceder al token
  const { currentLang } = useLanguage(); // Obtén el idioma actual
  const translations = useTranslations(currentLang); // Obtén las traducciones

  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false); // Estado para manejar la carga
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true); // Inicia el loader

    if (!session || !session.accessToken) {
      setError(translations.notAuthorized || "No estás autenticado."); // Traducción de no autorizado
      setLoading(false); // Detiene el loader
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
    } finally {
      setLoading(false); // Detiene el loader
    }
  };

  return (
    <div className="flex items-start justify-center mt-28">
      {loading ? ( // Ternario para mostrar el loader o el formulario
        <Loader />
      ) : (
        <form onSubmit={handleSubmit}>
          <h3>{translations.passwordTitle}</h3>

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
              className="mt-8 bg-blue-500 text-white rounded p-2" // Ajusta los estilos según necesites
            >
              {translations.changePassword}
            </button>
          </div>
          </form>
      )}
    </div>
  );
};

export default ChangePassword;


