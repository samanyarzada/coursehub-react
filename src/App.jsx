import { useState } from "react";
import "./App.css";
import CourseList from "./components/CourseList";
import Schedule from "./components/Schedule";
import Summary from "./components/Summary";

export default function App() {
  const [selectedCourse, setSelectedCourse] = useState([]);

  function handleAddCourse(course) {
     const alreadySelected = selectedCourse.some(
    (item) => item.code === course.code
  );
    if (alreadySelected) return;

    setSelectedCourse((prev) => [...prev, course]);
  }
  function handleDeleteCourse(id) {
    setSelectedCourse((courses) =>
      courses.filter((course) => {
        return course.id !== id;
      }),
    );
  }

  const selectedCount = selectedCourse.length;

  const totalCredits = selectedCourse.reduce(
    (total, course) => total + Number(course.credits),
    0,
  );
  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>CourseHub</h1>
          <p>Build your semester schedule</p>
        </div>

        <div className="student">
          <div className="avatar">A</div>

          <div>
            <strong>Alex Johnson</strong>
            <span>Computer Science</span>
          </div>
        </div>
      </header>

      <main className="dashboard">
        <CourseList onHandleAddCourse={handleAddCourse}
        selectedCourse= {selectedCourse} />

        <aside className="sidebar">
          <Schedule
            onHandleDeleteCourse={handleDeleteCourse}
            selectedCourse={selectedCourse}
            selectedCount={selectedCount}
          />
          <Summary selectedCount={selectedCount} totalCredits={totalCredits} />
        </aside>
      </main>
    </div>
  );
}
