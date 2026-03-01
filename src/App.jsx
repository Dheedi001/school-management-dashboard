import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Attendance from "./pages/Attendance";
import Finance from "./pages/Finance";
import CourseManagement from "./pages/CourseManagement";
import TeacherManagement from "./pages/TeacherManagement";
import Login from "./pages/Login";

// Create a wrapper component to handle the sidebar logic
function LayoutWrapper({ children }) {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Hide Sidebar if we are on the login page */}
      {!isLoginPage && <Sidebar />}
      
      <main className={`flex-1 ${!isLoginPage ? "ml-64 p-8" : ""}`}>
        {children}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LayoutWrapper>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/students" element={<Dashboard />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/teachers" element={<TeacherManagement />} />
          <Route path="/courses" element={<CourseManagement />} />
          <Route path="/finance" element={<Finance />} />
        </Routes>
      </LayoutWrapper>
    </BrowserRouter>
  );
}