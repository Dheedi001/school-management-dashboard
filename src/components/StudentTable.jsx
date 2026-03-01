import { useState } from 'react';
import { Search, Plus, Trash2 } from 'lucide-react';
import AddStudentModal from './AddStudentModal'; // Import the modal

export default function StudentTable() {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to track if modal is open
  const [students, setStudents] = useState([
    { id: 1, name: "Chisom Okafor", matric: "202300101", course: "Software Engineering", status: "Active" },
    { id: 2, name: "Aisha Bello", matric: "202300102", course: "Computer Science", status: "Active" },
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  const addStudent = (newStudent) => {
    setStudents([...students, newStudent]); // This is how you add to an array in React!
  };

  const deleteStudent = (id) => {
    setStudents(students.filter(s => s.id !== id));
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.matric.includes(searchTerm)
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 mt-8 overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-xl font-bold text-slate-800">Student Directory</h2>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text"
              placeholder="Search name or matric..."
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {/* Click this button to open the modal */}
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 px-4"
          >
            <Plus size={20} /> <span className="hidden md:inline">Add Student</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        {/* ... keep the table code exactly as it was ... */}
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-sm">
            <tr>
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Matric Number</th>
              <th className="p-4 font-medium">Course</th>
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredStudents.map((student) => (
              <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-medium text-slate-800">{student.name}</td>
                <td className="p-4 text-slate-500">{student.matric}</td>
                <td className="p-4 text-slate-500">{student.course}</td>
                <td className="p-4">
                  <button onClick={() => deleteStudent(student.id)} className="text-slate-400 hover:text-red-600">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Render the Modal component here */}
      <AddStudentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={addStudent} 
      />
    </div>
  );
}