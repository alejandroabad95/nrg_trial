// import NextAuth, { NextAuthOptions } from "next-auth"; // Importa las opciones y tipos necesarios
// import CredentialsProvider from "next-auth/providers/credentials";
// import { loginUser } from "../../../services/auth"; // Asegúrate de que la ruta sea correcta

// // Extiende las interfaces de NextAuth
// declare module "next-auth" {
//   interface User {
//     id: string; // Asegúrate de que 'id' esté aquí
//     token: string; // Incluye el token si lo necesitas
//   }

//   interface Session {
//     user: User; // Asegúrate de que 'user' tenga el tipo User
//     accessToken?: string; // Agrega la propiedad accessToken a la sesión
//   }

//   interface JWT {
//     id: string; // Asegúrate de que 'id' esté aquí también
//     accessToken?: string; // Agrega el token de acceso al JWT
//   }
// }

// // Define las opciones de NextAuth
// const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         username: { label: "Usuario", type: "text", placeholder: "tu-usuario" },
//         password: { label: "Contraseña", type: "password" },
//       },

//       async authorize(credentials) {
//         if (!credentials || !credentials.username || !credentials.password) {
//           throw new Error("Usuario y contraseña son requeridos");
//         }

//         try {
//           const user = await loginUser(credentials.username, credentials.password);
//           if (user) {
//             return user; // Retorna el usuario autenticado
//           }
//         } catch (error) {
//           console.error("Error en la autorización:", error);
//           throw new Error("Error en la autorización");
//         }

//         return null; // Retorna null si no hay usuario
//       },
//     }),
//   ],
//   pages: {
//     signIn: '/login',
//     signOut: '/logout',
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         console.log('User:', user); // Imprime el objeto user en la consola
//         token.id = user.id; // Asegúrate de que 'user.id' existe
//         token.accessToken = user.token; // Si tienes un token, guárdalo aquí
       
//       }
//       return token; // Retorna el token como JWT
//     },
//     async session({ session, token }) {
//       if (session.user) {


//         // Asegúrate de verificar que token.id no sea undefined
//         if (typeof token.id === 'string') {
//           session.user.id = token.id; // Asegúrate de que 'token.id' es un string
//         }

//         // Asegúrate de que token.accessToken no sea undefined
//         if (typeof token.accessToken === 'string') {
//           session.accessToken = token.accessToken; // Guarda el token de acceso en la sesión
//         }
//       }
//       return session; // Asegúrate de retornar la sesión
//     },
//   },
//   secret: process.env.NEXTAUTH_SECRET, // Secreto para encriptar las sesiones
// };

// // Exporta el manejador para las solicitudes GET y POST
// const handler = NextAuth(authOptions); // Asegúrate de usar 'authOptions' aquí

// export { handler as GET, handler as POST, authOptions };

import NextAuth, { NextAuthOptions } from "next-auth"; // Importa las opciones y tipos necesarios
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "../../../services/auth"; // Asegúrate de que la ruta sea correcta

// Extiende las interfaces de NextAuth
declare module "next-auth" {
  interface User {
    id: string; // Asegúrate de que 'id' esté aquí
    groups: number[]; // Incluye el campo groups
    is_staff?: boolean; // Opcional, si es relevante
    token?: string; // Añade token como propiedad opcional
  }

  interface Session {
    user: User; // Asegúrate de que 'user' tenga el tipo User
    accessToken?: string; // Agrega la propiedad accessToken a la sesión
  }

  interface JWT {
    id: string; // Asegúrate de que 'id' esté aquí también
    groups: number[]; // Agrega groups al JWT
    accessToken?: string; // Agrega el token de acceso al JWT
    token?: string; // Añade token como propiedad opcional
  }
}

// Define las opciones de NextAuth
const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Usuario", type: "text", placeholder: "tu-usuario" },
        password: { label: "Contraseña", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials || !credentials.username || !credentials.password) {
          throw new Error("Usuario y contraseña son requeridos");
        }

        try {
          const user = await loginUser(credentials.username, credentials.password);
          if (user) {
            // Retorna el usuario autenticado con grupos
            return {
              id: user.id,
              username: user.username,
              groups: user.groups, // Agrega los grupos
              is_staff: user.is_staff, // Agrega is_staff si es relevante
              token: user.token, // Guarda el token aquí
            };
          }
        } catch (error) {
          console.error("Error en la autorización:", error);
          throw new Error("Error en la autorización");
        }

        return null; // Retorna null si no hay usuario
      },
    }),
  ],
  pages: {
    signIn: '/login',
    signOut: '/logout',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log('User:', user); // Imprime el objeto user en la consola
        token.id = user.id; // Almacena el ID del usuario
        token.groups = user.groups || []; // Almacena los grupos del usuario
        token.accessToken = user.token; // Si tienes un token, guárdalo aquí
      }
      return token; // Retorna el token como JWT
    },
    async session({ session, token }) {
      if (session.user) {
        // Asegúrate de verificar que token.id no sea undefined
        if (typeof token.id === 'string') {
          session.user.id = token.id; // Almacena el ID del usuario en la sesión
        }

        // Asegúrate de que token.groups sea un array
        if (Array.isArray(token.groups)) {
          session.user.groups = token.groups; // Almacena los grupos en la sesión
        }

        // Asegúrate de que token.accessToken no sea undefined
        if (typeof token.accessToken === 'string') {
          session.accessToken = token.accessToken; // Guarda el token de acceso en la sesión
        }
      }
      return session; // Asegúrate de retornar la sesión
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Secreto para encriptar las sesiones
};

// Exporta el manejador para las solicitudes GET y POST
const handler = NextAuth(authOptions); // Asegúrate de usar 'authOptions' aquí

export { handler as GET, handler as POST, authOptions };
