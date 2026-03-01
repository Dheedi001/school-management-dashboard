# EduAdmin - Enterprise School Management System

A modern, responsive, and secure School Management Dashboard built to demonstrate proficiency in React.js, Tailwind CSS, and Frontend Architecture for the Flexisaf SIWES Placement.

## 🚀 Live Demo
[Insert your Vercel or Netlify link here if deployed, or state: "Local Development Only"]

## 🛠️ Tech Stack
* **Framework:** React.js (Vite)
* **Styling:** Tailwind CSS (v4)
* **Icons:** Lucide-React
* **Routing:** React Router DOM (v7)
* **Charts:** Recharts
* **State Management:** React Hooks (useState, useEffect, useLocation)

## ✨ Key Features
* **Secure Portal:** Custom Login page with show/hide password functionality and conditional layout rendering.
* **Attendance Security:** A dedicated module to monitor live QR scan logs, featuring a custom detection logic for **Proxy Attendance** and duplicate scans.
* **Student CRM:** Fully interactive student directory with real-time search filtering and CRUD operations (Add/Delete students).
* **Financial Oversight:** Localized (₦) revenue tracking, scholarship monitoring, and transaction status badging.
* **Academic Analytics:** Visual data representation using Recharts to track weekly attendance volume and enrollment trends.
* **Responsive Design:** Mobile-first architecture using Tailwind's Grid and Flexbox systems.

## 📂 Project Structure
```text
src/
├── components/     # Reusable UI atoms (StatCards, Modals, Charts)
├── pages/          # Individual Page Views (Dashboard, Finance, Login, etc.)
├── App.jsx         # Main Router and Layout Wrapper
└── main.jsx        # Entry point