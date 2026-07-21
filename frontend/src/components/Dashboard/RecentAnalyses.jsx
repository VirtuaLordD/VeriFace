import { ScanFace, FileText, UserSearch } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mockAnalyses = [
  { id: '1', type: 'deepfake', name: 'ceo_speech_q3.mp4', score: 12, status: 'Completed', date: '2 mins ago' },
  { id: '2', type: 'text', name: 'URGENT: Wire Transfer Req...', score: 85, status: 'Completed', date: '15 mins ago' },
  { id: '3', type: 'account', name: '@official_support_desk', score: 45, status: 'Completed', date: '1 hour ago' },
  { id: '4', type: 'deepfake', name: 'profile_pic_verify.jpg', score: 98, status: 'Completed', date: '3 hours ago' },
];

const getTypeIcon = (type) => {
  switch (type) {
    case 'deepfake': return <ScanFace className="w-4 h-4 text-primary" />;
    case 'text': return <FileText className="w-4 h-4 text-secondary" />;
    case 'account': return <UserSearch className="w-4 h-4 text-accent" />;
    default: return null;
  }
};

const getScoreColor = (score) => {
  if (score >= 70) return 'text-success bg-success/10 border-success/20';
  if (score >= 40) return 'text-warning bg-warning/10 border-warning/20';
  return 'text-danger bg-danger/10 border-danger/20';
};

const RecentAnalyses = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-surface rounded-2xl border border-surface-light overflow-hidden">
      <div className="px-6 py-5 border-b border-surface-light flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">Recent Analyses</h3>
        <button className="text-sm text-primary hover:text-primary-light font-medium">View All</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-dark/50 text-xs uppercase text-gray-400">
              <th className="px-6 py-4 font-medium">Type</th>
              <th className="px-6 py-4 font-medium">Item Name</th>
              <th className="px-6 py-4 font-medium">Trust Score</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-light">
            {mockAnalyses.map((analysis) => (
              <tr 
                key={analysis.id} 
                className="hover:bg-surface-light/50 transition-colors cursor-pointer"
                onClick={() => navigate(`/results/${analysis.id}`)}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 rounded-lg bg-surface-dark">{getTypeIcon(analysis.type)}</div>
                    <span className="text-sm text-gray-300 capitalize">{analysis.type}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-white font-medium">{analysis.name}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getScoreColor(analysis.score)}`}>
                    {analysis.score}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-400">{analysis.status}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{analysis.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentAnalyses;
