import { useState } from "react";
import CourseCard from "./CourseCard";
import { CATEGORIES, COURSES } from "../data/courses";

export default function CourseList({ selectedCourse, onHandleAddCourse }) {
  const [category, setCategory] = useState("All Courses");

  const visibleCourses =
    category === "All Courses"
      ? COURSES
      : COURSES.filter((course) => course.category === category);

  return (
    <section className="courses-section">
      <div className="section-header">
        <div>
          <h2>Available Courses</h2>
          <p>Choose the courses you want to enroll in.</p>
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Filter courses by category"
        >
          <option>All Courses</option>
          {CATEGORIES.map((name) => (
            <option key={name}>{name}</option>
          ))}
        </select>
      </div>

      <div className="course-list">
        {visibleCourses.length === 0 ? (
          <div className="empty-state">No courses found in this category.</div>
        ) : (
          visibleCourses.map((course) => (
            <CourseCard
              key={course.code}
              course={course}
              onHandleAddCourse={onHandleAddCourse}
              selectedCourse={selectedCourse}
            />
          ))
        )}
      </div>
    </section>
  );
}
