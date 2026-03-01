import { useState } from 'react';
import { X } from 'lucide-react';

export default function AddStudentModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: '',
    matric: '',
    course: 'Software Engineering',
    status: 'Active'
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ ...formData, id: Date.now() }); // Create a unique ID using the current time
    onClose(); // Close the popup
    setFormData({ name: '', matric: '', course: 'Software Engineering', status: 'Active' }); // Reset form
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800">Register New Student</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={24} /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input 
              required
              type="text" 
              className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Matric Number</label>
            <input 
              required
              type="text" 
              className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.matric}
              onChange={(e) => setFormData({...formData, matric: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Course</label>
            <select 
              className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.course}
              onChange={(e) => setFormData({...formData, course: e.target.value})}
            >
              <option>Software Engineering</option>
              <option>Computer Science</option>
              <option>Cybersecurity</option>
              <option>Information Technology</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-all">
            Add to Database
          </button>
        </form>
      </div>
    </div>
  );
}