# Webhook Inspector com IA integrada

Projeto de setup inicial para um sistema de inspeção e gerenciamento de webhooks.

## 👨‍💻 Autor

**Ramos (Ramos) de Souza Janones** | He/Him

Desenvolvedor Full Stack Pleno | Node.js com backend, React, Next.js, Angular, Ionic como frontend, TypeScript | DevOps, AWS, Azure, IA | Liderança técnica

🔗 [LinkedIn](https://www.linkedin.com/in/ramos-souza/)

## 📋 Sobre o Projeto

Este é um projeto de **setup inicial** para um sistema de inspeção de webhooks, permitindo visualizar, gerenciar e analisar requisições webhook recebidas.

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

### Frontend (`/web`)
- **React** - Biblioteca para construção de interfaces
- **Vite** - Build tool e dev server
- **TypeScript** - Tipagem estática

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
DATABASE_URL="postgresql://postgres:root@localhost:5433/webhooks"
PORT=3333
NODE_ENV=development
```

## 🐳 Docker

### Subir o banco de dados PostgreSQL:

```bash
cd api
docker-compose up -d
```

Isso iniciará o PostgreSQL na porta **5433** com as credenciais:
- **Host:** `localhost`
- **Porta:** `5433`
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

- `GET /api/webhooks` - Lista todos os webhooks recebidos
  - Query params:
    - `page` (opcional): Número da página
    - `limit` (opcional, padrão: 20): Limite de resultados (1-100)

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

- Este é um projeto de **setup inicial** e está em constante desenvolvimento
- O projeto utiliza **pnpm workspaces** para gerenciar dependências
- O banco de dados PostgreSQL roda via Docker para facilitar o setup
- As migrações podem ser aplicadas via Docker para evitar problemas de autenticação TCP/IP no Windows

## 🔒 Segurança

⚠️ **Importante:** As credenciais do banco de dados no docker-compose são para desenvolvimento. Em produção, use variáveis de ambiente seguras e nunca commite arquivos `.env` com credenciais reais.

## 📄 Licença

Este projeto está em desenvolvimento inicial.

---

Desenvolvido com ❤️ por [Ramos de Souza Janones](https://www.linkedin.com/in/ramos-souza/)

