import { useSeries } from "./features/series/hooks/useSeries";
import { SeriesForm } from "./features/series/components/SeriesForm";
import { SeriesList } from "./features/series/components/SeriesList";
import { calculateMarathonTime } from "./utils/timeCalculator";

function App() {
  // Importa o estado global e as ações do nosso Custom Hook
  const { seriesList, addSeries, incrementSeason, deleteSeries } = useSeries();

  // Calcula as métricas do Maratonômetro em tempo real
  const marathonMetrics = calculateMarathonTime(seriesList);

  return (
    <div className="app-container">
      {/* Cabeçalho Principal */}
      <header className="app-header">
        <div className="header-content">
          <h1>🎬 Maratonômetro</h1>
          <p className="subtitle">O teu painel pessoal de séries assistidas</p>
        </div>
      </header>

      {/* Dashboard de Estatísticas (O valor do produto) */}
      <section className="dashboard-section">
        <div className="metrics-card">
          <h2>Tempo Total de Maratona</h2>
          <p className="time-display">{marathonMetrics.formattedString}</p>
          {seriesList.length > 0 && (
            <span className="metrics-footer">
              Contabilizando <strong>{seriesList.length}</strong> série(s) no
              teu histórico.
            </span>
          )}
        </div>
      </section>

      {/* Zona de Interação: Procurar e Adicionar */}
      <main className="main-content">
        <section className="search-section">
          <h2>Adicionar Nova Série</h2>
          <p className="section-description">
            Pesquisa pelo nome da série para importar os dados reais
            automaticamente via API do TMDB.
          </p>
          <SeriesForm onAddSeries={addSeries} />
        </section>

        {/* Listagem e Filtros */}
        <section className="list-section">
          <h2>As Minhas Séries</h2>
          <SeriesList
            seriesList={seriesList}
            onIncrement={incrementSeason}
            onDelete={deleteSeries}
          />
        </section>
      </main>

      {/* Rodapé institucional padrão */}
      <footer className="app-footer">
        <p>
          Maratonômetro &copy; {new Date().getFullYear()} - Desenvolvido com
          React, Vite e API do TMDB.
        </p>
      </footer>
    </div>
  );
}

export default App;
