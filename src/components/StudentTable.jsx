import { useState } from 'react';
import { Search, Plus, Trash2, QrCode, Edit2 } from 'lucide-react';
import { useApp } from '../context/AppContext'; 
import AddStudentModal from './AddStudentModal'; 
import QRModal from './QRModal'; 

export default function StudentTable() {
  const { students, addStudent, deleteStudent, updateStudent } = useApp();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null); // For QR Modal
  const [editingStudent, setEditingStudent] = useState(null);   // For Edit Mode
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.matric.includes(searchTerm)
  );

  // This function handles the logic for both new and edited students
  const handleSaveStudent = (formData) => {
    if (editingStudent) {
      updateStudent(editingStudent.id, formData);
    } else {
      addStudent(formData);
    }
    setEditingStudent(null);
  };

  const handleEditClick = (student) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingStudent(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800">Student Directory</h2>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" placeholder="Search..." 
              className="border pl-9 p-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-bold text-sm shadow-md hover:bg-blue-700 transition-all"
          >
            <Plus size={18} /> Add Student
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-xs text-slate-500 uppercase tracking-wider">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Matric</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredStudents.map(s => (
              <tr key={s.id} className="hover:bg-slate-50 group transition-colors">
                <td className="p-4 font-medium text-slate-700">{s.name}</td>
                <td className="p-4 text-sm text-slate-500">{s.matric}</td>
                <td className="p-4 text-right flex justify-end gap-1">
                  {/* Edit Action */}
                  <button 
                    onClick={() => handleEditClick(s)}
                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                    title="Edit Record"
                  >
                    <Edit2 size={16} />
                  </button>

                  {/* QR Action */}
                  <button 
                    onClick={() => setSelectedStudent(s)}
                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                    title="View QR ID"
                  >
                    <QrCode size={16} />
                  </button>

                  {/* Delete Action */}
                  <button 
                    onClick={() => deleteStudent(s.id)} 
                    className="p-2 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    title="Delete Student"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Smart Modal: Handles both Add and Edit */}
      <AddStudentModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        onAdd={handleSaveStudent} 
        initialData={editingStudent}
      />
      
      {/* QR Code Viewer */}
      <QRModal 
        isOpen={!!selectedStudent} 
        onClose={() => setSelectedStudent(null)} 
        student={selectedStudent} 
      />
    </div>
  );
}