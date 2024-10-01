// src/app/components/Navbar.tsx

"use client"; // Asegúrate de que este archivo sea un componente de cliente

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const Navbar: React.FC = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white text-2xl font-bold">
          <Link href="/">ETRM2</Link>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link href="/deals" className="text-white hover:text-gray-400">
              Contratos
            </Link>
          </li>

          <li>
            <Link href="/counterparties" className="text-white hover:text-gray-400">
              Contrapartidas
            </Link>
          </li>

          <li>
            <Link href="/users" className="text-white hover:text-gray-400">
              Usuarios
            </Link>
          </li>

             <li>
            <Link href="/principals" className="text-white hover:text-gray-400">
              Directores
            </Link>
          </li>
        
          {/* Si esta autenticado muestra signOut */}
          {session ? (
            <li>
              <button
                onClick={() => signOut()} // Asumiendo que tienes la función signOut importada
                className="text-white hover:text-gray-400"
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link href="/login" className="text-white hover:text-gray-400">
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;