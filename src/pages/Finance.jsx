import { CreditCard, ArrowUpRight, ArrowDownRight, Search } from "lucide-react";
import StatCard from "../components/StatCard";

const transactions = [
  { id: 1, student: "Chisom Okafor", matric: "202300101", amount: "₦250,000", status: "Paid", date: "2026-02-15" },
  { id: 2, student: "Aisha Bello", matric: "202300102", amount: "₦150,000", status: "Partial", date: "2026-02-18" },
  { id: 3, student: "Tunde Bakare", matric: "202300103", amount: "₦300,000", status: "Pending", date: "2026-02-20" },
  { id: 4, student: "Emediong Udo", matric: "202300104", amount: "₦250,000", status: "Paid", date: "2026-02-22" },
];

export default function Finance() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Finance & Accounts</h1>
        <p className="text-slate-500 mt-1">Manage tuition fees, scholarships, and revenue logs.</p>
      </div>

      {/* Financial Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Revenue" value="₦12.4M" icon={ArrowUpRight} trend="+8.2%" />
        <StatCard title="Outstanding" value="₦2.1M" icon={ArrowDownRight} trend="-2.4%" />
        <StatCard title="Scholarships" value="42 Students" icon={CreditCard} trend="Fixed" />
      </div>

      {/* Transaction Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800">Recent Payments</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search student..." 
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-500 text-sm">
            <tr>
              <th className="p-4 font-medium">Student</th>
              <th className="p-4 font-medium">Amount</th>
              <th className="p-4 font-medium">Date</th>
              <th className="p-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {transactions.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50">
                <td className="p-4">
                  <p className="font-medium text-slate-800">{t.student}</p>
                  <p className="text-xs text-slate-500">{t.matric}</p>
                </td>
                <td className="p-4 text-slate-700 font-semibold">{t.amount}</td>
                <td className="p-4 text-slate-500 text-sm">{t.date}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    t.status === "Paid" ? "bg-emerald-100 text-emerald-700" : 
                    t.status === "Partial" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"
                  }`}>
                    {t.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}