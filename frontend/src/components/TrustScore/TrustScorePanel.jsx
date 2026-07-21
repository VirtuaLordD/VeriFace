import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import TrustScoreBadge from '../common/TrustScoreBadge';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';

const TrustScorePanel = ({ result }) => {
  if (!result) return null;

  const score = result.trust_score || result.score || 0;
  const components = result.components || [];

  const getRiskLevel = (s) => {
    if (s >= 80) return { label: 'Low Risk', color: 'text-success', bg: 'bg-success/10', icon: CheckCircle };
    if (s >= 50) return { label: 'Medium Risk', color: 'text-warning', bg: 'bg-warning/10', icon: Info };
    return { label: 'High Risk', color: 'text-danger', bg: 'bg-danger/10', icon: AlertCircle };
  };

  const risk = getRiskLevel(score);
  const RiskIcon = risk.icon;

  const chartData = components.map(c => ({
    subject: c.name,
    A: c.score,
    fullMark: 100,
  })) || [{ subject: 'General', A: score, fullMark: 100 }];

  return (
    <div className="bg-surface rounded-2xl border border-surface-light overflow-hidden">
      <div className="p-6 md:p-8 border-b border-surface-light">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center justify-center space-y-4">
            <h3 className="text-lg font-medium text-gray-400">Overall Trust Score</h3>
            <TrustScoreBadge score={score} size="xl" />
            <div className={`flex items-center px-4 py-2 rounded-full ${risk.bg} ${risk.color}`}>
              <RiskIcon className="w-5 h-5 mr-2" />
              <span className="font-semibold">{risk.label}</span>
            </div>
          </div>
          
          <div className="flex-1 w-full max-w-md h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                <PolarGrid stroke="#312e81" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="Score" dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.5} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8 bg-surface-dark/50">
        <h4 className="text-lg font-semibold text-white mb-4">Detailed Breakdown</h4>
        <div className="space-y-4">
          {components.length > 0 ? components.map((comp, idx) => (
            <div key={idx} className="bg-surface border border-surface-light rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-white">{comp.name}</span>
                <span className="text-primary font-bold">{comp.score}/100</span>
              </div>
              <div className="w-full bg-surface-dark rounded-full h-2 mb-2">
                <div 
                  className="bg-primary h-2 rounded-full" 
                  style={{ width: `${comp.score}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-400">{comp.description}</p>
            </div>
          )) : (
            <div className="text-gray-400 text-sm">
              No detailed component breakdown available for this result.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrustScorePanel;
