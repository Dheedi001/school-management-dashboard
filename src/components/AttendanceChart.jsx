import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { day: 'Mon', scans: 2400 },
  { day: 'Tue', scans: 1398 },
  { day: 'Wed', scans: 3800 },
  { day: 'Thu', scans: 3908 },
  { day: 'Fri', scans: 4800 },
];

export default function AttendanceChart() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-80">
      <h2 className="text-lg font-bold text-slate-800 mb-4">Weekly Scan Volume</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
          <YAxis hide />
          <Tooltip 
            cursor={{fill: '#f8fafc'}}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Bar dataKey="scans" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}