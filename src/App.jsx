import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Attendance from "./pages/Attendance";

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-slate-50">
        
        {/* The Sidebar stays outside the Routes so it NEVER unloads */}
        <Sidebar />

        {/* This is the dynamic area that changes when you click a link */}
        <div className="ml-64 p-8 w-full">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/attendance" element={<Attendance />} />
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  )
}

export default App;