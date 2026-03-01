# 🎓 EduAdmin: University Management Command Center

A comprehensive, frontend-focused university administration dashboard built with React. This system demonstrates advanced state management, relational data handling, and real-time UI updates, simulating a full-stack environment using browser persistence.

## 🚀 Key Features

* **Global State Persistence:** Utilizes React Context API combined with `LocalStorage` to create a "Single Source of Truth." Data remains persistent across browser refreshes without a backend.
* **Live "Attend" QR Command Center:** A simulated hardware integration that validates student Matric numbers in real-time. It includes anomaly detection to reject duplicate scans, mitigating proxy attendance.
* **Smart Financial Ledger:** Real-time calculation of expected revenue and fee defaulters. Features a **"1-Click WhatsApp Notifier"** that automatically drafts and routes fee reminder messages to parents via the WhatsApp Web API.
* **Relational Course Management:** Dynamic mapping of Teachers to Courses and Courses to Students, automatically calculating departmental enrollment metrics on the fly.
* **Business Intelligence Dashboard:** Integrates `Recharts` for live financial pie charts and attendance metrics that react instantly to database modifications.
* **Data Portability:** Built-in client-side CSV export functionality, allowing administrators to download system reports directly to their local machines using the browser's Blob API.

## 💻 Tech Stack

* **Core:** React.js (Vite)
* **Styling:** Tailwind CSS
* **Icons:** Lucide-React
* **Charts:** Recharts
* **QR Generation:** qrcode.react
* **State Management:** React Context API + Hooks (`useState`, `useEffect`)

## ⚙️ Installation & Setup

1. Clone the repository:
   ```bash
   git clone [https://github.com/Dheedi001/school-management-dashboard.git](https://github.com/Dheedi001/school-management-dashboard.git)

2. Navigate into the project directory:  
   cd edu-admin-dashboard

3. Install dependencies:
    npm install

4. Start the development server:
    npm run dev


Architectural Decisions
To mimic a production environment for this frontend-focused project:

I avoided prop-drilling by encapsulating all CRUD operations within a central AppProvider.

I implemented "Smart Modals" that accept initialData props, allowing the same UI component to seamlessly handle both Create and Update operations.

Filter and search states were kept local to their respective pages to prevent unnecessary global re-renders, optimizing performance.
