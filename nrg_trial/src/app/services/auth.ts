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
