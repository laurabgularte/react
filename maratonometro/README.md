# 🎬 Maratonômetro

O **Maratonômetro** é uma aplicação web de alta performance desenvolvida em React e Vite, integrada à API internacional do **TMDB (The Movie Database)**. O projeto foi projetado sob os conceitos de arquitetura limpa, componentização atômica e gerenciamento de estado encapsulado, permitindo aos usuários buscar séries em tempo real, gerenciar seu progresso de visualização por temporadas e calcular com precisão cirúrgica o tempo total absoluto gasto maratonando.

---

## 🚀 Funcionalidades Principais

- **Busca Dinâmica com Dados Reais:** Integração assíncrona com a API do TMDB para autocompletar nomes de séries, carregando instantaneamente pôsteres, anos de lançamento, quantidades reais de temporadas e tempos médios de episódios.
- **Cálculo de Tempo Inteligente:** Função pura utilitária que calcula o tempo maratonado com base no tempo real de cada episódio (ex: diferenciando episódios de 22min de comédias dos episódios de 50min de dramas).
- **Filtros por Abas (Tabs):** Separação dinâmica e reativa por estados de visualização: _Todas_, _Assistindo_, _Na Fila (Watchlist)_ e _Concluídas_.
- **Persistência de Dados Local:** Sincronização automática do estado da aplicação com o `localStorage` do navegador, garantindo que os dados não sejam perdidos ao recarregar a página.
- **Interface Premium (Dark Mode):** Design system inspirado nas principais plataformas de streaming atuais, utilizando variáveis CSS nativas e layouts fluidos com CSS Grid e Flexbox.

---

## 🛠️ Arquitetura e Estrutura do Projeto

O projeto foi organizado isolando a lógica de negócios da camada de apresentação visual.

```text
maratonometro/
├── .env                     # Variáveis de ambiente necessárias
├── .gitignore               # Arquivos ignorados pelo ecossistema Git
├── index.html               # Ponto de entrada HTML5
├── package.json             # Manifest do Node.js (dependências e scripts)
├── vite.config.js           # Configurações do compilador Vite
└── src/
    ├── App.jsx              # Componente orquestrador central
    ├── main.jsx             # Ponto de inicialização do React e estilos globais
    ├── features/
    │   └── series/
    │       ├── components/  # Componentes visuais isolados (controlados)
    │       │   ├── SeriesCard.jsx
    │       │   ├── SeriesForm.jsx
    │       │   └── SeriesList.jsx
    │       ├── hooks/       # Custom Hook para isolamento do estado global
    │       │   └── useSeries.js
    │       └── services/    # Camada de infraestrutura e conexões externas
    │           ├── storage.js
    │           └── tmdbApi.js
    ├── styles/              # Camada de estilos globais e variáveis
    │   └── global.css
    └── utils/               # Funções puras utilitárias matematicamente testáveis
        └── timeCalculator.js
```

## 🧪 Tecnologias utilizadas

**React 18** (Biblioteca Javascript para construção de interfaces reativas)

**Vite** (Ferramenta de construção e servidor de desenvolvimento para projetos web)

**API do TMDB** (Consumo de dados HTTP via Fetch API assíncrono)

**CSS3 Nativo** (Uso de Flexbox, Grid Layout e CSS Variables)

## ⚙️ Configuração e Instalação

### Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina o **Node.js** (versão 18 ou superior) e o **npm**.

### 1. Clonar o Repositório

```bash
git clone [https://github.com/laurabgularte/react.git](https://github.com/laurabgularte/react.git)
cd maratonometro
```

### 2. Instalar dependências

`npm install `

### 3. Configurar variáveis de ambiente

Crie um arquivo .env na raiz do projeto e insira o token de leitura do TMDB

```
VITE_TMDB_ACCESS_TOKEN=seu_bearer_token_jwt_do_tmdb_aqui
```

### 4. Executar no ambiente de desenvolvimento

`npm run dev `

O Vite iniciará o servidor local. Abra o seu navegador e acesse (ex: http://localhost:5173)
