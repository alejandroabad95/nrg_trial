const BASE_URL = "http://178.33.249.178:8002/api/deals/principal/";

export const getPrincipals = async (token: string) => {
  if (!token) {
    throw new Error("No se proporcionó el token de autorización");
  }

  try {
    const response = await fetch(BASE_URL, {
      method: "GET",
      headers: {
        "Authorization": `Token ${token}`,
        "Content-Type": "application/json",
      },
    });
    
    if (!response.ok) {
      const errorMessage = await response.text();
      console.error("Error Response:", errorMessage);
      throw new Error(`Error al obtener los principals: ${response.statusText} - ${errorMessage}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener principals:", error);
    throw error;
  }
};
