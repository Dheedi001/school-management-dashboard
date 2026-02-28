export default function StatCard({ title, value, icon: Icon, trend }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
      <div className="flex justify-between items-start">
        
        {/* Title and Value */}
        <div>
          <p className="text-slate-500 text-sm font-medium">{title}</p>
          <h3 className="text-3xl font-bold text-slate-800 mt-2">{value}</h3>
        </div>
        
        {/* Icon Container */}
        <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
          <Icon size={24} />
        </div>

      </div>
      
      {/* Trend Indicator */}
      <div className="mt-4">
        <span className="text-emerald-500 text-sm font-medium">{trend}</span>
        <span className="text-slate-400 text-sm ml-2">vs last week</span>
      </div>
    </div>
  );
}