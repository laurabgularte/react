export function SeriesCard({ series, onIncrement, onDelete }) {
  // Calcula a porcentagem de progresso da maratona
  const progressPercentage = Math.round(
    (series.seasonsWatched / series.totalSeasons) * 100,
  );

  return (
    <div className={`series-card ${series.status}`}>
      {/* Imagem do Pôster vindo da API */}
      <div className="card-poster-container">
        {series.posterPath ? (
          <img
            src={series.posterPath}
            alt={`Pôster de ${series.title}`}
            className="card-poster"
          />
        ) : (
          <div className="card-poster-placeholder">📺</div>
        )}
      </div>

      {/* Informações da Série */}
      <div className="card-content">
        <div className="card-header">
          <h3 className="series-title">{series.title}</h3>
          <span className={`status-badge ${series.status}`}>
            {series.status === "completed" && "🏁 Concluída"}
            {series.status === "watching" && "🍿 Assistindo"}
            {series.status === "watchlist" && "⏳ Na Fila"}
          </span>
        </div>

        <p className="series-info">
          Duração média: <strong>{series.episodeRunTime} min</strong> por ep.
        </p>

        {/* Progresso de Temporadas */}
        <div className="progress-container">
          <div className="progress-text">
            <span>
              Temporadas: {series.seasonsWatched} / {series.totalSeasons}
            </span>
            <span>{progressPercentage}%</span>
          </div>
          <div className="progress-bar-bg">
            <div
              className="progress-bar-fill"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Ações do Card */}
        <div className="card-actions">
          <button
            onClick={() => onIncrement(series.id)}
            disabled={series.seasonsWatched >= series.totalSeasons}
            className="btn-increment"
            title="Marcar mais uma temporada como assistida"
          >
            {series.seasonsWatched >= series.totalSeasons
              ? "Concluída!"
              : "+1 Temporada"}
          </button>

          <button
            onClick={() => onDelete(series.id)}
            className="btn-delete"
            title="Remover série do Maratonômetro"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
