const API_URL = "http://178.33.249.178:8002/api/auth"; // URL base de tu API

// Definición de tipos para el usuario y la respuesta
export interface User {
  id: string;        // ID del usuario
  username: string;  // Nombre de usuario
  groups: number[];  // Grupos a los que pertenece el usuario
  is_staff: boolean; // Si el usuario es parte del personal
  token: string;     // Token de autenticación
}

export interface ErrorResponse {
  detail: string; // Mensaje de error de la API
}

// Función para iniciar sesión
export const loginUser = async (username: string, password: string): Promise<User> => {
  const res = await fetch(`${API_URL}/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  // Definición del tipo de respuesta basado en el status
  const data: User | ErrorResponse = await res.json();

  if (!res.ok) {
    // Verifica si la respuesta es un ErrorResponse
    if ('detail' in data) {
      throw new Error(data.detail); // Usa 'detail' para lanzar el error
    } else {
      throw new Error("Error desconocido al iniciar sesión");
    }
  }

  return data as User; // Retorna el usuario si la autenticación es exitosa
};


// Función para cambiar contraseña, enviando solo la nueva contraseña
export const changePassword = async (newPassword: string, accessToken: string): Promise<void> => {
  const res = await fetch(`${API_URL}/change_password/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${accessToken}`, // Incluye el token de acceso en los headers
    },
    body: JSON.stringify({
      password: newPassword, // Envía solo la nueva contraseña en el cuerpo
    }),
  });

  if (!res.ok) {
    const errorData: ErrorResponse = await res.json();
    throw new Error(errorData.detail || "Error desconocido al cambiar la contraseña");
  }
};


