"use client";
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext'; 
import { useTranslations } from '../../utils/i18n'; 
import styles from "../styles/componentStyles/Login.module.scss"

const LoginPage = () => {
  const { currentLang } = useLanguage(); 
  const translations = useTranslations(currentLang); 
  const [username, setUsername] = useState(''); 
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
      setError(translations.error || 'Error desconocido'); 
    } else {
      router.push('/deals'); 
    }
  };

  return (
    <div className="flex items-start mt-28 justify-center"> 
      <form onSubmit={handleSubmit}>
        <h3>{translations.welcome}</h3>
        {error &&
          <div className="errorContainer">
            <span className='error'>

              {translations.error}

            </span>
        
        
        </div>} {/* Muestra error si existe */}
        
        <div className='mt-8'>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder={translations.username}
          />
        </div>

        <div className="mt-8">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder={translations.password}
          />

        </div>
       
        <div className='text-center'>
        <button
          type="submit"
          className={`${styles['login-button']} mt-8`}
        >
          {translations.login}
          </button>
        </div>
        
      </form>
    </div>
  );
};

export default LoginPage;



