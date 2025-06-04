import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Layout from "./Components/Layout";
import Daily from "./Components/Dailytask";
import Weekly from "./Components/weekly";
import Monthly from "./Components/monthly";
import Yearly from "./Components/yearlytask"; 


import All from "./Components/Alltask";

function App() {
  const [tasks, setTasks] = useState([
    // Daily tasks
    { id: 1, name: "Morning workout", duration: "daily", createdAt: new Date() },
    { id: 2, name: "Read for 30 minutes", duration: "daily", createdAt: new Date() },
    { id: 3, name: "Check emails", duration: "daily", createdAt: new Date() },
    { id: 4, name: "Practice coding", duration: "daily", createdAt: new Date() },

    // Weekly tasks
    { id: 5, name: "Team meeting", duration: "weekly", createdAt: new Date() },
    { id: 6, name: "Grocery shopping", duration: "weekly", createdAt: new Date() },
    { id: 7, name: "Clean the house", duration: "weekly", createdAt: new Date() },
    { id: 8, name: "Call family", duration: "weekly", createdAt: new Date() },

    // Monthly tasks
    { id: 9, name: "Pay bills", duration: "monthly", createdAt: new Date() },
    { id: 10, name: "Review budget", duration: "monthly", createdAt: new Date() },
    { id: 11, name: "Car maintenance", duration: "monthly", createdAt: new Date() },

    // Yearly tasks
    { id: 12, name: "Annual health checkup", duration: "yearly", createdAt: new Date() },
    { id: 13, name: "File tax returns", duration: "yearly", createdAt: new Date() },
    { id: 14, name: "Plan vacation", duration: "yearly", createdAt: new Date() },
  ])

  const addTask = (name, duration) => {
    const newTask = {
      id: Date.now(),
      name,
      duration,
      createdAt: new Date(),
    }
    setTasks([...tasks, newTask])
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const editTask = (id, newName) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, name: newName } : task)))
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout onAddTask={addTask} />}>
          <Route index element={<Navigate to="/all" replace />} />
          <Route path="daily" element={<Daily tasks={tasks} onEditTask={editTask} onDeleteTask={deleteTask} />} />
          <Route path="weekly" element={<Weekly tasks={tasks} onEditTask={editTask} onDeleteTask={deleteTask} />} />
          <Route path="monthly" element={<Monthly tasks={tasks} onEditTask={editTask} onDeleteTask={deleteTask} />} />
          <Route path="yearly" element={<Yearly tasks={tasks} onEditTask={editTask} onDeleteTask={deleteTask} />} />
          <Route path="all" element={<All tasks={tasks} onEditTask={editTask} onDeleteTask={deleteTask} />} />
          <Route path="*" element={<Navigate to="/all" replace />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App