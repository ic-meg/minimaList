# MinimaList — A Minimalist To-Do List App

MinimaList is a clean and responsive full-stack to-do list web application built with React frontend and NestJS backend. It lets users manage their daily tasks with priority tags, a day selector, and a fun personal touch — your name!

🟢 **Live Demo:** [https://minima-list-phi.vercel.app/](https://minima-list-phi.vercel.app/)

![MinimaList Screenshot]![Screenshot 2025-05-30 034050](https://github.com/user-attachments/assets/7073a851-2415-449c-b705-39c00494a5d7)

---

##  Features

- Add, complete, edit, and delete tasks  
- Input your name for a personalized greeting  
- Set task priority (Low, Medium, High) and tag (Important, Not Important)  
- Day selector (Monday-Sunday, Next Week, Later)
- Progress bar showing completed tasks  
- Task filtering (All, To-Do, Completed)
- Real-time updates with RESTful API
- Clean and modern minimalist UI  
- Loading indicators for better UX

---

##  Built With

### Frontend
- [React](https://reactjs.org/) — Functional components + hooks  
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first styling  
- [Vite](https://vitejs.dev/) — Fast build tool and dev server

### Backend
- [NestJS](https://nestjs.com/) — Progressive Node.js framework
- [TypeScript](https://www.typescriptlang.org/) — Type-safe JavaScript
- [Prisma](https://www.prisma.io/) — Next-generation ORM
- [MySQL](https://www.mysql.com/) — Relational database

---

##  Folder Structure

```bash
minimaList/
├── src/                          # Frontend source code
│   ├── components/
│   │   ├── NameModal.jsx
│   │   ├── TaskItem.jsx
│   │   ├── FilterButtons.jsx
│   │   ├── TodoList.jsx
│   │   ├── ProgressBar.jsx
│   │   └── TaskModal.jsx
│   ├── api/                      # API utilities
│   │   ├── apiRequest.jsx
│   │   └── taskApi.jsx
│   ├── assets/
│   │   ├── icons/
│   │   ├── image/
│   │   └── fonts/
│   ├── App.jsx
│   └── main.jsx
│
└── minima-backend/               # Backend source code
    ├── src/
    │   ├── task/                 # Task module
    │   ├── database/             # Database service
    │   └── main.ts
    └── prisma/                   # Database schema & migrations
```

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MySQL Database

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd minimaList
   ```

2. **Backend Setup**
   ```bash
   cd minima-backend
   npm install
   ```
   
   Create a `.env` file:
   ```env
   DATABASE_URL="mysql://username:password@host:port/database_name"
   PORT=3000
   ```
   
   Generate Prisma client and run migrations:
   ```bash
   npx prisma generate
   npm run migrate:dev
   npm run start:dev
   ```

3. **Frontend Setup**
   ```bash
   # In project root
   npm install
   ```
   
   Create a `.env` file:
   ```env
   VITE_TASK_API=http://localhost:3000/task
   ```
   
   Start the development server:
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:3000/task`

For detailed API documentation, see [`minima-backend/README.md`](./minima-backend/README.md)

---

## API Endpoints

- `GET /task` - Get all tasks
- `GET /task/:id` - Get task by ID
- `POST /task` - Create new task (returns: `{ message: "Task created successfully", data: {...} }`)
- `PATCH /task/:id` - Update task (returns: `{ message: "Task updated successfully", data: {...} }`)
- `DELETE /task/:id` - Delete task (returns: `{ message: "Task deleted successfully", data: {...} }`)

---

## Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend
- `npm run start:dev` - Start development server with hot-reload
- `npm run start:prod` - Start production server
- `npm run build` - Build TypeScript to JavaScript
- `npm run migrate` - Run database migrations (production)
- `npm run migrate:dev` - Run database migrations (development)

---

## Documentation

- [`minima-backend/README.md`](./minima-backend/README.md) - Backend API documentation with detailed endpoint descriptions
- [`minima-backend/POSTMAN_TESTS.md`](./minima-backend/POSTMAN_TESTS.md) - Postman test scripts for API testing
- [`ACTIVITY_DOCUMENT.md`](./ACTIVITY_DOCUMENT.md) - Activity documentation

---

## License

UNLICENSED
