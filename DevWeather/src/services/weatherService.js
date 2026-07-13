const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const fetchWeatherByCity = async (city) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}&lang=pt_br`,
    );

    if (!response.ok) {
      throw new Error("Cidade não encontrada");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro na requisição de clima:", error);
    throw error;
  }
};
