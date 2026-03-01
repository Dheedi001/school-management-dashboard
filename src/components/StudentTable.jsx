import { useState } from 'react';
import { Search, Plus, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext'; 
import AddStudentModal from './AddStudentModal'; 

export default function StudentTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { students, addStudent, deleteStudent } = useApp();

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.matric.includes(searchTerm)
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <h2 className="text-xl font-bold">Student Directory</h2>
        <div className="flex gap-3">
          <input 
            type="text" placeholder="Search..." 
            className="border p-2 rounded-lg text-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <Plus size={18} /> Add
          </button>
        </div>
      </div>
      <table className="w-full text-left">
        <thead className="bg-slate-50 text-xs text-slate-500 uppercase">
          <tr><th className="p-4">Name</th><th className="p-4">Matric</th><th className="p-4">Course</th><th className="p-4 text-right">Actions</th></tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {filteredStudents.map(s => (
            <tr key={s.id} className="hover:bg-slate-50">
              <td className="p-4 font-medium">{s.name}</td>
              <td className="p-4 text-sm text-slate-500">{s.matric}</td>
              <td className="p-4 text-sm text-slate-500">{s.course}</td>
              <td className="p-4 text-right">
                <button onClick={() => deleteStudent(s.id)} className="text-slate-300 hover:text-red-600"><Trash2 size={18} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddStudentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={addStudent} />
    </div>
  );
}