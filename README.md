# Healthcare Medical Dashboard

A modern, responsive healthcare dashboard built with React, Tailwind CSS, Framer Motion, Recharts, and Lucide React.

## 🚀 Project Overview
This project is a frontend healthcare dashboard demo designed for clinic staff and care teams. It provides a polished UI for tracking patients, appointments, analytics, and doctor profiles with interactive components and mock data.

## 🧩 Key Features
- Dashboard overview with statistics, trends, charts, and recent patients
- Appointments page with booking, appointment list, and calendar view
- Patient management with searchable table, patient details, add/edit/delete flows
- Analytics page with performance charts and monthly revenue breakdown
- Doctors page showing doctor profiles and contact actions
- Settings page with theme toggle and user preference UI
- Responsive layout with sidebar navigation and animated transitions
- UI feedback modals for booking, reporting, notifications, and confirmations

## 📁 Main Pages
- `/` - Dashboard
- `/appointments` - Appointments
- `/patients` - Patients
- `/analytics` - Analytics / Statistics
- `/doctors` - Doctors
- `/settings` - Settings

## 🛠️ Technology Stack
- React 18
- Vite for development and build tooling
- Tailwind CSS for styling
- Framer Motion for animations
- Recharts for chart rendering
- React Router DOM for page routing
- Lucide React and React Icons for iconography

## 💻 Run Locally
### 1. Install dependencies
```bash
npm install
```

### 2. Start development server
```bash
npm run dev
```

### 3. Open in browser
Visit the local Vite URL shown in the terminal, typically:
```bash
http://localhost:4173
```

### 4. Build for production
```bash
npm run build
```

### 5. Preview production build
```bash
npm run preview
```

## 🔧 Notes
- The app currently uses mock data defined in `src/data/dummyData.js`.
- Replace the dummy data with real API integration or backend services to make it production-ready.
- Theme support is available via `src/context/ThemeContext.jsx`.

## 🗂️ Useful Files
- `src/App.jsx` - main layout and modal containers
- `src/main.jsx` - React root and router setup
- `src/context/DashboardContext.jsx` - app state, patient/appointment actions, modal control
- `src/components/layout/Sidebar.jsx` - app navigation
- `src/components/PatientTable.jsx` - patient management table
- `src/components/charts/HealthChart.jsx` - line chart overview
- `src/components/charts/PieChart.jsx` - demographics chart
- `src/data/dummyData.js` - sample patients, appointments, metrics
