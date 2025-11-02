# Minima Backend API

A RESTful API backend for the MinimaList todo application, built with NestJS, Prisma, and MySQL.

## 🚀 Technologies

- **NestJS** - Progressive Node.js framework
- **Prisma** - Next-generation ORM for database management
- **MySQL** - Relational database
- **TypeScript** - Type-safe JavaScript
- **class-validator** - Validation decorators
- **class-transformer** - Object transformation utilities

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MySQL database (local or hosted)
- Prisma CLI (included in devDependencies)

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env` file in the root of the `minima-backend` directory:
```env
DATABASE_URL="mysql://user:password@host:port/database"
PORT=3000
```

3. Generate Prisma Client:
```bash
npx prisma generate
```

4. Run database migrations:
```bash
npm run migrate:dev
# or for production
npm run migrate
```

## 🗄️ Database Schema

### Task Model
- `id` (Int, Primary Key, Auto-increment)
- `title` (String, Required)
- `priority` (Priority Enum: LOW, MEDIUM, HIGH)
- `day` (Day Enum: MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY, NEXTWEEK, LATER)
- `tag` (Tag Enum: IMPORTANT, NOTIMPORTANT)
- `completed` (Boolean, Default: false)
- `createdAt` (DateTime, Auto-generated)
- `updatedAt` (DateTime, Auto-updated)

## 🔌 API Endpoints

Base URL: `http://localhost:3000` (or your deployed URL)

### Task Endpoints

#### 1. Get All Tasks
**GET** `/task`

Retrieves all tasks from the database.

**Response:**
```json
[
  {
    "id": 1,
    "title": "Complete project",
    "priority": "HIGH",
    "day": "MONDAY",
    "tag": "IMPORTANT",
    "completed": false,
    "createdAt": "2025-11-01T12:00:00.000Z",
    "updatedAt": "2025-11-01T12:00:00.000Z"
  }
]
```

**Status Codes:**
- `200 OK` - Success
- `500 Internal Server Error` - Server error

---

#### 2. Get Task by ID
**GET** `/task/:id`

Retrieves a specific task by its ID.

**Parameters:**
- `id` (number, required) - Task ID

**Response:**
```json
{
  "id": 1,
  "title": "Complete project",
  "priority": "HIGH",
  "day": "MONDAY",
  "tag": "IMPORTANT",
  "completed": false,
  "createdAt": "2025-11-01T12:00:00.000Z",
  "updatedAt": "2025-11-01T12:00:00.000Z"
}
```

**Status Codes:**
- `200 OK` - Success
- `404 Not Found` - Task not found
- `500 Internal Server Error` - Server error

**Example:**
```bash
curl http://localhost:3000/task/1
```

---

#### 3. Create Task
**POST** `/task`

Creates a new task.

**Request Body:**
```json
{
  "title": "New task",
  "priority": "MEDIUM",
  "day": "TUESDAY",
  "tag": "IMPORTANT",
  "completed": false
}
```

**Required Fields:**
- `title` (string) - Task title
- `priority` (enum: LOW | MEDIUM | HIGH) - Task priority
- `day` (enum: MONDAY | TUESDAY | WEDNESDAY | THURSDAY | FRIDAY | SATURDAY | SUNDAY | NEXTWEEK | LATER) - Task day
- `tag` (enum: IMPORTANT | NOTIMPORTANT) - Task tag

**Optional Fields:**
- `completed` (boolean, default: false) - Completion status

**Response:**
```json
{
  "id": 1,
  "title": "New task",
  "priority": "MEDIUM",
  "day": "TUESDAY",
  "tag": "IMPORTANT",
  "completed": false,
  "createdAt": "2025-11-01T12:00:00.000Z",
  "updatedAt": "2025-11-01T12:00:00.000Z"
}
```

**Status Codes:**
- `201 Created` - Task created successfully
- `400 Bad Request` - Validation error
- `500 Internal Server Error` - Server error

**Example:**
```bash
curl -X POST http://localhost:3000/task \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New task",
    "priority": "MEDIUM",
    "day": "TUESDAY",
    "tag": "IMPORTANT"
  }'
```

---

#### 4. Update Task
**PATCH** `/task/:id`

Updates an existing task. All fields are optional.

**Parameters:**
- `id` (number, required) - Task ID

**Request Body:**
```json
{
  "title": "Updated task title",
  "priority": "HIGH",
  "day": "WEDNESDAY",
  "tag": "NOTIMPORTANT",
  "completed": true
}
```

**All fields are optional** - Only include fields you want to update.

**Response:**
```json
{
  "id": 1,
  "title": "Updated task title",
  "priority": "HIGH",
  "day": "WEDNESDAY",
  "tag": "NOTIMPORTANT",
  "completed": true,
  "createdAt": "2025-11-01T12:00:00.000Z",
  "updatedAt": "2025-11-01T12:05:00.000Z"
}
```

**Status Codes:**
- `200 OK` - Task updated successfully
- `404 Not Found` - Task not found
- `400 Bad Request` - Validation error
- `500 Internal Server Error` - Server error

**Example:**
```bash
curl -X PATCH http://localhost:3000/task/1 \
  -H "Content-Type: application/json" \
  -d '{
    "completed": true,
    "priority": "HIGH"
  }'
```

---

#### 5. Delete Task
**DELETE** `/task/:id`

Deletes a task by its ID.

**Parameters:**
- `id` (number, required) - Task ID

**Response:**
```json
{
  "id": 1,
  "title": "Task to delete",
  "priority": "LOW",
  "day": "MONDAY",
  "tag": "IMPORTANT",
  "completed": false,
  "createdAt": "2025-11-01T12:00:00.000Z",
  "updatedAt": "2025-11-01T12:00:00.000Z"
}
```

**Status Codes:**
- `200 OK` - Task deleted successfully
- `404 Not Found` - Task not found
- `500 Internal Server Error` - Server error

**Example:**
```bash
curl -X DELETE http://localhost:3000/task/1
```

---

## 🔧 Available Scripts

- `npm run build` - Build the application and generate Prisma client
- `npm run start` - Start the application in production mode
- `npm run start:dev` - Start the application in development mode with hot-reload
- `npm run start:debug` - Start the application in debug mode
- `npm run start:prod` - Run migrations and start in production mode
- `npm run migrate` - Run database migrations (production)
- `npm run migrate:dev` - Run database migrations (development)
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run lint` - Lint code

## 🌐 CORS Configuration

The API is configured to accept requests from any origin in development. For production, update the CORS configuration in `src/main.ts`:

```typescript
app.enableCors({
  origin: 'https://your-frontend-domain.com', // Specify your frontend URL
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});
```

## 📝 Error Handling

All errors are handled by a global exception filter that returns consistent error responses:

```json
{
  "statusCode": 500,
  "timestamp": "2025-11-01T12:00:00.000Z",
  "path": "/task",
  "message": "Error message description"
}
```

Common HTTP status codes:
- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `400 Bad Request` - Validation error or bad request
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## 🚀 Deployment

### Environment Variables

Ensure the following environment variables are set in your production environment:

- `DATABASE_URL` - MySQL connection string
- `PORT` - Server port (default: 3000)

### Railway Deployment

The application is configured to work with Railway. The `start:prod` script automatically runs migrations before starting the server.

### Build Process

During build, Prisma client is automatically generated:
```bash
npm run build
```

This runs `prisma generate && nest build`.

## 🔍 Validation

All endpoints use class-validator for request validation:

- **CreateTaskDto**: All fields required except `completed`
- **UpdateTaskDTO**: All fields optional (partial type)

Invalid enum values or missing required fields will return `400 Bad Request` with validation error details.

## 📚 Additional Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [MySQL Documentation](https://dev.mysql.com/doc/)

## 📄 License

UNLICENSED
