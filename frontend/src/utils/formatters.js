export const formatScore = (score) => {
  if (score === null || score === undefined) return 'N/A';
  return `${Math.round(score)}%`;
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

export const getRiskLevel = (score) => {
  if (score >= 80) return 'Low';
  if (score >= 60) return 'Medium';
  if (score >= 30) return 'High';
  return 'Critical';
};

export const getRiskColor = (level) => {
  switch (level?.toLowerCase()) {
    case 'low': return 'text-success';
    case 'medium': return 'text-warning';
    case 'high':
    case 'critical': return 'text-danger';
    default: return 'text-gray-400';
  }
};

export const truncateText = (text, maxLen = 50) => {
  if (!text) return '';
  if (text.length <= maxLen) return text;
  return text.substring(0, maxLen) + '...';
};
