import { useState } from "react";
import CourseItem from "./CourseItem.jsx";
import { initialCourses } from "../data/courses.js";

export default function CourseList() {
  // [제공] 초기 배열을 useState로 관리합니다.
  const [courses, setCourses] = useState(initialCourses);
  const [newName, setNewName] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");



  // [제공] 삭제 기능: filter로 새 배열을 만들어 업데이트합니다.
  function handleDelete(id) {
    if (!window.confirm("이 과목을 삭제하시겠습니까?")) return;
    setCourses((previous) => previous.filter((course) => course.id !== id));
  }

  // TODO 1 (필수): 과목 추가 기능을 구현하세요.
  function handleAdd(event) {
    event.preventDefault();
    // TODO: 빈 입력 검사, 새 과목 객체 생성, setCourses 호출, 입력창 초기화

    const name = newName.trim();
    if (name === "") return;

    const newCourse = {
      id: Date.now(),
      name: name,
      category: "기타",
      completed: false,
    };

    setCourses((previous) => [...previous, newCourse]);
    setNewName("");
  }

  // TODO 2 (필수): 완료 상태 변경 기능을 구현하세요.
  function handleToggle(id) {
    // TODO: map과 spread(...)를 사용하여 해당 id의 completed를 반전
    setCourses((previous) =>
      previous.map((course) =>
        course.id === id ? { ...course, completed: !course.completed } : course
      )
    );
  }

 //  추가 기능: 이름 수정
 function handleEdit(id, newName) {
    setCourses((previous) =>
      previous.map((course) =>
        course.id === id ? { ...course, name: newName } : course
      )
    );
  }

  // 추가 기능: 검색 + 완료/미완료 필터
  const filteredCourses = courses.filter((course) => {
    const matchName = course.name.toLowerCase().includes(search.trim().toLowerCase());

    const matchStatus =
      statusFilter === "all" ||
      (statusFilter === "done" && course.completed) ||
      (statusFilter === "progress" && !course.completed);

    return matchName && matchStatus;
  });

const doneCount = courses.filter((course) => course.completed).length;

  return (
    <>
      <section className="stats" aria-label="과목 통계">
        <div className="stat">
          <span>전체 과목</span>
          <strong>{courses.length}</strong>
        </div>
        <div className="stat">
          <span>완료</span>
          <strong className="green">{doneCount}</strong>
        </div>
        <div className="stat">
          <span>진행 중</span>
          <strong className="blue">{courses.length - doneCount}</strong>
        </div>
      </section>
      <section className="panel">
        <div className="panel-header">
          <h2>My Courses</h2>
          <span className="small-note">{courses.length} courses</span>
        </div>
        <p className="todo">
          실습 과제: 아래 Add 버튼과 완료 체크박스의 기능을 직접 구현하세요.
        </p>
        <form className="add-form" onSubmit={handleAdd}>
          <input
            className="input"
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
            placeholder="새 과목명을 입력하세요"
            aria-label="새 과목명"
          />
          <button className="btn primary" type="submit">
            + Add Course
          </button>
        </form>
        <div className="tools">
          <input
            className="input"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="과목명 검색"
            aria-label="과목 검색"
          />
          <select
            className="input select"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            aria-label="완료 상태 필터"
          >
            <option value="all">전체</option>
            <option value="done">완료</option>
            <option value="progress">진행 중</option>
          </select>
        </div>
        <div className="list-head">
          <span>COURSE</span>
          <span>CATEGORY</span>
          <span>ACTIONS</span>
        </div>
        {courses.length === 0 && (
          <div className="empty">empty</div>
        )}
        {courses.length > 0 && filteredCourses.length === 0 && (
          <div className="empty">empty</div>
        )}
        {filteredCourses.map((course) => (
          <CourseItem
            key={course.id}
            course={course}
            onDelete={handleDelete}
            onToggle={handleToggle}
            onEdit={handleEdit}
          />
        ))}
      </section>
    </>
  );
}
