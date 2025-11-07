# API - Webhook Inspector

## Configuração do Banco de Dados

### Pré-requisitos
- Docker e Docker Compose instalados
- Arquivo `.env` configurado na raiz do diretório `api/`

### Configuração do .env

Crie um arquivo `.env` na raiz do diretório `api/` com o seguinte conteúdo:

```env
# Database Configuration
# URL para conexão local via Docker (porta 5434 mapeada)
# IMPORTANTE: Porta 5434 para evitar conflito com PostgreSQL local na porta 5433
DATABASE_URL=postgresql://postgres:root@localhost:5434/webhooks

# Server Configuration
NODE_ENV=development
PORT=3333
HOST=0.0.0.0
```

**⚠️ IMPORTANTE:** Se você tiver um PostgreSQL local rodando na porta 5433, o Docker foi configurado para usar a porta **5434** para evitar conflitos.

### Iniciando o Banco de Dados

1. **Inicie o container do PostgreSQL:**
   ```bash
   cd api
   docker-compose up -d postgres
   ```

2. **Verifique se o banco foi criado:**
   ```bash
   docker exec -it webhooks-db psql -U postgres -c "\l"
   ```
   
   Você deve ver o banco `webhooks` na lista.

3. **Se o banco não existir, crie manualmente:**
   ```bash
   docker exec -it webhooks-db psql -U postgres -c "CREATE DATABASE webhooks;"
   ```

4. **Aplique as migrations:**
   ```bash
   pnpm db:migrate:docker
   ```

5. **Execute o seed (opcional):**
   ```bash
   pnpm db:seed:docker
   ```

### Scripts Disponíveis

- `pnpm dev` - Inicia o servidor em modo desenvolvimento
- `pnpm db:generate` - Gera as migrations
- `pnpm db:migrate` - Aplica as migrations localmente
- `pnpm db:migrate:docker` - Aplica as migrations no Docker
- `pnpm db:seed` - Executa o seed localmente
- `pnpm db:seed:docker` - Executa o seed no Docker
- `pnpm db:studio` - Abre o Drizzle Studio
- `pnpm db:studio:docker` - Abre o psql no container Docker

### Troubleshooting

**Erro: "database webhooks does not exist"**

1. Verifique se o container está rodando:
   ```bash
   docker ps
   ```

2. Verifique se o banco existe:
   ```bash
   docker exec -it webhooks-db psql -U postgres -c "\l"
   ```

3. Se o banco não existir, recrie o container:
   ```bash
   docker-compose down -v
   docker-compose up -d postgres
   ```

4. Verifique se o `.env` tem a `DATABASE_URL` correta:
   ```env
   DATABASE_URL=postgresql://postgres:root@localhost:5434/webhooks
   ```
   
   **⚠️ IMPORTANTE:** A porta é **5434**, não 5433, para evitar conflito com PostgreSQL local.

