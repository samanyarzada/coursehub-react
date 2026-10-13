export default function Schedule({ selectedCourse, onHandleDeleteCourse, selectedCount }) {
  return (
    <div className="schedule-card">
      <div className="card-header">
        <div>
          <h2>My Schedule</h2>
          <p>Your selected courses</p>
        </div>

        <span className="badge">
          {selectedCount} {selectedCount === 1 ? "Course" : "Courses"}
        </span>
      </div>

      {selectedCourse.length === 0 ? (
        <div className="empty-state">
          No courses yet. Add one from the list to build your schedule.
        </div>
      ) : (
        <ul className="schedule-list">
          {selectedCourse.map((course) => (
            <li className="schedule-item" key={course.code}>
              <div>
                <strong>{course.title}</strong>
                <span>
                  {course.schedule} · {course.credits} credits
                </span>
              </div>

              <button
                type="button"
                className="remove-btn"
                aria-label={`Remove ${course.title}`}
                onClick={() => onHandleDeleteCourse(course.code)}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
