# Webhook Inspector with AI Integration

<div align="center">

**🌐 Choose your language / Escolha seu idioma:**

[🇧🇷 **Português**](#-português) | [🇺🇸 **English**](#-english)

---

</div>

---

# 🇧🇷 Português

## 👨‍💻 Autor

**Ramos (Ramos) de Souza Janones** | He/Him

Desenvolvedor Full Stack Pleno | Node.js com backend, React, Next.js, Angular, Ionic como frontend, TypeScript | DevOps, AWS, Azure, IA | Liderança técnica

🔗 [LinkedIn](https://www.linkedin.com/in/ramos-souza/)

## 📋 Sobre o Projeto

Este é um sistema completo de **inspeção e gerenciamento de webhooks** com integração de IA para geração automática de código TypeScript. O projeto permite:

- **Capturar webhooks** de qualquer origem através de um endpoint universal
- **Visualizar detalhes** completos de cada webhook recebido (headers, body, query params, etc.)
- **Gerenciar webhooks** com funcionalidades de listagem, busca e exclusão
- **Gerar código automaticamente** usando IA (Google Gemini) para criar handlers TypeScript production-ready baseados nos webhooks capturados
- **Interface moderna** com React, TanStack Router e componentes acessíveis

### 🏗️ Arquitetura

O projeto utiliza uma arquitetura monorepo com:

- **API** (`/api`): Backend em Node.js com Fastify, TypeScript e Drizzle ORM
- **Web** (`/web`): Frontend em React com Vite e TypeScript

## 🚀 Tecnologias

### Backend (`/api`)
- **Node.js** com **TypeScript**
- **Fastify** - Framework web rápido e eficiente
- **Drizzle ORM** - ORM moderno para PostgreSQL
- **PostgreSQL** - Banco de dados relacional
- **Docker** - Containerização do banco de dados
- **Zod** - Validação de schemas
- **Fastify Swagger** - Documentação da API
- **AI SDK** - Integração com Google Gemini para geração de código
- **@ai-sdk/google** - SDK oficial do Google para Generative AI

### Frontend (`/web`)
- **React** - Biblioteca para construção de interfaces
- **Vite** - Build tool e dev server
- **TypeScript** - Tipagem estática
- **TanStack Router** - Roteamento type-safe
- **TanStack Query** - Gerenciamento de estado servidor
- **Radix UI** - Componentes acessíveis (Dialog, Checkbox)
- **Tailwind CSS** - Framework CSS utilitário
- **Shiki** - Syntax highlighting para código
- **date-fns** - Manipulação de datas
- **Lucide React** - Ícones

## 📦 Pré-requisitos

- **Node.js** (versão 18 ou superior)
- **pnpm** (versão 10.20.0)
- **Docker** e **Docker Compose**

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd node-react
```

2. Instale as dependências:
```bash
# Instalar dependências do workspace
pnpm install

# Ou instalar individualmente
cd api && pnpm install
cd ../web && pnpm install
```

3. Configure as variáveis de ambiente:

Crie um arquivo `.env` na pasta `api/`:
```env
DATABASE_URL=postgresql://postgres:root@localhost:5434/webhooks
PORT=3333
NODE_ENV=development
GOOGLE_GENERATIVE_AI_API_KEY=sua_api_key_aqui
```

⚠️ **IMPORTANTE:** A porta é **5434** (não 5433) para evitar conflito com PostgreSQL local na porta 5433.

### 🔑 Como obter a Google Generative AI API Key

Para usar a funcionalidade de geração de código de webhook handlers, você precisa de uma API key do Google Generative AI:

1. **Acesse o Google AI Studio:**
   - Vá para [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)

2. **Faça login:**
   - Entre com sua conta Google

3. **Crie uma nova API Key:**
   - Clique em "Create API Key"
   - Selecione um projeto Google Cloud (ou crie um novo)
   - Copie a API key gerada

4. **Adicione no arquivo `.env`:**
   - Cole a API key no campo `GOOGLE_GENERATIVE_AI_API_KEY` no arquivo `.env` da pasta `api/`

5. **Configurações de segurança (recomendado):**
   - No Google Cloud Console, você pode restringir a API key para uso apenas com a API do Generative AI
   - Configure limites de uso para evitar cobranças inesperadas

📝 **Nota:** A API key é necessária apenas para a funcionalidade de geração de código. As outras funcionalidades (listar, visualizar, deletar webhooks) funcionam sem ela.

## 🐳 Docker

### Subir o banco de dados PostgreSQL:

```bash
cd api
docker-compose up -d postgres
```

Isso iniciará o PostgreSQL na porta **5434** com as credenciais:
- **Host:** `localhost`
- **Porta:** `5434` (mapeada de 5432 do container)
- **Database:** `webhooks`
- **Username:** `postgres`
- **Password:** `root`

## 🗄️ Banco de Dados

### Migrações

#### Gerar migrações:
```bash
cd api
pnpm db:generate
```

#### Aplicar migrações:
```bash
# Via drizzle-kit (pode ter problemas de autenticação TCP/IP no Windows)
pnpm db:migrate

# Via Docker (recomendado)
pnpm db:migrate:docker
```

#### Drizzle Studio (Interface visual do banco):
```bash
# Rodar no PC local
pnpm db:studio

# Acessar via prompt interativo do PostgreSQL
pnpm db:studio:docker
```

O Drizzle Studio estará disponível em `http://localhost:4983`

### Scripts disponíveis:

```bash
# Gerar migrações baseadas no schema
pnpm db:generate

# Aplicar migrações (via drizzle-kit)
pnpm db:migrate

# Aplicar migrações (via Docker - recomendado)
pnpm db:migrate:docker

# Abrir Drizzle Studio
pnpm db:studio

# Abrir prompt PostgreSQL interativo
pnpm db:studio:docker
```

## 🚀 Executando o Projeto

### Backend (API)

```bash
cd api
pnpm dev
```

A API estará disponível em `http://localhost:3333`
A documentação Swagger estará disponível em `http://localhost:3333/docs`

### Frontend (Web)

```bash
cd web
pnpm dev
```

O frontend estará disponível em `http://localhost:5173` (ou porta configurada pelo Vite)

## 🚀 Uso Rápido

### 1. Capturar um Webhook

Envie uma requisição para o endpoint de captura:

```bash
# Exemplo: Capturar um webhook do Stripe
curl -X POST http://localhost:3333/capture/stripe/payment \
  -H "Content-Type: application/json" \
  -d '{
    "type": "payment_intent.succeeded",
    "data": {
      "object": {
        "id": "pi_123",
        "amount": 1000,
        "currency": "usd"
      }
    }
  }'
```

### 2. Visualizar Webhooks

- Acesse `http://localhost:5173` no navegador
- Veja a lista de webhooks capturados no painel lateral
- Clique em um webhook para ver seus detalhes completos

### 3. Gerar Handler Code

- Selecione um ou mais webhooks usando os checkboxes
- Clique em "Handle Generator"
- Aguarde a geração do código (pode levar alguns segundos)
- Copie o código gerado usando o botão "Copy Code"

### 4. Deletar Webhooks

- Passe o mouse sobre um webhook na lista
- Clique no ícone de lixeira que aparece
- O webhook será removido imediatamente

## 📁 Estrutura do Projeto

```
node-react/
├── api/                    # Backend
│   ├── src/
│   │   ├── db/            # Configuração do banco de dados
│   │   │   ├── migrations/ # Migrações SQL
│   │   │   └── schema/     # Schemas Drizzle ORM
│   │   ├── routes/         # Rotas da API
│   │   ├── lib/            # Bibliotecas e utilitários
│   │   ├── env.ts          # Validação de variáveis de ambiente
│   │   └── server.ts       # Arquivo principal do servidor
│   ├── docker-compose.yaml # Configuração Docker
│   ├── drizzle.config.ts   # Configuração do Drizzle
│   └── package.json
├── web/                    # Frontend
│   ├── src/
│   │   ├── app.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   └── package.json
└── package.json           # Workspace root
```

## 🔌 API Endpoints

### Webhooks

#### Listar Webhooks
- `GET /api/webhooks` - Lista todos os webhooks recebidos com paginação por cursor
  - **Query params:**
    - `limit` (opcional, padrão: 20): Limite de resultados por página (1-100)
    - `cursor` (opcional): ID do último webhook da página anterior (para paginação)
    - `orderBy` (opcional): Campo para ordenação (`createdAt`)
    - `orderDirection` (opcional): Direção da ordenação (`asc` ou `desc`)
  - **Response 200:**
    ```json
    {
      "webhooks": [
        {
          "id": "string",
          "name": "string",
          "pathname": "string",
          "createdAt": "ISO date"
        }
      ],
      "nextCursor": "string | null",
      "previousCursor": "string | null"
    }
    ```

#### Buscar Webhook por ID
- `GET /api/webhooks/:id` - Busca um webhook específico pelo ID
  - **Params:**
    - `id` (obrigatório): UUID do webhook
  - **Response 200:** Objeto completo do webhook com todos os detalhes (headers, body, query params, etc.)
  - **Response 404:** Webhook não encontrado

#### Deletar Webhook
- `DELETE /api/webhooks/:id` - Deleta um webhook específico
  - **Params:**
    - `id` (obrigatório): UUID do webhook
  - **Response 204:** Webhook deletado com sucesso
  - **Response 404:** Webhook não encontrado

#### Gerar Handler Code
- `POST /api/generate` - Gera código TypeScript de handler para webhooks selecionados usando IA
  - **Body:**
    ```json
    {
      "webhookIds": ["id1", "id2", "id3"]
    }
    ```
  - **Response 201:**
    ```json
    {
      "code": "código TypeScript gerado"
    }
    ```
  - **Response 400:** Nenhum ID de webhook fornecido
  - **Requires:** `GOOGLE_GENERATIVE_AI_API_KEY` configurada no `.env`

#### Capturar Webhook
- `ALL /capture/*` - Captura qualquer requisição webhook enviada para este endpoint
  - **Uso:** Este endpoint captura requisições de qualquer método HTTP (GET, POST, PUT, DELETE, etc.)
  - **Exemplo:** `POST http://localhost:3333/capture/stripe/payment` capturará a requisição
  - **Response 201:**
    ```json
    {
      "id": "uuid-do-webhook-capturado"
    }
    ```
  - **Dados capturados:**
    - Headers HTTP
    - Body da requisição
    - Query parameters
    - IP do remetente
    - Método HTTP
    - Pathname
    - Content-Type e Content-Length

## 🎨 Funcionalidades do Frontend

### Lista de Webhooks
- **Paginação por cursor**: Carregue mais webhooks com o botão "Load more"
- **Seleção múltipla**: Marque vários webhooks usando checkboxes
- **Visualização em tempo real**: Veja todos os webhooks capturados em uma lista organizada
- **Informações exibidas**: Método HTTP, pathname e tempo relativo de captura

### Detalhes do Webhook
- **Visualização completa**: Veja todos os detalhes de um webhook específico
- **Request Overview**: Método, status code, content type e content length
- **Query Parameters**: Visualize todos os parâmetros de query da requisição
- **Headers**: Lista completa de headers HTTP recebidos
- **Request Body**: Body da requisição formatado e destacado
- **Informações adicionais**: IP do remetente e timestamp de captura

### Geração de Handler Code
- **Seleção múltipla**: Selecione vários webhooks para gerar um handler completo
- **IA integrada**: Usa Google Gemini para gerar código TypeScript production-ready
- **Código tipado**: Gera handlers com validação Zod e tipos TypeScript
- **Syntax highlighting**: Visualização do código com destaque de sintaxe
- **Copiar código**: Botão para copiar o código gerado para a área de transferência
- **Loading state**: Indicador visual durante a geração do código

### Gerenciamento
- **Deletar webhooks**: Remova webhooks individuais diretamente da lista
- **Interface responsiva**: Layout adaptável com painéis redimensionáveis
- **Feedback visual**: Estados de loading, sucesso e erro claramente indicados

## 🛠️ Scripts Disponíveis

### Workspace Root
```bash
pnpm install  # Instalar todas as dependências
```

### API (`/api`)
```bash
pnpm dev          # Rodar em modo desenvolvimento
pnpm start        # Rodar em modo produção
pnpm format       # Formatar código com Biome
pnpm db:generate  # Gerar migrações
pnpm db:migrate   # Aplicar migrações
pnpm db:studio    # Abrir Drizzle Studio
```

### Web (`/web`)
```bash
pnpm dev      # Rodar em modo desenvolvimento
pnpm build    # Build para produção
pnpm preview  # Preview do build
```

## 📝 Notas

- O projeto utiliza **pnpm workspaces** para gerenciar dependências
- O banco de dados PostgreSQL roda via Docker para facilitar o setup
- As migrações podem ser aplicadas via Docker para evitar problemas de autenticação TCP/IP no Windows
- A geração de código via IA requer uma API key válida do Google Generative AI
- O modelo usado para geração é o `gemini-2.0-flash-lite` (rápido e eficiente)
- Todos os endpoints da API estão documentados no Swagger disponível em `/docs`

## 🔒 Segurança

⚠️ **Importante:** 
- As credenciais do banco de dados no docker-compose são para desenvolvimento. Em produção, use variáveis de ambiente seguras
- **Nunca commite** arquivos `.env` com credenciais reais no controle de versão
- A `GOOGLE_GENERATIVE_AI_API_KEY` é sensível e deve ser mantida em segredo
- Configure restrições na API key do Google Cloud para limitar o uso apenas ao necessário
- Em produção, use um gerenciador de segredos (AWS Secrets Manager, Azure Key Vault, etc.)
- Adicione `.env` ao `.gitignore` para evitar commits acidentais

## 📄 Licença

Este projeto está em desenvolvimento inicial.

---

<div align="center">

[⬆️ **Voltar ao topo**](#webhook-inspector-with-ai-integration) | [🇺🇸 **English**](#-english)

</div>

---

# 🇺🇸 English

## 👨‍💻 Author

**Ramos (Ramos) de Souza Janones** | He/Him

Full Stack Mid-level Developer | Node.js with backend, React, Next.js, Angular, Ionic as frontend, TypeScript | DevOps, AWS, Azure, AI | Technical Leadership

🔗 [LinkedIn](https://www.linkedin.com/in/ramos-souza/)

## 📋 About the Project

This is a complete **webhook inspection and management system** with AI integration for automatic TypeScript code generation. The project enables:

- **Capture webhooks** from any source through a universal endpoint
- **View complete details** of each received webhook (headers, body, query params, etc.)
- **Manage webhooks** with listing, search, and deletion features
- **Automatically generate code** using AI (Google Gemini) to create production-ready TypeScript handlers based on captured webhooks
- **Modern interface** with React, TanStack Router, and accessible components

### 🏗️ Architecture

The project uses a monorepo architecture with:

- **API** (`/api`): Backend in Node.js with Fastify, TypeScript, and Drizzle ORM
- **Web** (`/web`): Frontend in React with Vite and TypeScript

## 🚀 Technologies

### Backend (`/api`)
- **Node.js** with **TypeScript**
- **Fastify** - Fast and efficient web framework
- **Drizzle ORM** - Modern ORM for PostgreSQL
- **PostgreSQL** - Relational database
- **Docker** - Database containerization
- **Zod** - Schema validation
- **Fastify Swagger** - API documentation
- **AI SDK** - Integration with Google Gemini for code generation
- **@ai-sdk/google** - Official Google SDK for Generative AI

### Frontend (`/web`)
- **React** - Library for building interfaces
- **Vite** - Build tool and dev server
- **TypeScript** - Static typing
- **TanStack Router** - Type-safe routing
- **TanStack Query** - Server state management
- **Radix UI** - Accessible components (Dialog, Checkbox)
- **Tailwind CSS** - Utility CSS framework
- **Shiki** - Syntax highlighting for code
- **date-fns** - Date manipulation
- **Lucide React** - Icons

## 📦 Prerequisites

- **Node.js** (version 18 or higher)
- **pnpm** (version 10.20.0)
- **Docker** and **Docker Compose**

## 🔧 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd node-react
```

2. Install dependencies:
```bash
# Install workspace dependencies
pnpm install

# Or install individually
cd api && pnpm install
cd ../web && pnpm install
```

3. Configure environment variables:

Create a `.env` file in the `api/` folder:
```env
DATABASE_URL=postgresql://postgres:root@localhost:5434/webhooks
PORT=3333
NODE_ENV=development
GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
```

⚠️ **IMPORTANT:** The port is **5434** (not 5433) to avoid conflicts with local PostgreSQL on port 5433.

### 🔑 How to Get Google Generative AI API Key

To use the webhook handler code generation feature, you need a Google Generative AI API key:

1. **Access Google AI Studio:**
   - Go to [https://aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)

2. **Sign in:**
   - Sign in with your Google account

3. **Create a new API Key:**
   - Click "Create API Key"
   - Select a Google Cloud project (or create a new one)
   - Copy the generated API key

4. **Add to `.env` file:**
   - Paste the API key in the `GOOGLE_GENERATIVE_AI_API_KEY` field in the `.env` file in the `api/` folder

5. **Security settings (recommended):**
   - In Google Cloud Console, you can restrict the API key to use only the Generative AI API
   - Configure usage limits to avoid unexpected charges

📝 **Note:** The API key is only required for the code generation feature. Other features (list, view, delete webhooks) work without it.

## 🐳 Docker

### Start PostgreSQL database:

```bash
cd api
docker-compose up -d postgres
```

This will start PostgreSQL on port **5434** with credentials:
- **Host:** `localhost`
- **Port:** `5434` (mapped from container's 5432)
- **Database:** `webhooks`
- **Username:** `postgres`
- **Password:** `root`

## 🗄️ Database

### Migrations

#### Generate migrations:
```bash
cd api
pnpm db:generate
```

#### Apply migrations:
```bash
# Via drizzle-kit (may have TCP/IP authentication issues on Windows)
pnpm db:migrate

# Via Docker (recommended)
pnpm db:migrate:docker
```

#### Drizzle Studio (Visual database interface):
```bash
# Run on local PC
pnpm db:studio

# Access via PostgreSQL interactive prompt
pnpm db:studio:docker
```

Drizzle Studio will be available at `http://localhost:4983`

### Available scripts:

```bash
# Generate migrations based on schema
pnpm db:generate

# Apply migrations (via drizzle-kit)
pnpm db:migrate

# Apply migrations (via Docker - recommended)
pnpm db:migrate:docker

# Open Drizzle Studio
pnpm db:studio

# Open PostgreSQL interactive prompt
pnpm db:studio:docker
```

## 🚀 Running the Project

### Backend (API)

```bash
cd api
pnpm dev
```

The API will be available at `http://localhost:3333`
Swagger documentation will be available at `http://localhost:3333/docs`

### Frontend (Web)

```bash
cd web
pnpm dev
```

The frontend will be available at `http://localhost:5173` (or port configured by Vite)

## 🚀 Quick Usage

### 1. Capture a Webhook

Send a request to the capture endpoint:

```bash
# Example: Capture a Stripe webhook
curl -X POST http://localhost:3333/capture/stripe/payment \
  -H "Content-Type: application/json" \
  -d '{
    "type": "payment_intent.succeeded",
    "data": {
      "object": {
        "id": "pi_123",
        "amount": 1000,
        "currency": "usd"
      }
    }
  }'
```

### 2. View Webhooks

- Access `http://localhost:5173` in your browser
- See the list of captured webhooks in the side panel
- Click on a webhook to see its complete details

### 3. Generate Handler Code

- Select one or more webhooks using checkboxes
- Click "Handle Generator"
- Wait for code generation (may take a few seconds)
- Copy the generated code using the "Copy Code" button

### 4. Delete Webhooks

- Hover over a webhook in the list
- Click the trash icon that appears
- The webhook will be immediately removed

## 📁 Project Structure

```
node-react/
├── api/                    # Backend
│   ├── src/
│   │   ├── db/            # Database configuration
│   │   │   ├── migrations/ # SQL migrations
│   │   │   └── schema/     # Drizzle ORM schemas
│   │   ├── routes/         # API routes
│   │   ├── lib/            # Libraries and utilities
│   │   ├── env.ts          # Environment variables validation
│   │   └── server.ts       # Main server file
│   ├── docker-compose.yaml # Docker configuration
│   ├── drizzle.config.ts   # Drizzle configuration
│   └── package.json
├── web/                    # Frontend
│   ├── src/
│   │   ├── app.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   └── package.json
└── package.json           # Workspace root
```

## 🔌 API Endpoints

### Webhooks

#### List Webhooks
- `GET /api/webhooks` - Lists all received webhooks with cursor-based pagination
  - **Query params:**
    - `limit` (optional, default: 20): Results per page (1-100)
    - `cursor` (optional): ID of the last webhook from the previous page (for pagination)
    - `orderBy` (optional): Field for sorting (`createdAt`)
    - `orderDirection` (optional): Sort direction (`asc` or `desc`)
  - **Response 200:**
    ```json
    {
      "webhooks": [
        {
          "id": "string",
          "name": "string",
          "pathname": "string",
          "createdAt": "ISO date"
        }
      ],
      "nextCursor": "string | null",
      "previousCursor": "string | null"
    }
    ```

#### Get Webhook by ID
- `GET /api/webhooks/:id` - Gets a specific webhook by ID
  - **Params:**
    - `id` (required): Webhook UUID
  - **Response 200:** Complete webhook object with all details (headers, body, query params, etc.)
  - **Response 404:** Webhook not found

#### Delete Webhook
- `DELETE /api/webhooks/:id` - Deletes a specific webhook
  - **Params:**
    - `id` (required): Webhook UUID
  - **Response 204:** Webhook deleted successfully
  - **Response 404:** Webhook not found

#### Generate Handler Code
- `POST /api/generate` - Generates TypeScript handler code for selected webhooks using AI
  - **Body:**
    ```json
    {
      "webhookIds": ["id1", "id2", "id3"]
    }
    ```
  - **Response 201:**
    ```json
    {
      "code": "generated TypeScript code"
    }
    ```
  - **Response 400:** No webhook IDs provided
  - **Requires:** `GOOGLE_GENERATIVE_AI_API_KEY` configured in `.env`

#### Capture Webhook
- `ALL /capture/*` - Captures any webhook request sent to this endpoint
  - **Usage:** This endpoint captures requests of any HTTP method (GET, POST, PUT, DELETE, etc.)
  - **Example:** `POST http://localhost:3333/capture/stripe/payment` will capture the request
  - **Response 201:**
    ```json
    {
      "id": "captured-webhook-uuid"
    }
    ```
  - **Captured data:**
    - HTTP Headers
    - Request body
    - Query parameters
    - Sender IP
    - HTTP method
    - Pathname
    - Content-Type and Content-Length

## 🎨 Frontend Features

### Webhook List
- **Cursor pagination**: Load more webhooks with the "Load more" button
- **Multiple selection**: Mark multiple webhooks using checkboxes
- **Real-time visualization**: See all captured webhooks in an organized list
- **Displayed information**: HTTP method, pathname, and relative capture time

### Webhook Details
- **Complete visualization**: See all details of a specific webhook
- **Request Overview**: Method, status code, content type, and content length
- **Query Parameters**: View all query parameters from the request
- **Headers**: Complete list of received HTTP headers
- **Request Body**: Formatted and highlighted request body
- **Additional information**: Sender IP and capture timestamp

### Handler Code Generation
- **Multiple selection**: Select multiple webhooks to generate a complete handler
- **AI integrated**: Uses Google Gemini to generate production-ready TypeScript code
- **Typed code**: Generates handlers with Zod validation and TypeScript types
- **Syntax highlighting**: Code visualization with syntax highlighting
- **Copy code**: Button to copy generated code to clipboard
- **Loading state**: Visual indicator during code generation

### Management
- **Delete webhooks**: Remove individual webhooks directly from the list
- **Responsive interface**: Adaptive layout with resizable panels
- **Visual feedback**: Loading, success, and error states clearly indicated

## 🛠️ Available Scripts

### Workspace Root
```bash
pnpm install  # Install all dependencies
```

### API (`/api`)
```bash
pnpm dev          # Run in development mode
pnpm start        # Run in production mode
pnpm format       # Format code with Biome
pnpm db:generate  # Generate migrations
pnpm db:migrate   # Apply migrations
pnpm db:studio    # Open Drizzle Studio
```

### Web (`/web`)
```bash
pnpm dev      # Run in development mode
pnpm build    # Build for production
pnpm preview  # Preview the build
```

## 📝 Notes

- The project uses **pnpm workspaces** to manage dependencies
- PostgreSQL database runs via Docker to facilitate setup
- Migrations can be applied via Docker to avoid TCP/IP authentication issues on Windows
- AI code generation requires a valid Google Generative AI API key
- The model used for generation is `gemini-2.0-flash-lite` (fast and efficient)
- All API endpoints are documented in Swagger available at `/docs`

## 🔒 Security

⚠️ **Important:** 
- Database credentials in docker-compose are for development. In production, use secure environment variables
- **Never commit** `.env` files with real credentials to version control
- `GOOGLE_GENERATIVE_AI_API_KEY` is sensitive and must be kept secret
- Configure restrictions on the Google Cloud API key to limit usage to only what's necessary
- In production, use a secrets manager (AWS Secrets Manager, Azure Key Vault, etc.)
- Add `.env` to `.gitignore` to avoid accidental commits

## 📄 License

This project is in initial development.

---

<div align="center">

[⬆️ **Back to top**](#webhook-inspector-with-ai-integration) | [🇧🇷 **Português**](#-português)

---

Desenvolvido com ❤️ por [Ramos de Souza Janones](https://www.linkedin.com/in/ramos-souza/) | Developed with ❤️ by [Ramos de Souza Janones](https://www.linkedin.com/in/ramos-souza/)

</div>
