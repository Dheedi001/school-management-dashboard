import { useState } from 'react';
import { useApp } from '../context/AppContext';
import StatCard from "../components/StatCard";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { CreditCard, ArrowUpRight, TrendingUp, Search, MessageCircle } from "lucide-react";

export default function Finance() {
  const { students } = useApp();
  
  // --- NEW: Search and Tab States ---
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All"); // 'All', 'Paid', 'Pending'

  const totalRevenue = students.reduce((acc, curr) => acc + (curr.fees || 0), 0);
  const paidCount = students.filter(s => s.paid).length;
  const pendingCount = students.length - paidCount;

  const chartData = [
    { name: 'Paid', value: paidCount },
    { name: 'Pending', value: pendingCount },
  ];
  const COLORS = ['#10b981', '#f59e0b'];

  // --- NEW: Functional Filtering Logic ---
  const filteredLedger = students.filter(s => {
    // 1. Search Filter
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.matric.includes(searchTerm);
    // 2. Tab Filter
    const matchesTab = activeTab === "All" ? true : activeTab === "Paid" ? s.paid === true : s.paid === false;
    
    return matchesSearch && matchesTab;
  });

  const handleWhatsAppNotify = (student) => {
    const message = `*OFFICIAL NOTICE: FEE REMINDER*\n\nDear Parent/Guardian,\n\nThis is an automated message from the Bursary Department. Please be informed that your ward, *${student.name}* (${student.matric}), has an outstanding tuition balance of *₦${student.fees.toLocaleString()}* for the current semester.\n\nKindly ensure payment is made promptly to avoid portal suspension.\n\nThank you for your cooperation.\n- EduAdmin Finance System`;
    const whatsappUrl = `https://wa.me/2348000000000?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="space-y-8 relative">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Finance & Accounts</h1>
        <p className="text-slate-500 mt-1">Real-time revenue tracking and automated parent communication.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Expected Revenue" value={`₦${(totalRevenue / 1000).toLocaleString()}k`} icon={TrendingUp} trend="Live" />
        <StatCard title="Paid Students" value={paidCount} icon={ArrowUpRight} trend="Synced" />
        <StatCard title="Defaulters" value={pendingCount} icon={CreditCard} trend="Action Required" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center">
          <h2 className="font-bold text-slate-800 mb-4 self-start">Payment Distribution</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={chartData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live Ledger with Tabs & Search */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col h-[400px]">
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50">
            <h2 className="font-bold text-slate-800">Live Fee Ledger</h2>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              {/* Functional Filter Tabs */}
              <div className="flex bg-slate-200/50 p-1 rounded-lg">
                {["All", "Paid", "Pending"].map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${activeTab === tab ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Functional Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search student..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 p-1.5 border border-slate-200 rounded-lg text-sm bg-white outline-none focus:ring-2 focus:ring-blue-500 w-full" 
                />
              </div>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <table className="w-full text-left">
              <thead className="bg-white sticky top-0 border-b border-slate-100 z-10 text-xs text-slate-500 uppercase">
                <tr><th className="p-4">Student</th><th className="p-4">Amount</th><th className="p-4">Status</th><th className="p-4 text-right">Action</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {/* Map over the FILTERED list, not the raw list */}
                {filteredLedger.length > 0 ? filteredLedger.map(s => (
                  <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4"><p className="font-bold text-sm text-slate-800">{s.name}</p><p className="text-xs font-mono text-slate-400">{s.matric}</p></td>
                    <td className="p-4 text-sm font-semibold text-slate-600">₦{s.fees?.toLocaleString()}</td>
                    <td className="p-4"><span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${s.paid ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>{s.paid ? "CLEARED" : "PENDING"}</span></td>
                    <td className="p-4 text-right">
                      {!s.paid ? (
                        <button onClick={() => handleWhatsAppNotify(s)} className="inline-flex gap-2 bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all"><MessageCircle size={14} /> Notify</button>
                      ) : <span className="text-xs text-slate-300 italic px-3 py-1.5">No action needed</span>}
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan="4" className="p-8 text-center text-slate-400 text-sm">No records match your filters.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}