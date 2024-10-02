"use client"; // Marca el archivo como un componente de cliente

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { changePassword } from '../services/auth';
import { useRouter } from 'next/navigation';

const ChangePassword = () => {
  const { data: session } = useSession(); // Obtener la sesión para acceder al token
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!session || !session.accessToken) {
      setError("No estás autenticado.");
      return;
    }

    try {
      // Llama a la función de cambio de contraseña pasando solo la nueva contraseña
      await changePassword(newPassword, session.accessToken);
      setSuccess("Contraseña cambiada con éxito.");
      setNewPassword(''); // Limpia el campo de la contraseña después de éxito
      router.push('/'); // Redirige a otra página después del cambio, si lo deseas
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message); // Accede al mensaje de error si es un Error
      } else {
        setError("Error desconocido al cambiar la contraseña."); // Mensaje de error por defecto
      }
    }
  };

  return (
    <div className="container mx-auto max-w-md mt-10">
      <h1 className="text-2xl font-bold mb-4">Cambiar Contraseña</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="text-red-500">{error}</div>}
        {success && <div className="text-green-500">{success}</div>}
        
        <div>
          <label className="block mb-1">Nueva Contraseña</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>
        
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Cambiar Contraseña</button>
      </form>
    </div>
  );
};

export default ChangePassword;
