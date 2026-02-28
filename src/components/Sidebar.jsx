import { Link } from "react-router-dom";
import { LayoutDashboard, Users, QrCode } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-slate-900 text-white flex flex-col fixed left-0 top-0">
      
      <div className="p-6 text-2xl font-bold border-b border-slate-800 tracking-wider">
        EduAdmin
      </div>

      <nav className="flex-1 p-4 space-y-2 mt-4">
        
        {/* We use <Link to="..."> instead of a standard <a> tag */}
        <Link to="/" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors">
          <LayoutDashboard size={20} />
          <span className="font-medium">Overview</span>
        </Link>

        {/* We haven't built the Students page yet, so we just link it to "/" for now */}
        <Link to="/" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors">
          <Users size={20} />
          <span className="font-medium">Students</span>
        </Link>

        <Link to="/attendance" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition-colors">
          <QrCode size={20} />
          <span className="font-medium">Attendance</span>
        </Link>

      </nav>
    </div>
  );
}