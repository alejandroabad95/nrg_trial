const BASE_URL = "http://178.33.249.178:8002/api/deals/counterparties/";

export const getCounterparties = async (token: string) => {
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
      throw new Error(`Error al obtener los counterparties: ${response.statusText} - ${errorMessage}`);
    }

    const data = await response.json();
    return data; // Devuelve los datos de los counterparties
  } catch (error) {
    console.error("Error en getCounterparties", error);
    throw error; // Propaga el error
  }
};
