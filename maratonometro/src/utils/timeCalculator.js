/**
 * Calcula o tempo total maratonado com base no tempo real de episódio de cada série.
 * @param {Array} seriesList - Lista de séries atuais do estado.
 * @returns {Object} Dados de tempo formatados.
 */
export function calculateMarathonTime(seriesList) {
  // Calcula o total absoluto de minutos assistidos usando o tempo real de cada série
  const totalMinutes = seriesList.reduce((acc, series) => {
    // Fallback de 40 minutos caso a API não tenha o dado de alguma série específica
    const runtime = series.episodeRunTime || 40;
    const totalEpisodesWatched =
      series.seasonsWatched * series.episodesPerSeason;

    return acc + totalEpisodesWatched * runtime;
  }, 0);

  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;

  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;

  let formattedString = "Nenhuma maratona registrada ainda.";
  if (totalMinutes > 0) {
    const parts = [];
    if (days > 0) parts.push(`${days} ${days === 1 ? "dia" : "dias"}`);
    if (hours > 0) parts.push(`${hours} ${hours === 1 ? "hora" : "horas"}`);
    if (remainingMinutes > 0) parts.push(`${remainingMinutes} min`);

    formattedString = parts.join(", ").replace(/,([^,]*)$/, " e$1");
  }

  return {
    totalMinutes,
    days,
    hours,
    minutes: remainingMinutes,
    formattedString,
  };
}
