const FULL_TIME_CREDITS = 6;

function getStatus(totalCredits) {
  if (totalCredits === 0) {
    return {
      label: "No enrollment",
      message: "You haven't selected any courses yet.",
      tone: "error",
    };
  }
  if (totalCredits < FULL_TIME_CREDITS) {
    return {
      label: "Part-time",
      message: `You are enrolled part-time. ${FULL_TIME_CREDITS - totalCredits} more credits for full-time.`,
      tone: "warning",
    };
  }
  return {
    label: "Full-time",
    message: "You have enough credits for full-time enrollment.",
    tone: "success",
  };
}

export default function Summary({ selectedCount, totalCredits, enrolled, onEnroll }) {
  const status = getStatus(totalCredits);
  const progress = Math.min((totalCredits / FULL_TIME_CREDITS) * 100, 100);

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

      <div
        className="progress"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={FULL_TIME_CREDITS}
        aria-valuenow={Math.min(totalCredits, FULL_TIME_CREDITS)}
        aria-label="Progress toward full-time credits"
      >
        <div className={`progress-bar tone-${status.tone}`} style={{ width: `${progress}%` }} />
      </div>

      <div className="summary-divider"></div>

      <div className={`status status-${status.tone}`}>
        <span className="status-dot"></span>

        <div>
          <strong>{status.label}</strong>
          <p>{status.message}</p>
        </div>
      </div>

      <button
        type="button"
        className="enroll-btn"
        disabled={selectedCount === 0 || enrolled}
        onClick={onEnroll}
      >
        {enrolled ? "✓ Enrolled" : "Enroll in Courses →"}
      </button>
    </div>
  );
}
