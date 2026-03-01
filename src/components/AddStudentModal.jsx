import { useState, useEffect } from 'react';
import { X, User, Hash, GraduationCap, CreditCard } from 'lucide-react';

export default function AddStudentModal({ isOpen, onClose, onAdd, initialData }) {
  const [formData, setFormData] = useState({
    name: '',
    matric: '',
    course: 'Software Engineering',
    paid: false,
    fees: 250000
  });

  // This effect "populates" the form if we are editing
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      // Reset to blank if we are adding a new student
      setFormData({ 
        name: '', 
        matric: '', 
        course: 'Software Engineering', 
        paid: false, 
        fees: 250000 
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData); // This sends the data (new or edited) to the Table
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header - Changes Title based on Mode */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h2 className="text-xl font-bold text-slate-800">
            {initialData ? 'Edit Student Details' : 'Add New Student'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                required
                type="text"
                value={formData.name}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="e.g. Destiny John"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          </div>

          {/* Matric Number */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Matric Number</label>
            <div className="relative">
              <Hash className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                required
                type="text"
                value={formData.matric}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-mono"
                placeholder="202300..."
                onChange={(e) => setFormData({...formData, matric: e.target.value})}
              />
            </div>
          </div>

          {/* Course Selection */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Course</label>
            <div className="relative">
              <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <select 
                value={formData.course}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none appearance-none bg-white"
                onChange={(e) => setFormData({...formData, course: e.target.value})}
              >
                <option>Software Engineering</option>
                <option>Computer Science</option>
                <option>Cybersecurity</option>
                <option>Information Technology</option>
              </select>
            </div>
          </div>

          {/* Payment Status Toggle */}
          <div className="pt-2">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input 
                  type="checkbox" 
                  className="sr-only" 
                  checked={formData.paid}
                  onChange={(e) => setFormData({...formData, paid: e.target.checked})}
                />
                <div className={`block w-10 h-6 rounded-full transition-colors ${formData.paid ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${formData.paid ? 'translate-x-4' : ''}`}></div>
              </div>
              <span className="text-sm font-medium text-slate-700">Student has paid tuition fees</span>
            </label>
          </div>

          {/* Dynamic Submit Button Text */}
          <button 
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold mt-6 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95"
          >
            {initialData ? 'Update Records' : 'Save to Database'}
          </button>
        </form>
      </div>
    </div>
  );
}