import { useEffect, useState } from 'react';

const TrustScoreBadge = ({ score = 0, size = 'md' }) => {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 100);
    return () => clearTimeout(timer);
  }, [score]);

  let colorClass = 'text-danger';
  let strokeColor = 'stroke-danger';
  if (score >= 70) {
    colorClass = 'text-success';
    strokeColor = 'stroke-success';
  } else if (score >= 40) {
    colorClass = 'text-warning';
    strokeColor = 'stroke-warning';
  }

  const dimensions = {
    sm: { svg: 40, stroke: 4, text: 'text-xs' },
    md: { svg: 80, stroke: 6, text: 'text-2xl' },
    lg: { svg: 120, stroke: 8, text: 'text-4xl' },
    xl: { svg: 200, stroke: 12, text: 'text-6xl' },
  };

  const dim = dimensions[size];
  const radius = (dim.svg - dim.stroke) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (animatedScore / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className="transform -rotate-90" width={dim.svg} height={dim.svg}>
        {/* Background Circle */}
        <circle
          className="stroke-surface-light"
          strokeWidth={dim.stroke}
          fill="transparent"
          r={radius}
          cx={dim.svg / 2}
          cy={dim.svg / 2}
        />
        {/* Progress Circle */}
        <circle
          className={`${strokeColor} transition-all duration-1000 ease-out`}
          strokeWidth={dim.stroke}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={dim.svg / 2}
          cy={dim.svg / 2}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset,
          }}
        />
      </svg>
      <div className={`absolute font-bold ${colorClass} ${dim.text}`}>
        {Math.round(animatedScore)}
      </div>
    </div>
  );
};

export default TrustScoreBadge;
