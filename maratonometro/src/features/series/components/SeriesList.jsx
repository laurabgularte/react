import { useState } from "react";
import { SeriesCard } from "./SeriesCard";

export function SeriesList({ seriesList, onIncrement, onDelete }) {
  const [activeFilter, setActiveFilter] = useState("all");

  // 1. Filtra a lista dinamicamente com base na aba ativa
  const filteredSeries = seriesList.filter((series) => {
    if (activeFilter === "all") return true;
    return series.status === activeFilter;
  });

  return (
    <div className="series-list-container">
      {/* Abas de Navegação / Filtros */}
      <div className="filter-tabs">
        <button
          className={activeFilter === "all" ? "active" : ""}
          onClick={() => setActiveFilter("all")}
        >
          🔍 Todas ({seriesList.length})
        </button>
        <button
          className={activeFilter === "watching" ? "active" : ""}
          onClick={() => setActiveFilter("watching")}
        >
          🍿 Assistindo (
          {seriesList.filter((s) => s.status === "watching").length})
        </button>
        <button
          className={activeFilter === "watchlist" ? "active" : ""}
          onClick={() => setActiveFilter("watchlist")}
        >
          ⏳ Na Fila (
          {seriesList.filter((s) => s.status === "watchlist").length})
        </button>
        <button
          className={activeFilter === "completed" ? "active" : ""}
          onClick={() => setActiveFilter("completed")}
        >
          🏁 Concluídas (
          {seriesList.filter((s) => s.status === "completed").length})
        </button>
      </div>

      {/* Renderização Condicional da Grade de Cards */}
      {filteredSeries.length === 0 ? (
        <div className="empty-state">
          <p>Nenhuma série encontrada nesta categoria.</p>
        </div>
      ) : (
        <div className="series-grid">
          {filteredSeries.map((series) => (
            <SeriesCard
              key={series.id}
              series={series}
              onIncrement={onIncrement}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
