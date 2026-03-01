import { useApp } from '../context/AppContext';
import { UserCheck, Book, Award, RefreshCw } from "lucide-react";
import StatCard from "../components/StatCard";

export default function TeacherManagement() {
  const { teachers, toggleTeacherStatus } = useApp();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-800">Faculty Management</h1>
        <button className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-200">
          + Add Staff
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Staff" value={teachers.length} icon={UserCheck} trend="Live" />
        <StatCard 
          title="Active Classes" 
          value={teachers.filter(t => t.status === "In Class").length} 
          icon={Book} 
          trend="Real-time" 
        />
        <StatCard title="Rank" value="#4" icon={Award} trend="Stable" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {teachers.map((teacher) => (
          <div key={teacher.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-5">
            <div className="h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
               <UserCheck size={32} />
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{teacher.name}</h3>
                  <p className="text-blue-600 text-xs font-medium">{teacher.dept}</p>
                </div>
                <button 
                  onClick={() => toggleTeacherStatus(teacher.id)}
                  className={`flex items-center gap-1 px-3 py-1 rounded-lg text-[10px] font-bold transition-all ${
                    teacher.status === "Available" ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100" : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                  }`}
                >
                  <RefreshCw size={12} /> {teacher.status}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}