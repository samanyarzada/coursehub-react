import CourseCard from "./CourseCard";

export default function CourseList({selectedCourse, onHandleAddCourse }) {
  return (
    <section className="courses-section">
      <div className="section-header">
        <div>
          <h2>Available Courses</h2>
          <p>Choose the courses you want to enroll in.</p>
        </div>

        <select>
          <option>All Courses</option>
          <option>Computer Science</option>
          <option>Design</option>
          <option>Business</option>
        </select>
      </div>

      <div className="course-list">
        <CourseCard
          onHandleAddCourse={onHandleAddCourse}
          selectedCourse={selectedCourse}
          icon="⚛️"
          code="CS201"
          title="React Basics"
          description="Learn the fundamentals of React and modern UI development."
          instructor="John Smith"
          credits="3"
          schedule="Mon · 10:00"
        />

        <CourseCard
          onHandleAddCourse={onHandleAddCourse}
          selectedCourse={selectedCourse}
          icon="🟨"
          code="JS301"
          title="JavaScript Advanced"
          description="Master advanced JavaScript concepts and application patterns."
          instructor="Sarah Wilson"
          credits="4"
          schedule="Tue · 09:00"
        />

        <CourseCard
          onHandleAddCourse={onHandleAddCourse}
          selectedCourse={selectedCourse}
          icon="🎨"
          code="UI210"
          title="CSS Mastery"
          description="Create beautiful, responsive and modern web interfaces."
          instructor="Mike Brown"
          credits="2"
          schedule="Wed · 11:00"
        />
      </div>
    </section>
  );
}
