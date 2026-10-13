export default function CourseCard({ course, onHandleAddCourse, selectedCourse }) {
  const { icon, code, title, description, instructor, credits, schedule } = course;
  const alreadyAdded = selectedCourse.some((item) => item.code === code);

  return (
    <article className={`course-card ${alreadyAdded ? "is-added" : ""}`}>
      <div className="course-icon" aria-hidden="true">
        {icon}
      </div>

      <div className="course-content">
        <span className="course-code">{code}</span>

        <h3>{title}</h3>

        <p>{description}</p>

        <div className="course-meta">
          <span>👨‍🏫 {instructor}</span>
          <span>📚 {credits} Credits</span>
          <span>🗓️ {schedule}</span>
        </div>

        <button
          type="button"
          className="add-btn"
          disabled={alreadyAdded}
          onClick={() => onHandleAddCourse(course)}
        >
          {alreadyAdded ? "✓ Added" : "+ Add Course"}
        </button>
      </div>
    </article>
  );
}
