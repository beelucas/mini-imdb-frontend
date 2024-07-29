# Mini IMDb Frontend

Este projeto é uma aplicação frontend para o Mini IMDb, um sistema de banco de dados de filmes onde os usuários podem visualizar, adicionar e avaliar filmes. A aplicação é construída com React e utiliza axios para requisições à API.

## Índice

- [Instalação](#instalação)
- [Executando o Projeto](#executando-o-projeto)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Principais Funcionalidades](#principais-funcionalidades)
- [Configuração da API](#configuração-da-api)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Licença](#licença)

## Instalação

Para instalar e executar este projeto localmente, siga estes passos:

1. Clone o repositório:

    ```bash
    git clone https://github.com/seuusuario/minii-imdb-frontend.git
    cd mini-imdb-frontend
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```

## Executando o Projeto

Para iniciar a aplicação, utilize o comando:

```bash
npm start
```

Isso iniciará o servidor de desenvolvimento e abrirá o aplicativo no seu navegador padrão.

## Estrutura do Projeto

A estrutura do projeto é organizada da seguinte maneira:

1. src/components: Contém todos os componentes React utilizados na aplicação.

    atoms: Componentes básicos como Button, Input e Textarea.

    molecules: Componentes compostos como FormField e LikeDislike.

    organisms: Componentes mais complexos que combinam múltiplos átomos e moléculas, como AdicionarFilmeForm, AvaliacaoForm e DetalhesFilmeInfo.

    pages: Contém as páginas principais da aplicação, como AdicionarFilme, DetalhesFilme, ListaFilmes, Login, Register, e Home.

    templates: Contém templates de páginas, como FilmePageTemplate.

2. src/context: Contém o contexto de autenticação (AuthContext).

3. src/api: Configurações do axios para interações com a API backend.

4. src/App.js: Arquivo principal que configura as rotas da aplicação.

5. src/index.js: Arquivo de entrada da aplicação.

## Principais Funcionalidades

1. **Login/Registro:** Usuários podem criar contas e fazer login para acessar funcionalidades protegidas.

2. **Adicionar Filmes:** Usuários autenticados podem adicionar novos filmes ao banco de dados.

3. **Avaliar Filmes:** Usuários podem avaliar filmes com uma pontuação e um comentário.

4. **Curtir/Descurtir Avaliações:** Avaliações de filmes podem receber curtidas ou descurtidas.

5. **Listar Filmes:** Exibição de uma lista de filmes com detalhes básicos.

6. **Detalhes do Filme:** Visualização detalhada de informações do filme e suas avaliações.

## Configuração da API

As requisições à API são gerenciadas pelo axios. As configurações estão no arquivo `src/api/index.js`.

Certifique-se de que a URL base da API esteja correta:


```const api = axios.create({
    baseURL: 'http://localhost:8000/api',
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

export default api;
```

## Variáveis de Ambiente

Você pode definir variáveis de ambiente no arquivo `.env` na raiz do projeto. Um exemplo de configuração pode ser:

```REACT_APP_API_URL=http://localhost:8000/api
```

## Licença
Este projeto está licenciado sob os termos da licença MIT. Veja o arquivo **LICENSE** para mais detalhes.
