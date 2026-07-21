import DashboardStats from '../components/Dashboard/DashboardStats';
import RecentAnalyses from '../components/Dashboard/RecentAnalyses';
import { ScanFace, FileText, UserSearch } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const navigate = useNavigate();

  const actions = [
    { name: 'Scan Deepfake', icon: ScanFace, path: '/deepfake', color: 'bg-primary', hover: 'hover:bg-primary-light' },
    { name: 'Analyze Text', icon: FileText, path: '/text-analysis', color: 'bg-secondary', hover: 'hover:bg-secondary-light' },
    { name: 'Verify Account', icon: UserSearch, path: '/account-verifier', color: 'bg-accent', hover: 'hover:bg-accent/80' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Overview of your verification and threat detection metrics.</p>
      </div>

      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RecentAnalyses />
        </div>
        
        <div className="space-y-6">
          <div className="bg-surface rounded-2xl border border-surface-light p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {actions.map((action) => (
                <button
                  key={action.name}
                  onClick={() => navigate(action.path)}
                  className="w-full flex items-center p-4 rounded-xl bg-surface-dark border border-surface-light hover:border-gray-500 transition-all group"
                >
                  <div className={`p-3 rounded-lg ${action.color} text-white mr-4 transition-colors ${action.hover}`}>
                    <action.icon className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-white group-hover:text-primary transition-colors">
                    {action.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
