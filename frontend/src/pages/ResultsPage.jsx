import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import TrustScorePanel from '../components/TrustScore/TrustScorePanel';

const ResultsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);

  useEffect(() => {
    // Simulate fetching result by ID
    const fetchResult = () => {
      setLoading(true);
      setTimeout(() => {
        setResult({
          id,
          type: 'Deepfake Analysis',
          date: new Date().toLocaleString(),
          target: 'ceo_speech_q3.mp4',
          trust_score: 12,
          components: [
            { name: 'Facial Artifacts', score: 5, description: 'Severe warping around the mouth.' },
            { name: 'Audio/Video Sync', score: 20, description: 'Lip sync mismatch detected.' },
            { name: 'Temporal Consistency', score: 10, description: 'Flickering between frames.' }
          ]
        });
        setLoading(false);
      }, 1000);
    };

    fetchResult();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-5xl mx-auto">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-sm text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back
      </button>

      <div className="bg-surface border border-surface-light rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-white mb-2">Analysis Results</h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
          <div><span className="font-medium text-gray-300">ID:</span> {id}</div>
          <div><span className="font-medium text-gray-300">Type:</span> {result.type}</div>
          <div><span className="font-medium text-gray-300">Target:</span> {result.target}</div>
          <div><span className="font-medium text-gray-300">Date:</span> {result.date}</div>
        </div>
      </div>

      <TrustScorePanel result={result} />
    </div>
  );
};

export default ResultsPage;
