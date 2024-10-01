const BASE_URL = "http://178.33.249.178:8002/api/deals/";

export const getDeals = async (token: string, params?: string) => {
  const url = params ? `${BASE_URL}?${params}` : BASE_URL;

  console.log("Fetching deals from URL:", url);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Token ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error("Error Response:", errorMessage);
      throw new Error(`Error al obtener los deals: ${response.statusText} - ${errorMessage}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en getDeals", error);
    throw error;
  }
};


export const getDealById = async (token: string, id: string) => {
  const url = `${BASE_URL}${id}/`; // Construye la URL con el ID

  console.log("Fetching deal from URL:", url);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Token ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error("Error Response:", errorMessage);
      throw new Error(`Error al obtener el deal: ${response.statusText} - ${errorMessage}`);
    }

    const data = await response.json();
    return data; // Devuelve el deal encontrado
  } catch (error) {
    console.error("Error en getDealById", error);
    throw error;
  }
};
