import { useState, useEffect } from "react";
import { seriesStorage } from "../services/storage";

export function useSeries() {
  // Inicializa o estado buscando direto do localStorage de forma segura
  const [seriesList, setSeriesList] = useState(() => seriesStorage.get());

  // Sempre que a lista de séries mudar, salva automaticamente no localStorage
  useEffect(() => {
    seriesStorage.save(seriesList);
  }, [seriesList]);

  // Função para adicionar uma nova série
  const addSeries = (newSeriesData) => {
    const newSeries = {
      id: crypto.randomUUID(), // Gera um ID único e moderno nativo do navegador
      title: newSeriesData.title,
      seasonsWatched: 0,
      totalSeasons: Number(newSeriesData.totalSeasons) || 1,
      episodesPerSeason: Number(newSeriesData.episodesPerSeason) || 10,
      status: "watchlist", // Começa na lista de desejos
      updatedAt: new Date().toISOString(),
    };

    setSeriesList((prevList) => [newSeries, ...prevList]);
  };

  // Função para incrementar o número de temporadas assistidas
  const incrementSeason = (id) => {
    setSeriesList((prevList) =>
      prevList.map((series) => {
        if (series.id === id) {
          const nextSeason = series.seasonsWatched + 1;
          const isCompleted = nextSeason >= series.totalSeasons;

          return {
            ...series,
            seasonsWatched: Math.min(nextSeason, series.totalSeasons),
            status: isCompleted ? "completed" : "watching",
            updatedAt: new Date().toISOString(),
          };
        }
        return series;
      }),
    );
  };

  // Função para deletar uma série
  const deleteSeries = (id) => {
    setSeriesList((prevList) => prevList.filter((series) => series.id !== id));
  };

  // Retorna o estado e as ações que os componentes vão precisar usar
  return {
    seriesList,
    addSeries,
    incrementSeason,
    deleteSeries,
  };
}
