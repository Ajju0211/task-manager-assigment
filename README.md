# 🧠 Collaborative Task Manager (MERN Stack)

A simple, modular, and cleanly coded collaborative task manager built using the **MERN stack**.  
This application enables users to create, assign, update, and filter tasks — supporting real-world collaboration workflows.

---

## 🎯 Features

- ✅ **Create Tasks**: Add a new task with title, description, assignee, and status
- 🔁 **Update Tasks**: Change the status (To Do, In Progress, Done)
- 🔍 **Filter Tasks**:
  - By **Status** (e.g., To Do, Done)
  - By **Assignee** (e.g., Alice, Bob)
- ❌ **Delete Tasks**: Remove unnecessary tasks
- 📄 **List All Tasks**: View and manage all team tasks

---

## 🛠 Tech Stack

- **Frontend**: React.js (Hooks + Functional Components)
- **Backend**: Node.js + Express.js
- **Database**: MongoDB (Mongoose)
- **Styling**: Material Tailwind / Bootstrap / CSS
- **Version Control**: Git + GitHub

---

## 📁 Folder Structure

```
root/
├── client/               # React frontend
│   └── src/
│       ├── components/   # Task components (form, list, filters, etc.)
│       └── App.js        # Main application logic
│
├── server/               # Express backend
│   ├── models/           # Mongoose schemas (Task.js)
│   ├── routes/           # REST API routes (taskRoutes.js)
│   ├── controllers/      # API logic handlers (taskController.js)
│   └── index.js          # Server entry point
│
└── README.md             # Project documentation
```

---

## ⚙️ Getting Started

### 1. 🔧 Clone the Repository

```bash
git clone https://github.com/your-username/task-manager.git
cd task-manager
```

---

### 2. 🚀 Backend Setup (Server)

```bash
cd server
npm install
npm start    # Server will run on port 5000
```

📌 Make sure MongoDB is running locally or provide a URI in `.env`:

```env
MONGO_URI=mongodb://localhost:27017/taskdb
```

---

### 3. 💻 Frontend Setup (Client)

```bash
cd client
npm install
npm start    # React app runs on port 3000
```

---

## 📫 API Documentation

### 🔹 Base URL

```
http://localhost:5000/api/tasks
```

---

### 🔹 POST /api/tasks

**Create a new task**

```json
{
  "title": "Build UI",
  "description": "Create the task form",
  "assignedTo": "Ajay",
  "status": "To Do"
}
```

---

### 🔹 GET /api/tasks

**Get all tasks**

**Optional filters:**

```
/api/tasks?status=In Progress
/api/tasks?assignedTo=Ajay
```

---

### 🔹 PUT /api/tasks/:id

**Update an existing task by ID**

```json
{
  "status": "Done"
}
```

---

### 🔹 DELETE /api/tasks/:id

**Delete a task by ID**

---

## 👨‍💻 Simulated Team Roles (Solo Dev)

- **Frontend Developer**: Created responsive UI, task forms, filters using React
- **Backend Developer**: Built RESTful APIs using Express.js
- **Database Engineer**: Designed Mongoose models and managed MongoDB integration
- **QA / Tester**: Tested API endpoints with Postman, ensured full functionality

---

## 🧪 Future Improvements

- 🔐 Authentication with JWT
- 🧑‍🤝‍🧑 Role-based access (Admin/User)
- 🌐 Deploy to Render (backend) and Netlify (frontend)
- 📱 Mobile-friendly UI
- 📈 Pagination and Search

---

## 🙌 Acknowledgements

Thanks to [Material Tailwind](https://www.material-tailwind.com/) and [MongoDB](https://www.mongodb.com/) for open-source tools and documentation.

---

## 👨‍💻 Author

**Ajay Singh**  
GitHub: [@ajay-github](https://github.com/ajay-github)  
LinkedIn: [linkedin.com/in/ajay](#)
