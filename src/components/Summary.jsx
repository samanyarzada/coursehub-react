export default function Summary({ selectedCount, totalCredits }) {
  let status;
  if (totalCredits === 0) {
    status = "No enrollment";
  } else if (totalCredits < 6) {
    status = "Part-time";
  } else {
    status = "Full-time";
  }
  let statusMessage;

  if (totalCredits === 0) {
    statusMessage = "You haven't selected any courses yet.";
  } else if (totalCredits < 6) {
    statusMessage = "You are enrolled part-time.";
  } else {
    statusMessage = "You have enough credits for full-time enrollment.";
  }
  return (
    <div className="summary-card">
      <h2>Enrollment Summary</h2>

      <div className="summary-row">
        <span>Selected Courses</span>
        <strong>{selectedCount}</strong>
      </div>

      <div className="summary-row">
        <span>Total Credits</span>
        <strong>{totalCredits}</strong>
      </div>

      <div className="summary-divider"></div>

     <div className={`status ${status === "No enrollment" ? "status-error" : ""}`}>
  <span className="status-dot"></span>

  <div>
    <strong>{status}</strong>
    <p>{statusMessage}</p>
  </div>
</div>

      <button className="enroll-btn" disabled={selectedCount === 0}>
        Enroll in Courses →
      </button>
    </div>
  );
}
