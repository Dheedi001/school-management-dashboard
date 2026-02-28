import StatCard from "../components/StatCard";
import StudentTable from "../components/StudentTable";
import { Users, BookOpen, QrCode } from "lucide-react"; 

export default function Dashboard() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Dashboard Overview</h1>
        <p className="text-slate-500 mt-1">Welcome back to the administrative panel.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Enrolled" value="4,209" icon={Users} trend="+12%" />
        <StatCard title="Active Courses" value="142" icon={BookOpen} trend="+3%" />
        <StatCard title="Today's Scans" value="3,845" icon={QrCode} trend="+8%" />
      </div>

      <StudentTable />
    </>
  );
}