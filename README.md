# BiznesPort - Messages CRUD

A full-stack project with backend (Express + Sequelize + PostgreSQL) and frontend (React + RTK Query + ShadCN UI components).

## Requirements

- Node.js v18.17.0+
- Docker v20.10.11+

## Running the Project

```bash
docker compose up
```

After startup, the backend automatically:

- runs migrations,
- seeds the database,
- exposes the API at `http://localhost:4000`.

The frontend is available at `http://localhost:5173`.

## Database Management (pgAdmin)

pgAdmin is accessible at `http://localhost:5050` if needed for database management.

**Connection settings for pgAdmin:**
- Host: localhost
- Port: 55432
- Maintenance DB: biznesport (or postgres)
- Username: postgres
- Password: postgres

## API Endpoints

- `GET /api/messages`
- `POST /api/messages`
- `PUT /api/messages/:id`
- `DELETE /api/messages/:id`

Request body for `POST` and `PUT`:

```json
{
  "content": "Message content"
}
```

## Migrations and Seeds (Manual)

From the `backend` directory:

```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```
