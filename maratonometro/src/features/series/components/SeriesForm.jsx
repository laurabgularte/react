import { useState } from "react";
import { tmdbApi } from "../services/tmdbApi";

export function SeriesForm({ onAddSeries }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Executa a busca na API toda vez que o usuário envia o formulário
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    const apiResults = await tmdbApi.searchSeries(query);
    setResults(apiResults);
    setIsLoading(false);
  };

  // Dispara a função do hook global e limpa a pesquisa local
  const handleSelectSeries = async (tmdbId) => {
    setIsLoading(true);
    await onAddSeries(tmdbId);
    setQuery("");
    setResults([]);
    setIsLoading(false);
  };

  return (
    <div className="series-form-container">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Digite o nome de uma série (Ex: Breaking Bad)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Buscando..." : "Buscar"}
        </button>
      </form>

      {/* Dropdown / Lista de resultados da busca */}
      {results.length > 0 && (
        <ul className="search-results-dropdown">
          {results.slice(0, 5).map((tvShow) => (
            <li key={tvShow.id} className="search-result-item">
              {tvShow.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w92${tvShow.poster_path}`}
                  alt={tvShow.name}
                  className="result-poster"
                />
              ) : (
                <div className="result-poster-placeholder">🎬</div>
              )}
              <div className="result-info">
                <strong>{tvShow.name}</strong>
                <span>
                  {tvShow.first_air_date
                    ? ` (${tvShow.first_air_date.substring(0, 4)})`
                    : ""}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleSelectSeries(tvShow.id)}
                className="add-btn"
                disabled={isLoading}
              >
                + Adicionar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
