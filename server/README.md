# Digital Library API (Backend)

## Setup
1. `npm install`
2. Create `.env` file (see `.env.example`).
3. `npm run dev`

## Endpoints
- **Auth**:
  - `POST /api/auth/register`
  - `POST /api/auth/login`
  - `GET /api/auth/me`
- **Books**:
  - `GET /api/books`
  - `POST /api/books` (Admin)
  - `PUT /api/books/:id` (Admin)
  - `DELETE /api/books/:id` (Admin)
  - `PUT /api/books/:id/borrow` (User)
  - `PUT /api/books/:id/return` (User)

## Documentation
- Swagger UI available at `http://localhost:5000/api-docs`
