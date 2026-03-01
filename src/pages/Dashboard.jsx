import { useApp } from '../context/AppContext';
import StatCard from "../components/StatCard";
import StudentTable from "../components/StudentTable";
import AttendanceChart from "../components/AttendanceChart";
import { Users, BookOpen, QrCode, Activity, Clock } from "lucide-react";

export default function Dashboard() {
  const { students, logs } = useApp();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-slate-800">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Enrolled" value={students.length} icon={Users} trend="Live Sync" />
        <StatCard title="Active Courses" value="142" icon={BookOpen} trend="+3%" />
        <StatCard title="Today's Scans" value="3,845" icon={QrCode} trend="+8%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 min-w-0"><AttendanceChart /></div>
        
        {/* NEW: Live System Logs */}
        <div className="bg-white p-6 rounded-xl border border-slate-100 flex flex-col h-[400px]">
          <div className="flex items-center gap-2 mb-4 border-b pb-2">
            <Activity size={18} className="text-blue-600" />
            <h2 className="font-bold text-slate-800">System Logs</h2>
          </div>
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {logs.map(log => (
              <div key={log.id} className="text-xs border-l-2 border-slate-100 pl-3 py-1">
                <p className="font-medium text-slate-700">{log.message}</p>
                <div className="flex items-center gap-1 text-slate-400 mt-1">
                  <Clock size={10} /> {log.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <StudentTable />
    </div>
  );
}