// "use client";
// import { useState } from 'react';
// import { signIn } from 'next-auth/react';
// import { useRouter } from 'next/navigation';

// const LoginPage = () => {
//   const [username, setUsername] = useState(''); // Mantén username
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const result = await signIn('credentials', {
//       redirect: false,
//       username, 
//       password,
//     });

//     // Manejo de errores y redirección
//     if (result?.error) {
//       setError(result.error); // Muestra el mensaje de error
//     } else {
//       router.push('/'); // Cambia esta ruta según donde quieras redirigir
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
//         <h2 className="text-lg font-semibold mb-4">Iniciar Sesión</h2>
//         {error && <div className="text-red-500 mb-4">{error}</div>}
//         <div>
//           <label className="block mb-2" htmlFor="username">
//             Usuario
//           </label>
//           <input
//             className="border rounded p-2 w-full"
//             type="text"
//             id="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mt-4">
//           <label className="block mb-2" htmlFor="password">
//             Contraseña
//           </label>
//           <input
//             className="border rounded p-2 w-full"
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="mt-4 bg-blue-500 text-white rounded p-2 w-full"
//         >
//           Iniciar Sesión
//         </button>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;


"use client";
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext'; // Importa el hook de lenguaje
import { useTranslations } from '../../utils/i18n'; // Importa el hook de traducciones

const LoginPage = () => {
  const { currentLang } = useLanguage(); // Obtén el idioma actual
  const translations = useTranslations(currentLang); // Obtén las traducciones

  const [username, setUsername] = useState(''); // Mantén username
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn('credentials', {
      redirect: false,
      username, 
      password,
    });

    // Manejo de errores y redirección
    if (result?.error) {
      setError(translations.error || 'Error desconocido'); // Muestra el mensaje de error
    } else {
      router.push('/'); // Cambia esta ruta según donde quieras redirigir
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-lg font-semibold mb-4">{translations.login || 'Iniciar Sesión'}</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>} {/* Muestra error si existe */}
        <div>
          <label className="block mb-2" htmlFor="username">
            {translations.username} {/* Usa la variable username del archivo de locales */}
          </label>
          <input
            className="border rounded p-2 w-full"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mt-4">
          <label className="block mb-2" htmlFor="password">
            {translations.password} {/* Usa la variable password del archivo de locales */}
          </label>
          <input
            className="border rounded p-2 w-full"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white rounded p-2 w-full"
        >
          {translations.login} {/* Usa la variable login del archivo de locales */}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
