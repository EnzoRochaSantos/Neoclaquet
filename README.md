# 🎬 NeoClaquet

## Atividade de Consumo de API com React.JS

## ✨ Funcionalidades Principais do Projeto

- **Página Inicial Dinâmica:** Exibe um filme em destaque aleatório a cada visita.
- **Catálogo de Filmes:** Navegue por filmes populares, em alta ou mais votados.
- **Filtros Interativos:** Filtre o catálogo por género com seleção única.
- **Busca de Filmes:** Pesquise filmes por nome em toda a base de dados.
- **Página de Detalhes:** Veja informações completas de cada filme, incluindo poster, sinopse, nota e diretor.
- **"Minha Lista" com Persistência:** Adicione ou remova filmes de uma lista de favoritos que fica guardada no seu navegador (`localStorage`).

## 🚀 Como Rodar o Projeto Localmente

Para executar este projeto em sua máquina, siga os passos abaixo.

**Pré-requisitos:**

- [Node.js](https://nodejs.org/en/) (versão 16 ou superior)
- Uma chave de API do [TMDB](https://www.themoviedb.org/signup)

1.  **Clone o repositório:**
    s
    `bash
git clone [https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git](https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git)
`

2.  **Navegue até a pasta do projeto:**

    ```bash
    cd Atividade IMDB Movies +PraTI
    ```

3.  **Instale as dependências:**

    ```bash
    npm install
    ```

4.  **Configure as variáveis de ambiente:**

    - Crie um arquivo chamado `.env` na raiz do projeto.
    - Adicione a sua chave de API do TMDB dentro dele, da seguinte forma:
      ```
      VITE_TMDB_API_KEY="SUA_CHAVE_DA_API_AQUI"
      ```

5.  **Rode a aplicação:**
    ```bash
    npm run dev
    ```

## Tecnologias Utilizadas

- **React.js:** Biblioteca principal para a construção da interface.
- **Vite:** Ferramenta de build e servidor de desenvolvimento.
- **React Router DOM:** Para a navegação e sistema de rotas.
- **Tailwind CSS:** Para a estilização rápida e responsiva.
- **Context API:** Para a gestão do estado global da "Minha Lista".
