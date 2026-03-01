import { useApp } from '../context/AppContext';
import StatCard from "../components/StatCard";
import StudentTable from "../components/StudentTable";
import AttendanceChart from "../components/AttendanceChart";
import { Users, BookOpen, QrCode, Activity, Clock, FileText, Bell } from "lucide-react";

export default function Dashboard() {
  const { students, logs, exportToCSV } = useApp();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-slate-800">Dashboard Overview</h1>
      
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Enrolled" 
          value={students.length} 
          icon={Users} 
          trend="Live Sync" 
        />
        <StatCard title="Active Courses" value="142" icon={BookOpen} trend="+3%" />
        <StatCard title="Today's Scans" value="3,845" icon={QrCode} trend="+8%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Section */}
        <div className="lg:col-span-2 min-w-0">
          <AttendanceChart />
        </div>
        
        {/* Sidebar Actions & Logs */}
        <div className="space-y-6">
          {/* Quick Actions Card */}
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
            <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Activity size={18} className="text-blue-600" /> Quick Actions
            </h2>
            <div className="space-y-3">
              <button 
                onClick={exportToCSV}
                className="w-full flex items-center gap-3 p-3 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-all font-medium border border-blue-100 group"
              >
                <FileText size={18} className="group-hover:scale-110 transition-transform" /> 
                <span>Generate CSV Report</span>
              </button>
              
              <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-slate-50 text-slate-600 hover:bg-slate-100 transition-all font-medium border border-slate-100">
                <Bell size={18} /> 
                <span>Send Broadcast</span>
              </button>
            </div>
          </div>

          {/* System Logs Feed */}
          <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex flex-col h-[300px]">
            <div className="flex items-center gap-2 mb-4 border-b pb-2">
              <Clock size={18} className="text-slate-500" />
              <h2 className="font-bold text-slate-800">System Logs</h2>
            </div>
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
              {logs.length > 0 ? logs.map(log => (
                <div key={log.id} className="text-xs border-l-2 border-blue-100 pl-3 py-1 hover:border-blue-500 transition-colors">
                  <p className="font-medium text-slate-700">{log.message}</p>
                  <p className="text-slate-400 mt-1 flex items-center gap-1">
                     {log.time}
                  </p>
                </div>
              )) : (
                <p className="text-slate-400 text-xs italic">No recent activity logged.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Synchronized Student Table */}
      <StudentTable />
    </div>
  );
}