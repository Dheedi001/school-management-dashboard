import { useState } from 'react';
import { useApp } from '../context/AppContext';
import StatCard from '../components/StatCard';
import { BookOpen, Users, GraduationCap, Plus, Trash2, X, Bookmark, Search } from 'lucide-react';

export default function CourseManagement() {
  const { courses, teachers, students, addCourse, deleteCourse } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // NEW: Search state
  
  const [formData, setFormData] = useState({ title: '', code: '', department: 'Software Engineering', teacherId: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    addCourse({ ...formData, teacherId: Number(formData.teacherId) });
    setFormData({ title: '', code: '', department: 'Software Engineering', teacherId: '' });
    setIsModalOpen(false);
  };

  // NEW: Filter logic for courses
  const filteredCourses = courses.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Course Administration</h1>
          <p className="text-slate-500 mt-1">Manage curriculum, faculty assignments, and enrollments.</p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          {/* Functional Search Bar */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search courses..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 p-2.5 border border-slate-200 rounded-xl text-sm bg-white outline-none focus:ring-2 focus:ring-blue-500 w-full shadow-sm" 
            />
          </div>

          <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 flex items-center gap-2 transition-all shrink-0">
            <Plus size={20} /> <span className="hidden sm:inline">New Course</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Courses" value={courses.length} icon={BookOpen} trend="Active" />
        <StatCard title="Active Departments" value={[...new Set(courses.map(c => c.department))].length} icon={GraduationCap} trend="Synced" />
        <StatCard title="Total Enrollments" value={students.length} icon={Users} trend="Live" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.length > 0 ? filteredCourses.map(course => {
          const assignedTeacher = teachers.find(t => t.id === course.teacherId);
          const enrolledStudents = students.filter(s => s.course === course.department).length;

          return (
            <div key={course.id} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm relative group">
              <button onClick={() => deleteCourse(course.id)} className="absolute top-4 right-4 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={18} /></button>
              <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center text-blue-600 mb-4"><Bookmark size={24} /></div>
              <div className="mb-4">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md mb-2 inline-block">{course.code}</span>
                <h3 className="text-lg font-bold text-slate-800 leading-tight">{course.title}</h3>
                <p className="text-sm text-slate-500 mt-1">{course.department}</p>
              </div>
              <div className="border-t border-slate-100 pt-4 mt-4 flex justify-between items-center text-sm">
                <div><p className="text-slate-400 text-xs">Instructor</p><p className="font-medium text-slate-700">{assignedTeacher ? assignedTeacher.name : "Unassigned"}</p></div>
                <div className="text-right"><p className="text-slate-400 text-xs">Enrolled</p><p className="font-medium text-slate-700">{enrolledStudents} Students</p></div>
              </div>
            </div>
          );
        }) : (
          <div className="col-span-full py-12 text-center text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200">
            No courses found matching "{searchTerm}"
          </div>
        )}
      </div>

      {/* Embedded Modal... (Keep your existing modal code here) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
           {/* Your existing form code from before goes here to save space */}
           <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="text-xl font-bold text-slate-800">Add New Course</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div><label className="block text-sm font-semibold text-slate-700 mb-1">Course Title</label><input required type="text" className="w-full p-2 border rounded-xl" onChange={(e) => setFormData({...formData, title: e.target.value})} /></div>
              <div><label className="block text-sm font-semibold text-slate-700 mb-1">Course Code</label><input required type="text" className="w-full p-2 border rounded-xl" onChange={(e) => setFormData({...formData, code: e.target.value})} /></div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Department</label>
                <select className="w-full p-2 border rounded-xl bg-white" onChange={(e) => setFormData({...formData, department: e.target.value})}>
                  <option>Software Engineering</option><option>Computer Science</option><option>Cybersecurity</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Assign Teacher</label>
                <select required className="w-full p-2 border rounded-xl bg-white" onChange={(e) => setFormData({...formData, teacherId: e.target.value})}>
                  <option value="">-- Select Instructor --</option>
                  {teachers.map(t => <option key={t.id} value={t.id}>{t.name} ({t.dept})</option>)}
                </select>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold mt-4">Create Course</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}