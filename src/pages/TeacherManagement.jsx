import { UserCheck, Mail, Book, Phone, Award } from "lucide-react";
import StatCard from "../components/StatCard";

const teachers = [
  { id: 1, name: "Dr. Olumide James", dept: "Software Engineering", courses: 3, contact: "o.james@topfaith.edu.ng", status: "In Class" },
  { id: 2, name: "Engr. Sarah Udoh", dept: "Computer Engineering", courses: 2, contact: "s.udoh@topfaith.edu.ng", status: "Available" },
  { id: 3, name: "Prof. Amadi Chidi", dept: "Cybersecurity", courses: 4, contact: "a.chidi@topfaith.edu.ng", status: "On Leave" },
  { id: 4, name: "Mrs. Blessing Etim", dept: "Information Technology", courses: 3, contact: "b.etim@topfaith.edu.ng", status: "Available" },
];

export default function TeacherManagement() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Faculty Management</h1>
          <p className="text-slate-500 mt-1">Monitor staff attendance, department loads, and contact info.</p>
        </div>
        <button className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg">
          + Add Faculty Member
        </button>
      </div>

      {/* Staff Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Staff" value="84" icon={UserCheck} trend="Full Strength" />
        <StatCard title="Active Classes" value="12" icon={Book} trend="Live Now" />
        <StatCard title="Research Rank" value="#4" icon={Award} trend="Top 5 in Region" />
      </div>

      {/* Teacher Profile Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {teachers.map((teacher) => (
          <div key={teacher.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-5 hover:shadow-md transition-all">
            <div className="h-20 w-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 border-2 border-slate-50">
               <UserCheck size={40} />
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between">
                <h3 className="text-xl font-bold text-slate-800">{teacher.name}</h3>
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                  teacher.status === "Available" ? "bg-emerald-100 text-emerald-700" : 
                  teacher.status === "In Class" ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-500"
                }`}>
                  {teacher.status}
                </span>
              </div>
              <p className="text-blue-600 text-sm font-medium">{teacher.dept}</p>
              
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-slate-500 text-xs">
                  <Mail size={14} /> {teacher.contact}
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-xs">
                  <Book size={14} /> {teacher.courses} Courses Assigned
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}