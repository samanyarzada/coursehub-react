# CourseHub

A course enrollment dashboard built with React. Students can browse available courses, filter them by category, build a semester schedule, and see an enrollment summary (full-time / part-time status) in real time. The UI supports **light and dark mode**.

## Features

- **Course catalog**: browse courses with icon, code, description, instructor, credits and schedule.
- **Category filter**: filter the catalog by Computer Science, Design or Business.
- **My Schedule**: add and remove courses; the list updates instantly.
- **Enrollment summary**: shows selected course count, total credits, a progress bar toward full-time status, and an enrollment status (No enrollment / Part-time / Full-time).
- **Enroll button**: confirms enrollment ("✓ Enrolled"). The state resets when you add or remove a course.
- **Light / dark theme**: toggle in the header. The first visit follows the system preference; your choice is then saved in `localStorage`.
- **Persistence**: selected courses survive page refreshes.
- **Responsive layout**: works on desktop, tablet and mobile.
- **Accessibility**: labelled controls, visible keyboard focus, and `prefers-reduced-motion` support.

## Tech stack

- React (hooks: `useState`, `useEffect`)
- Vite
- Plain CSS with CSS custom properties (design tokens) for theming

## Getting started

```bash
# install dependencies
npm install

# start the development server
npm run dev

# create a production build
npm run build
```

## Project structure

```
src/
├── main.jsx                  # App entry point
├── index.css                 # Global stylesheet entry
├── App.jsx                   # State, theme logic, page layout
├── App.css                   # All styles + light/dark theme tokens
├── data/
│   └── courses.js            # Course data and category list
└── components/
    ├── CourseList.jsx        # Catalog section + category filter
    ├── CourseCard.jsx        # Single course card
    ├── Schedule.jsx          # "My Schedule" sidebar card
    ├── Summary.jsx           # Enrollment summary and enroll button
    └── ThemeToggle.jsx       # Light/dark mode button
```

> `data/` must sit next to `components/`, directly inside `src/`. Otherwise `import ... from "../data/courses"` in `CourseList.jsx` will fail to resolve.

## How it works

### State

All shared state lives in `App.jsx`:

| State              | Purpose                                              |
| ------------------ | ---------------------------------------------------- |
| `selectedCourse`   | Courses added to the schedule (persisted)            |
| `enrolled`         | Whether the student pressed "Enroll"                 |
| `theme`            | `"light"` or `"dark"` (persisted)                    |

Derived values (`selectedCount`, `totalCredits`) are calculated during render instead of being stored in state.

### Enrollment status

Defined in `Summary.jsx` (`FULL_TIME_CREDITS = 6`):

| Total credits | Status        |
| ------------- | ------------- |
| 0             | No enrollment |
| 1 – 5         | Part-time     |
| 6 or more     | Full-time     |

### Theming

Colors, shadows and radii are CSS variables declared in `App.css`:

- `:root` holds the **light** theme.
- `:root[data-theme="dark"]` overrides them for the **dark** theme.

`App.jsx` sets `document.documentElement.dataset.theme` whenever the theme changes, so every component updates without extra logic. To change the look of the app, edit the variables at the top of `App.css` (for example `--accent`).

### Adding a course

Add an object to `COURSES` in `src/data/courses.js`:

```js
{
  code: "CS401",            // must be unique, used as the course id
  icon: "🤖",
  category: "Computer Science",   // must exist in CATEGORIES
  title: "Machine Learning",
  description: "Short description shown on the card.",
  instructor: "Jane Doe",
  credits: 3,               // number
  schedule: "Thu · 10:00",
}
```

To add a new category, append its name to `CATEGORIES` in the same file.

## Changes and bug fixes

**Bugs fixed**

1. The category dropdown did nothing. It now filters the catalog and shows an empty state when no course matches.
2. The "Enroll in Courses" button had no handler. It now confirms enrollment.
3. `crypto.randomUUID()` failed on non-secure (HTTP, non-localhost) origins. Course `code` is now used as the unique id.
4. `Schedule` rendered a new `schedule-list` wrapper for every course, which broke spacing. It now renders one `<ul>` with `<li>` items, plus an empty state and correct singular/plural badge ("1 Course").
5. Credits were stored as strings. They are now numbers.
6. `Summary` had duplicated `if/else` chains for status and message. They are merged into a single `getStatus()` helper. Missing disabled-button styles were added and the unused `.status-dot-error` rule was removed.
7. Selected courses were lost on refresh. They are now persisted in `localStorage`.
8. Course data was hard-coded in JSX. It now lives in `src/data/courses.js`.
9. Missing accessibility labels were added (remove button, category select, progress bar).

**UI improvements**

- Design tokens and a complete dark theme.
- Cleaner cards with hover effects, an "added" state, and subtle transitions.
- Progress bar toward full-time credits and color-coded status (red / amber / green).
- Sticky sidebar on desktop.

## Notes

- `index.css` only contains `@import "tailwindcss";`, and no Tailwind classes are used in the code. You can safely remove it (and the Tailwind dependency) if you don't plan to use Tailwind.
- The sample courses "UX Design Principles" and "Digital Marketing" were added so that every category in the filter has content. Remove them in `src/data/courses.js` if you don't need them.
- Enrollment is front-end only. Connecting it to a backend or API is a natural next step.

## Possible next steps

- Detect schedule conflicts between selected courses.
- Add a search field to the catalog.
- Send enrollment data to a backend API.
- Add unit tests (for example with Vitest and React Testing Library).
