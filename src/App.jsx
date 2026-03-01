import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Attendance from "./pages/Attendance";
import Finance from "./pages/Finance";
import CourseManagement from "./pages/CourseManagement";
import TeacherManagement from "./pages/TeacherManagement";

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />
        <main className="flex-1 ml-64 p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<Dashboard />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/teachers" element={<TeacherManagement />} />
            <Route path="/courses" element={<CourseManagement />} />
            <Route path="/finance" element={<Finance />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

// ... all your imports and the App() function code ...

export default App; 