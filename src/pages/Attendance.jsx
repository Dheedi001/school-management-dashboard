import { useState } from 'react';
import { useApp } from '../context/AppContext';
import StatCard from '../components/StatCard';
import { ScanLine, UserCheck, UserMinus, Clock, ShieldCheck, AlertCircle } from 'lucide-react';

export default function Attendance() {
  const { students, attendance, markAttendance } = useApp();
  const [scanInput, setScanInput] = useState('');
  const [scanResult, setScanResult] = useState(null);

  // 1. Calculate Today's Stats
  const today = new Date().toLocaleDateString();
  const todaysAttendance = attendance.filter(a => a.date === today);
  const presentCount = todaysAttendance.length;
  const absentCount = students.length - presentCount;

  // 2. Handle the "Scanner" Input
  const handleScan = (e) => {
    e.preventDefault();
    if (!scanInput.trim()) return;

    const result = markAttendance(scanInput.trim());
    setScanResult(result);
    setScanInput(''); // Clear input for the next scan

    // Clear the success/error message after 3 seconds
    setTimeout(() => setScanResult(null), 3000);
  };

  return (
    <div className="space-y-8 relative">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
          <ShieldCheck className="text-blue-600" size={32} /> "Attend" QR Command Center
        </h1>
        <p className="text-slate-500 mt-1">Live validation and real-time biometric tracking system.</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Enrolled" value={students.length} icon={Clock} trend="Active Base" />
        <StatCard title="Present Today" value={presentCount} icon={UserCheck} trend={`${((presentCount/students.length)*100).toFixed(0)}%`} />
        <StatCard title="Absent" value={absentCount} icon={UserMinus} trend="Pending" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* The Hardware Simulator */}
        <div className="lg:col-span-1 bg-slate-900 rounded-2xl p-6 shadow-xl border border-slate-800 flex flex-col items-center justify-center text-center relative overflow-hidden">
          {/* Decorative scanner beam */}
          <div className="absolute top-0 left-0 w-full h-1 bg-blue-500/50 blur-sm animate-pulse"></div>
          
          <div className="bg-slate-800 p-4 rounded-full mb-6 border-4 border-slate-700 shadow-inner">
            <ScanLine size={48} className="text-blue-400" />
          </div>
          
          <h2 className="text-white font-bold text-xl mb-2">Simulate QR Scan</h2>
          <p className="text-slate-400 text-sm mb-8">Enter a Matric Number to simulate the physical hardware reading a student ID card.</p>

          <form onSubmit={handleScan} className="w-full relative">
            <input 
              type="text" 
              autoFocus
              value={scanInput}
              onChange={(e) => setScanInput(e.target.value)}
              placeholder="e.g. 202300101" 
              className="w-full bg-slate-800 text-white font-mono text-center text-lg py-4 rounded-xl border border-slate-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all shadow-inner placeholder-slate-600"
            />
            <button type="submit" className="hidden">Scan</button>
          </form>

          {/* Scanner Feedback Display */}
          <div className="h-16 mt-6 w-full">
            {scanResult && (
              <div className={`p-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 animate-in fade-in slide-in-from-bottom-4 ${
                scanResult.success ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50' : 'bg-red-500/20 text-red-400 border border-red-500/50'
              }`}>
                {scanResult.success ? <UserCheck size={18}/> : <AlertCircle size={18}/>}
                {scanResult.message}
              </div>
            )}
          </div>
        </div>

        {/* Live Feed Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col h-[500px]">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <h2 className="font-bold text-slate-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> Live Scan Feed
            </h2>
            <span className="text-xs font-bold text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">
              {todaysAttendance.length} records today
            </span>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <table className="w-full text-left">
              <thead className="bg-white sticky top-0 border-b border-slate-100 z-10 text-xs text-slate-500 uppercase">
                <tr>
                  <th className="p-4 font-semibold">Time</th>
                  <th className="p-4 font-semibold">Student Info</th>
                  <th className="p-4 font-semibold">Course</th>
                  <th className="p-4 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {todaysAttendance.length > 0 ? todaysAttendance.map(record => {
                  // Find the student details for this record
                  const student = students.find(s => s.id === record.studentId);
                  if (!student) return null;

                  return (
                    <tr key={record.id} className="hover:bg-slate-50 transition-colors animate-in fade-in">
                      <td className="p-4 text-sm font-medium text-slate-500 whitespace-nowrap">{record.time}</td>
                      <td className="p-4">
                        <p className="font-bold text-slate-800">{student.name}</p>
                        <p className="text-xs font-mono text-slate-400">{student.matric}</p>
                      </td>
                      <td className="p-4 text-sm text-slate-600">{student.course}</td>
                      <td className="p-4 text-right">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                          <UserCheck size={12} /> VERIFIED
                        </span>
                      </td>
                    </tr>
                  );
                }) : (
                  <tr>
                    <td colSpan="4" className="p-12 text-center">
                      <ScanLine size={32} className="mx-auto text-slate-300 mb-3" />
                      <p className="text-slate-500 font-medium">No scans recorded yet today.</p>
                      <p className="text-xs text-slate-400 mt-1">Awaiting hardware input...</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}