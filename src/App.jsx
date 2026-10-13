import { useEffect, useState } from "react";
import "./App.css";
import CourseList from "./components/CourseList";
import Schedule from "./components/Schedule";
import Summary from "./components/Summary";
import ThemeToggle from "./components/ThemeToggle";

const THEME_KEY = "coursehub-theme";
const COURSES_KEY = "coursehub-selected";

function getInitialTheme() {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    /* storage unavailable */
  }
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getInitialCourses() {
  try {
    const saved = JSON.parse(localStorage.getItem(COURSES_KEY));
    if (Array.isArray(saved)) return saved;
  } catch {
    /* ignore corrupted data */
  }
  return [];
}

export default function App() {
  const [selectedCourse, setSelectedCourse] = useState(getInitialCourses);
  const [enrolled, setEnrolled] = useState(false);
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem(COURSES_KEY, JSON.stringify(selectedCourse));
    } catch {
      /* ignore */
    }
  }, [selectedCourse]);

  function handleAddCourse(course) {
    setSelectedCourse((prev) =>
      prev.some((item) => item.code === course.code)
        ? prev
        : [
            ...prev,
            {
              code: course.code,
              title: course.title,
              credits: course.credits,
              schedule: course.schedule,
            },
          ],
    );
    setEnrolled(false);
  }

  function handleDeleteCourse(code) {
    setSelectedCourse((courses) => courses.filter((course) => course.code !== code));
    setEnrolled(false);
  }

  function toggleTheme() {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
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

        <div className="header-actions">
          <ThemeToggle theme={theme} onToggle={toggleTheme} />

          <div className="student">
            <div className="avatar">S</div>

            <div>
              <strong>Saman Yarzada</strong>
              <span>Computer Science</span>
            </div>
          </div>
        </div>
      </header>

      <main className="dashboard">
        <CourseList
          onHandleAddCourse={handleAddCourse}
          selectedCourse={selectedCourse}
        />

        <aside className="sidebar">
          <Schedule
            onHandleDeleteCourse={handleDeleteCourse}
            selectedCourse={selectedCourse}
            selectedCount={selectedCount}
          />
          <Summary
            selectedCount={selectedCount}
            totalCredits={totalCredits}
            enrolled={enrolled}
            onEnroll={() => setEnrolled(true)}
          />
        </aside>
      </main>
    </div>
  );
}
