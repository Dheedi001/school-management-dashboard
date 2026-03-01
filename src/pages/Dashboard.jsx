import { useState, useEffect } from 'react';
import StatCard from "../components/StatCard";
import StudentTable from "../components/StudentTable";
import AttendanceChart from "../components/AttendanceChart"; // New Import
import { Users, BookOpen, QrCode, FileText, Bell } from "lucide-react"; 

export default function Dashboard() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Dashboard Overview</h1>
          <p className="text-slate-500 mt-1">Welcome back, Destiny.</p>
        </div>
        <div className="text-right bg-white p-3 rounded-lg shadow-sm border border-slate-100">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">System Time</p>
          <p className="text-2xl font-mono text-slate-700">{time}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Enrolled" value="4,209" icon={Users} trend="+12%" />
        <StatCard title="Active Courses" value="142" icon={BookOpen} trend="+3%" />
        <StatCard title="Today's Scans" value="3,845" icon={QrCode} trend="+8%" />
      </div>

      {/* New Section: Chart and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AttendanceChart />
        </div>
        
        {/* Quick Actions Panel */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-slate-50 text-slate-700 hover:bg-slate-100 transition-all font-medium">
              <FileText size={18} className="text-blue-600" /> Generate Report
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-slate-50 text-slate-700 hover:bg-slate-100 transition-all font-medium">
              <Bell size={18} className="text-orange-500" /> Send Broadcast
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <StudentTable />
    </div>
  );
}