"use client"; // Marca el archivo como un componente de cliente

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { changePassword } from '../services/auth';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext'; // Importa el hook de lenguaje
import { useTranslations } from '../../utils/i18n'; // Importa el hook de traducciones

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
      router.push('/'); // Redirige a otra página después del cambio, si lo deseas
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message); // Accede al mensaje de error si es un Error
      } else {
        setError(translations.fetchError || "Error desconocido al cambiar la contraseña."); // Mensaje de error por defecto
      }
    }
  };

  return (
    <div className="container mx-auto max-w-md mt-10">
      <h1 className="text-2xl font-bold mb-4">{translations.changePassword || "Cambiar Contraseña"}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="text-red-500">{error}</div>}
        {success && <div className="text-green-500">{success}</div>}
        
        <div>
          <label className="block mb-1">{translations.password || "Nueva Contraseña"}</label> {/* Usar traducción de password */}
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>
        
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {translations.changePassword || "Cambiar Contraseña"} {/* Usar traducción de cambiar contraseña */}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
