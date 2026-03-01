import { BookOpen, Users, Clock, Award, MoreVertical } from "lucide-react";
import StatCard from "../components/StatCard";

const courses = [
  { id: 1, code: "SEN 311", title: "Software Architecture", students: 124, faculty: "Computing", status: "Active" },
  { id: 2, code: "CSC 201", title: "Data Structures", students: 180, faculty: "Computing", status: "Active" },
  { id: 3, code: "GST 111", title: "Communication in English", students: 1200, faculty: "General Studies", status: "Ongoing" },
  { id: 4, code: "CVE 401", title: "Structural Analysis", students: 85, faculty: "Engineering", status: "Active" },
];

export default function CourseManagement() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Course Registry</h1>
          <p className="text-slate-500 mt-1">Manage curriculum, enrollments, and faculty assignments.</p>
        </div>
        <button className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
          + Create New Course
        </button>
      </div>

      {/* Academic Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Courses" value="142" icon={BookOpen} trend="+4 this semester" />
        <StatCard title="Avg. Class Size" value="58" icon={Users} trend="Optimal" />
        <StatCard title="Credit Units" value="480" icon={Award} trend="Accredited" />
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-blue-300 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <BookOpen size={24} />
              </div>
              <button className="text-slate-400 hover:text-slate-600">
                <MoreVertical size={20} />
              </button>
            </div>
            
            <h3 className="text-xl font-bold text-slate-800">{course.code}: {course.title}</h3>
            <p className="text-slate-500 text-sm mt-1">{course.faculty} Faculty</p>
            
            <div className="mt-6 flex items-center justify-between border-t border-slate-50 pt-4">
              <div className="flex items-center gap-2 text-slate-600">
                <Users size={18} />
                <span className="text-sm font-medium">{course.students} Enrolled</span>
              </div>
              <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                course.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"
              }`}>
                {course.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}