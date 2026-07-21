import { ShieldAlert, Activity, ShieldCheck, Zap } from 'lucide-react';
import StatusCard from '../common/StatusCard';

const DashboardStats = () => {
  const stats = [
    {
      title: 'Total Analyses',
      value: '24,593',
      icon: Activity,
      trend: '+12.5%',
      trendLabel: 'vs last week',
      colorClass: 'text-primary',
    },
    {
      title: 'Threats Detected',
      value: '1,432',
      icon: ShieldAlert,
      trend: '-2.4%',
      trendLabel: 'vs last week',
      colorClass: 'text-danger',
    },
    {
      title: 'Avg Trust Score',
      value: '84.2',
      icon: ShieldCheck,
      trend: '+1.2',
      trendLabel: 'vs last week',
      colorClass: 'text-success',
    },
    {
      title: 'Active Scans',
      value: '18',
      icon: Zap,
      trend: '',
      trendLabel: 'Currently processing',
      colorClass: 'text-secondary',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, idx) => (
        <StatusCard key={idx} {...stat} />
      ))}
    </div>
  );
};

export default DashboardStats;
