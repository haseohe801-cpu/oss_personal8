// [제공] 부모 CourseList로부터 Props를 전달받는 자식 컴포넌트입니다.
import { useState } from "react";

export default function CourseItem({ course, onDelete, onToggle, onEdit }) {

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(course.name);

  function startEdit () {
    setEditedName(course.name);
    setIsEditing(true);
  }

  function saveEdit() {
    const name = editedName.trim();
    if (name === "") return;
    onEdit(course.id, name);
    setIsEditing(false);
  }

  function cancelEdit() {
    setIsEditing(false);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") 
      saveEdit();
    if (event.key === "Escape") 
      cancelEdit();
  }

return (
    <div className="course-row">
      <div className="course-main">
        <input
          className="check"
          type="checkbox"
          checked={course.completed}
          onChange={() => onToggle(course.id)}
          aria-label={`${course.name} 완료 여부`}
        />
        <div>
          {isEditing ? (
            <input
              className="input edit-input"
              value={editedName}
              onChange={(event) => setEditedName(event.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              aria-label="수정"
            />
          ) : (
            <div className={`course-title ${course.completed ? "done" : ""}`}>
              {course.name}
            </div>
          )}
          <div className="course-id">Course #{course.id}</div>
        </div>
      </div>
      <div className="category-cell">
        <span className="category">{course.category}</span>
      </div>
      <div className="actions">
        {isEditing ? (
          <div className="edit-actions">
            <button className="btn primary tiny" type="button" onClick={saveEdit}>
              Save
            </button>
            <button className="btn secondary tiny" type="button" onClick={cancelEdit}>
              Cancel
            </button>
          </div>
        ) : (
          <>
            <button className="btn secondary tiny" type="button" onClick={startEdit}>
              Edit
            </button>
            <button className="btn danger" type="button" onClick={() => onDelete(course.id)}>
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}
