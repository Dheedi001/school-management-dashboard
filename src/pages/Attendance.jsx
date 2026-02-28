import { AlertTriangle, CheckCircle, Clock } from "lucide-react";

// Mock data simulating live QR scans from your security system
const scanLogs = [
  { id: 1, time: "08:15 AM", name: "Chisom Okafor", matric: "202300101", device: "Mobile Device A", status: "Verified" },
  { id: 2, time: "08:17 AM", name: "Tunde Bakare", matric: "202300103", device: "Mobile Device B", status: "Verified" },
  { id: 3, time: "08:22 AM", name: "Emediong Udo", matric: "202300104", device: "Unknown Device", status: "Proxy Warning" },
  { id: 4, time: "08:23 AM", name: "Emediong Udo", matric: "202300104", device: "Mobile Device C", status: "Duplicate Scan" },
  { id: 5, time: "08:30 AM", name: "Aisha Bello", matric: "202300102", device: "Mobile Device D", status: "Verified" },
];

export default function Attendance() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">QR Scan Logs</h1>
        <p className="text-slate-500 mt-1">Live monitoring for proxy attendance detection.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        
        {/* Header Section */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div className="flex items-center gap-2 text-slate-700 font-semibold">
            <Clock size={20} className="text-blue-600" />
            <span>Today's Activity</span>
          </div>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
            Export Logs
          </button>
        </div>

        {/* Scan Logs Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white text-slate-500 text-sm border-b border-slate-100">
                <th className="p-4 font-medium">Timestamp</th>
                <th className="p-4 font-medium">Student Name</th>
                <th className="p-4 font-medium">Matric Number</th>
                <th className="p-4 font-medium">Device ID</th>
                <th className="p-4 font-medium">Scan Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              
              {scanLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 text-slate-600 font-medium">{log.time}</td>
                  <td className="p-4 text-slate-800 font-medium">{log.name}</td>
                  <td className="p-4 text-slate-500">{log.matric}</td>
                  <td className="p-4 text-slate-500 text-sm">{log.device}</td>
                  <td className="p-4">
                    
                    {/* Conditional rendering for the status badges */}
                    {log.status === "Verified" ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                        <CheckCircle size={14} />
                        Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                        <AlertTriangle size={14} />
                        {log.status}
                      </span>
                    )}

                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}