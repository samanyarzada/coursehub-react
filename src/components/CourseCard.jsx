export default function CourseCard({
  icon,
  code,
  title,
  description,
  instructor,
  credits,
  schedule,
  onHandleAddCourse,
  selectedCourse,
}) {
  const alreadyAdded = selectedCourse.some((item) => item.code === code);
  return (
    <article className="course-card">
      <div className="course-icon">{icon}</div>

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
          className="add-btn"
          disabled={alreadyAdded}
          onClick={() =>
            onHandleAddCourse({
              id: crypto.randomUUID(),
              code,
              title,
              credits,
              schedule,
            })
          }
        >
          {alreadyAdded ? "✓ Added" : "+ Add Course"}{" "}
        </button>
      </div>
    </article>
  );
}
