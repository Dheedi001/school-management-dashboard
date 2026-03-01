import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserCheck, Book, Award, RefreshCw, Search } from "lucide-react";
import StatCard from "../components/StatCard";

export default function TeacherManagement() {
  const { teachers, toggleTeacherStatus } = useApp();
  
  // --- NEW: Filter States ---
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  // --- NEW: Filter Logic ---
  const filteredTeachers = teachers.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || t.dept.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === "All" ? true : t.status === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold text-slate-800">Faculty Management</h1>
        <button className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-200 shrink-0">
          + Add Staff
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Staff" value={teachers.length} icon={UserCheck} trend="Live" />
        <StatCard title="Active Classes" value={teachers.filter(t => t.status === "In Class").length} icon={Book} trend="Real-time" />
        <StatCard title="Rank" value="#4" icon={Award} trend="Stable" />
      </div>

      {/* --- NEW: Search and Tabs UI --- */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        
        {/* Tabs */}
        <div className="flex bg-slate-100 p-1 rounded-xl w-full sm:w-auto">
          {["All", "Available", "In Class"].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === tab ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search name or dept..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 p-2.5 border border-slate-200 rounded-xl text-sm bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white w-full transition-all" 
          />
        </div>
      </div>

      {/* Grid of Filtered Teachers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTeachers.length > 0 ? filteredTeachers.map((teacher) => (
          <div key={teacher.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-5 hover:border-blue-100 transition-colors group">
            <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
               <UserCheck size={32} />
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{teacher.name}</h3>
                  <p className="text-blue-600 text-xs font-medium bg-blue-50 inline-block px-2 py-1 rounded-md mt-1">{teacher.dept}</p>
                </div>
                <button 
                  onClick={() => toggleTeacherStatus(teacher.id)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    teacher.status === "Available" ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-100" : "bg-amber-50 text-amber-600 hover:bg-amber-100 border border-amber-100"
                  }`}
                >
                  <RefreshCw size={12} className={teacher.status === "In Class" ? "animate-spin-slow" : ""} /> 
                  {teacher.status}
                </button>
              </div>
            </div>
          </div>
        )) : (
          <div className="col-span-full py-10 text-center text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200">
            No faculty members match your current filters.
          </div>
        )}
      </div>
    </div>
  );
}