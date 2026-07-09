import { useState, useEffect } from "react";
import { seriesStorage } from "../services/storage";
import { tmdbApi } from "../services/tmdbApi";

export function useSeries() {
  const [seriesList, setSeriesList] = useState(() => seriesStorage.get());

  useEffect(() => {
    seriesStorage.save(seriesList);
  }, [seriesList]);

  // Modificado: Agora a função é ASSÍNCRONA porque busca dados da API antes de salvar
  const addSeriesFromTmdb = async (tmdbId) => {
    // Evita duplicados
    if (seriesList.some((s) => s.tmdbId === tmdbId)) {
      alert("Esta série já está no seu Maratonômetro!");
      return;
    }

    // Busca detalhes completos (como runtime de episódios e número de temporadas reais)
    const details = await tmdbApi.getSeriesDetails(tmdbId);

    if (!details) {
      alert("Não foi possível obter os detalhes desta série.");
      return;
    }

    // Média de episódios por temporada
    const totalEpisodes = details.number_of_episodes || 0;
    const totalSeasons = details.number_of_seasons || 1;
    const avgEpisodesPerSeason = Math.round(totalEpisodes / totalSeasons) || 10;

    const newSeries = {
      id: crypto.randomUUID(),
      tmdbId: details.id,
      title: details.name,
      // URL oficial do poster do TMDB (resolução w500)
      posterPath: details.poster_path
        ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
        : null,
      seasonsWatched: 0,
      totalSeasons: totalSeasons,
      episodesPerSeason: avgEpisodesPerSeason,
      // O TMDB retorna um array com as durações dos episódios, pegamos a primeira posição
      episodeRunTime: details.episode_run_time[0] || 45,
      status: "watchlist",
      updatedAt: new Date().toISOString(),
    };

    setSeriesList((prevList) => [newSeries, ...prevList]);
  };

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

  const deleteSeries = (id) => {
    setSeriesList((prevList) => prevList.filter((series) => series.id !== id));
  };

  return {
    seriesList,
    addSeries: addSeriesFromTmdb, // Mapeado para a nova função assíncrona
    incrementSeason,
    deleteSeries,
  };
}
