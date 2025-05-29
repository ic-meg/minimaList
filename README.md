# 📝 MinimaList — A Minimalist To-Do List App

MinimaList is a clean and responsive to-do list web app built with React and Tailwind CSS. It lets users manage their daily tasks with priority tags, a day selector, and a fun personal touch — your name!

![MinimaList Screenshot]![Screenshot 2025-05-30 034050](https://github.com/user-attachments/assets/7073a851-2415-449c-b705-39c00494a5d7)

---

## 🚀 Features

- ✅ Add, complete, and delete tasks  
- 🌱 Input your name for a personalized greeting  
- 🔄 Tasks persist using localStorage  
- 🗓 Set task day (Mon–Sun, Next Week, Later)  
- 🎯 Set task priority and tag (e.g., Important)  
- 📊 Progress bar showing completed tasks  
- 🧼 Clean and modern minimalist UI  

---

## 🔧 Built With

- [React](https://reactjs.org/) — Functional components + hooks  
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first styling  
- [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) — To persist tasks  

---

## 📦 Folder Structure

```bash
📁 src
├── components
│   ├── NameModal.jsx
│   ├── TaskItem.jsx
│   ├── FilterButton.jsx
│   ├── TodoList.jsx
│   ├── ProgressBar.jsx
│   └── TaskModal.jsx
├── assets
│   ├── icons/
│   ├── image/
│   └──fonts/
├── App.jsx
└── main.jsx
