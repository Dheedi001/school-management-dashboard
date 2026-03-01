import { useApp } from '../context/AppContext';
import { Trash2, ShieldAlert, Database, User } from 'lucide-react';

export default function Settings() {
  const { clearDatabase } = useApp();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">System Settings</h1>
        <p className="text-slate-500 mt-1">Manage system preferences and data integrity.</p>
      </div>

      {/* Profile Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-blue-100 p-3 rounded-full text-blue-600">
            <User size={24} />
          </div>
          <div>
            <h2 className="font-bold text-slate-800">Developer Profile</h2>
            <p className="text-slate-500 text-sm">Destiny | Software Engineering</p>
          </div>
        </div>
      </div>

      {/* Data Management Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-red-100 p-3 rounded-full text-red-600">
            <Database size={24} />
          </div>
          <div>
            <h2 className="font-bold text-slate-800">Data Management</h2>
            <p className="text-slate-500 text-sm">Control the local virtual database and synchronization.</p>
          </div>
        </div>

        <div className="p-4 bg-red-50 rounded-xl border border-red-100 flex items-center justify-between">
          <div className="flex items-start gap-3">
            <ShieldAlert className="text-red-600 mt-1" size={20} />
            <div>
              <p className="font-bold text-red-900">Factory Reset</p>
              <p className="text-red-700 text-xs">This will permanently delete all student entries, teacher updates, and system logs.</p>
            </div>
          </div>
          <button 
            onClick={clearDatabase}
            className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-red-700 transition-all shadow-md shadow-red-100"
          >
            <Trash2 size={18} /> Reset All Data
          </button>
        </div>
      </div>
    </div>
  );
}