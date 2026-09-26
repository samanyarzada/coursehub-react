export default function Schedule({ selectedCourse, onHandleDeleteCourse, selectedCount }) {
  return (
    <div className="schedule-card">
      <div className="card-header">
        <div>
          <h2>My Schedule</h2>
          <p>Your selected courses</p>
        </div>

        <span className="badge">{selectedCount} Courses</span>
      </div>

      {selectedCourse.map((course) => {
        return (
          <div className="schedule-list" key={course.id}>
            
            <div className="schedule-item">
              <div>
                <strong>{course.title}</strong>
                <span>{course.schedule}</span>
              </div>

              <button
                className="remove-btn"
                onClick={() => onHandleDeleteCourse(course.id)}
              >
                ×
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
