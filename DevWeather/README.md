# DevWeather 🌤️

O **DevWeather** é uma aplicação web moderna para consulta de condições climáticas em tempo real. O projeto foi desenvolvido focado em boas práticas de arquitetura de software frontend, utilizando React e Vite, com total separação de conceitos, tratamento robusto de estados e design responsivo.

---

## 🚀 Demonstração

- **API Utilizada:** [OpenWeatherMap API](https://openweathermap.org/)

---

## 🛠️Tech Stack

- **React + Vite:** Escolhido pela alta performance no ambiente de desenvolvimento;
- **Custom Hooks (`useWeather`):** Toda a lógica de estado (`loading`, `error`, `weatherData`) e chamadas assíncronas foram isoladas da camada visual. Isso garante componentes limpos e focados apenas em renderização;
- **Service Layer (`weatherService`):** Camada de infraestrutura isolada para comunicação com a API. Caso a API de clima mude no futuro, apenas este arquivo precisa ser alterado;
- **CSS Moderno:** Centralização de cores e espaçamentos usando variáveis CSS nativas (`:root`), facilitando a manutenção e futuras implementações de temas como Light/Dark mode;
- **Segurança (Variáveis de Ambiente):** Proteção da chave privada da API utilizando arquivos `.env`, seguindo as diretrizes do ecossistema Vite.

---

## 📂 Estrutura de Pastas

```text
src/
├── assets/          # Ícones e imagens estáticas (caso se aplique ao projeto)
├── components/      # Componentes visuais altamente reutilizáveis e puros
├── hooks/           # Custom hooks contendo a lógica de negócio encapsulada
├── services/        # Configuração de integração com APIs externas
├── styles/          # Estilos globais e design tokens centralizados
├── App.jsx          # Orquestrador principal da UI
└── main.jsx         # Ponto de entrada da aplicação
```
