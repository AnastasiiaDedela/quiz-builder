# Quiz Builder

A full-stack quiz creation platform built with NestJS and Next.js.

## Project Structure

```
quiz-builder/
├── backend/    # NestJS + Prisma + SQLite
└── frontend/   # Next.js + TypeScript + Tailwind CSS
```

## Tech Stack

**Backend**
- Node.js + NestJS
- TypeScript
- SQLite via Prisma ORM

**Frontend**
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- React Hook Form + Zod

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm v9+

---

### Backend Setup

```bash
cd backend
```

1. Install dependencies:
```bash
npm install
```

2. Copy the example env file:
```bash
cp .env.example .env
```

3. Run the database migration:
```bash
npx prisma migrate dev
```

4. Start the development server:
```bash
npm run start:dev
```

The backend will be running at `http://localhost:3001/api`.

---

### Frontend Setup

```bash
cd frontend
```

1. Install dependencies:
```bash
npm install
```

2. Copy the example env file:
```bash
cp .env.local.example .env.local
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be running at `http://localhost:3000`.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/quizzes` | Create a new quiz |
| `GET` | `/api/quizzes` | List all quizzes |
| `GET` | `/api/quizzes/:id` | Get a quiz by ID |
| `DELETE` | `/api/quizzes/:id` | Delete a quiz |

---

## Pages

| Route | Description |
|-------|-------------|
| `/quizzes` | Dashboard listing all quizzes |
| `/quizzes/:id` | Read-only quiz detail view |
| `/create` | Create a new quiz |

---

## Creating a Sample Quiz

With both servers running, send this request to create a sample quiz:

```bash
curl -X POST http://localhost:3001/api/quizzes \
  -H "Content-Type: application/json" \
  -d '{
    "title": "General Knowledge",
    "questions": [
      {
        "type": "BOOLEAN",
        "text": "The Earth is the third planet from the Sun.",
        "order": 0
      },
      {
        "type": "INPUT",
        "text": "What is the capital of France?",
        "order": 1
      },
      {
        "type": "CHECKBOX",
        "text": "Which of these are programming languages?",
        "options": ["Python", "HTML", "JavaScript", "Photoshop"],
        "order": 2
      }
    ]
  }'
```

Or navigate to `http://localhost:3000/create` and use the UI.

---

## Environment Variables

**backend/.env**
```
DATABASE_URL="file:./dev.db"
PORT=3001
FRONTEND_URL="http://localhost:3000"
```

**frontend/.env.local**
```
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```
