import CourseList from "./components/CourseList.jsx";

export default function App() {
  return (
    <main className="page">
      <header className="hero">
        <div>
          <p className="topline">Ori and the blind forest</p>
          <h1>Ori is love!</h1>
          <p className="subtitle">There is no one anywhere who fully interprets or understands ORI.</p>
        </div>
        <span className="tag">Ori and wisps</span>
      </header>
      <CourseList />
      <footer className="bottom">
        <span>ORI has created a perfect beauty that does not otherwise exist in the world.</span>
        <span>This is my another assignment XD</span>
      </footer>
    </main>
  );
}
