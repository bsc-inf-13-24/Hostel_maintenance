# Hostel Maintenance Management System

## Description

This project is a REST API developed using NestJS and Oracle Database for managing hostel maintenance issues.

Students can report maintenance problems, while administrators manage and update requests.

---

## Features

- Student registration and login
- JWT authentication
- Create maintenance requests
- View requests
- Update request status
- Delete requests
- Admin role management
- Duplicate request prevention

---

## Technologies Used

- NestJS
- TypeORM
- Oracle Database
- JWT
- TypeScript

---

## Installation

```bash
npm install
npm run start
```

---

## Environment Variables

Create `.env`

```env
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_SERVICE_NAME=

JWT_SECRET=
```

---

## API Endpoints

### Authentication

| Method | Endpoint |
|---|---|
| POST | /auth/register |
| POST | /auth/login |
| POST | /auth/setup-admin |
| POST | /auth/create-admin |

---

### Requests

| Method | Endpoint |
|---|---|
| POST | /requests |
| GET | /requests |
| GET | /requests/student/:id |
| GET | /requests/:id |
| PATCH | /requests/:id |
| DELETE | /requests/:id |

---#GROUP 14

