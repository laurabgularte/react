const TMDB_ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3";

export const tmdbApi = {
  // 1. Busca uma lista de séries pelo nome (usado para o autocomplete/busca do formulário)
  async searchSeries(query) {
    if (!query) return [];

    try {
      const response = await fetch(
        `${BASE_URL}/search/tv?query=${encodeURIComponent(query)}&include_adult=false&language=pt-BR`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
            accept: "application/json",
          },
        },
      );

      if (!response.ok) throw new Error("Erro na busca do TMDB");

      const data = await response.json();
      return data.results; // Retorna array de resultados simplificados
    } catch (error) {
      console.error("Erro ao buscar séries:", error);
      return [];
    }
  },

  // 2. Busca os detalhes profundos de uma série específica (para pegar número exato de episódios e runtime)
  async getSeriesDetails(id) {
    try {
      const response = await fetch(`${BASE_URL}/tv/${id}?language=pt-BR`, {
        headers: {
          Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
          accept: "application/json",
        },
      });

      if (!response.ok) throw new Error("Erro ao buscar detalhes da série");

      return await response.json();
    } catch (error) {
      console.error("Erro ao buscar detalhes do TMDB:", error);
      return null;
    }
  },
};
