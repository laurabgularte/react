const STORAGE_KEY = "@maratonometro:series";

export const seriesStorage = {
  // Busca as séries salvas ou retorna um array vazio com segurança
  get() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Erro ao ler do localStorage:", error);
      return [];
    }
  },

  // Salva a lista atualizada de séries
  save(series) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(series));
    } catch (error) {
      console.error("Erro ao salvar no localStorage:", error);
    }
  },
};
