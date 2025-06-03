import { useState } from "react"
import { CiEdit } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdSaveAlt } from "react-icons/md";
import { HiMiniArchiveBoxXMark } from "react-icons/hi2";
import "../Styles/All.css"

function All({ tasks, onEditTask, onDeleteTask }) {
  const [editingTaskId, setEditingTaskId] = useState(null)
  const [editName, setEditName] = useState("")

  const startEdit = (task) => {
    setEditingTaskId(task.id)
    setEditName(task.name)
  }

  const saveEdit = () => {
    if (editName.trim() && editingTaskId) {
      onEditTask(editingTaskId, editName.trim())
      setEditingTaskId(null)
      setEditName("")
    }
  }

  const cancelEdit = () => {
    setEditingTaskId(null)
    setEditName("")
  }

  return (
    <div className="all-container">
      <div className="all-content">
        {tasks.length > 0 ? (
          <div className="task-list">
            {tasks.map((task, index) => (
              <div key={task.id} className="task-item">
                {editingTaskId === task.id ? (
                  <div className="edit-container">
                    <span className="task-number">{index + 1}</span>
                    <input
                      type="text"
                      className="edit-input"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") saveEdit()
                        if (e.key === "Escape") cancelEdit()
                      }}
                      autoFocus
                    />
                    <div className="task-actions">
                      <button className="edit-btn save-btn" onClick={saveEdit} disabled={!editName.trim()}>
                      <MdSaveAlt size={16} />
                      </button>
                      <button className="edit-btn cancel-btn" onClick={cancelEdit}>
                      <HiMiniArchiveBoxXMark size={16} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="task-info">
                      <span className="task-number">{index + 1}</span>
                      <span className="task-name">{task.name}</span>
                    </div>
                    <div className="task-actions">
                      <button className="edit-btn" onClick={() => startEdit(task)}>
                       <CiEdit size={16} />
                      </button>
                      <button className="delete-btn" onClick={() => onDeleteTask(task.id)}>
                       <FaRegTrashAlt  size={16} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-card">
              <p className="empty-title">No tasks yet!</p>
              <p className="empty-text">Add your first task using the form above.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default All