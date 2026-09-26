# Course Enrollment App

A small React application for selecting and managing courses for a semester schedule.

## 🚀 Features

- View available courses
- Add courses to the schedule
- Prevent duplicate course enrollment
- Remove selected courses
- Display selected course count
- Calculate total credits
- Show enrollment status:
  - No enrollment
  - Part-time
  - Full-time
- Dynamically enable/disable the enrollment button
- Dynamically update the course status and UI

## 🧠 React Concepts Practiced

This project was built to practice:

- `useState`
- Props
- Callback Props
- Lifting State Up
- Component communication
- Conditional Rendering
- Derived State / Derived Data
- Array methods:
  - `map()`
  - `filter()`
  - `some()`
  - `reduce()`
- Dynamic class names
- Event handling
- React re-rendering

## 🧩 Component Structure

```text
App
├── CourseList
│   └── CourseCard
├── Schedule
└── Summary
```

## 🔄 Data Flow

```text
CourseCard
    ↓
CourseList
    ↓
App
    ↓
selectedCourse
    ↓
Schedule + Summary
```

The main course selection state is stored in `App` and shared with child components through props and callback functions.

## 🛠️ Technologies

- React
- JavaScript
- CSS
- Vite

## 📚 What I Learned

This project helped me understand how to keep shared state in a parent component and pass data and functions between components using props.

I also practiced deriving values such as selected course count, total credits, and enrollment status from a single source of state.

## ▶️ Run Locally

```bash
npm install
npm run dev
```

## 📌 Project Status

Completed
