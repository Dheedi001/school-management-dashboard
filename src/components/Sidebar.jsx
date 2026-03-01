import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, Users, UserCheck, BookOpen, 
  CreditCard, Settings, LogOut, ShieldCheck 
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();
  
  const menuItems = [
    { name: "Overview", icon: LayoutDashboard, path: "/" },
    { name: "Students", icon: Users, path: "/students" },
    { name: "Attendance", icon: ShieldCheck, path: "/attendance" },
    { name: "Teachers", icon: UserCheck, path: "/teachers" },
    { name: "Courses", icon: BookOpen, path: "/courses" },
    { name: "Finance", icon: CreditCard, path: "/finance" },
  ];

  return (
    <div className="w-64 h-screen bg-slate-900 text-slate-300 flex flex-col fixed left-0 top-0">
      <div className="p-6 text-white flex items-center gap-3 border-b border-slate-800">
        <div className="bg-blue-600 p-1.5 rounded-lg text-white">
          <ShieldCheck size={22} />
        </div>
        <span className="text-xl font-bold tracking-tight">EduAdmin</span>
      </div>

      <nav className="flex-1 p-4 space-y-2 mt-4">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                isActive 
                ? "bg-blue-600 text-white shadow-lg" 
                : "hover:bg-slate-800 hover:text-white"
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}