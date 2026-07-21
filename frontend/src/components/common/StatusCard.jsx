const StatusCard = ({ title, value, icon: Icon, trend, trendLabel, colorClass = 'text-primary' }) => {
  return (
    <div className="bg-surface/80 backdrop-blur-sm border border-surface-light rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-white">{value}</h3>
        </div>
        <div className={`p-3 rounded-xl bg-surface-light ${colorClass}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      
      {(trend || trendLabel) && (
        <div className="mt-4 flex items-center text-sm">
          {trend && (
            <span className={`font-medium ${trend.startsWith('+') ? 'text-success' : 'text-danger'} mr-2`}>
              {trend}
            </span>
          )}
          <span className="text-gray-500">{trendLabel}</span>
        </div>
      )}
    </div>
  );
};

export default StatusCard;
