import { useApp } from '../context/AppContext';
import StatCard from "../components/StatCard";
import { CreditCard, ArrowUpRight } from "lucide-react";

export default function Finance() {
  const { students } = useApp();
  
  // Calculate revenue from the live student database
  const totalRevenue = students.reduce((acc, curr) => acc + (curr.fees || 0), 0);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Finance Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Revenue" 
          value={`₦${(totalRevenue / 1000000).toFixed(1)}M`} 
          icon={ArrowUpRight} 
          trend="From DB" 
        />
        <StatCard title="Scholarships" value="42" icon={CreditCard} trend="Fixed" />
      </div>
      {/* ... Table of payments ... */}
    </div>
  );
}