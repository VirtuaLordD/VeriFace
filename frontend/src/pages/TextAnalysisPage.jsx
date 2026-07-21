import { useState } from 'react';
import TextInput from '../components/TextAnalyzer/TextInput';
import TrustScorePanel from '../components/TrustScore/TrustScorePanel';

const TextAnalysisPage = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async (data) => {
    setIsAnalyzing(true);
    try {
      // Mock result
      setTimeout(() => {
        setResult({
          trust_score: 85,
          components: [
            { name: 'Phishing Indicators', score: 92, description: 'No common phishing phrases detected.' },
            { name: 'Urgency Analysis', score: 75, description: 'Moderate urgency in tone, common in business comms.' },
            { name: 'AI Generation', score: 88, description: 'Text appears human-written. Low perplexity predictability.' }
          ]
        });
        setIsAnalyzing(false);
      }, 1500);
      
    } catch (error) {
      console.error("Analysis failed", error);
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Text Analyzer</h1>
        <p className="text-gray-400">Analyze emails, messages, or documents for fraud and AI generation.</p>
      </div>

      <TextInput onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />

      {result && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <TrustScorePanel result={result} />
        </div>
      )}
    </div>
  );
};

export default TextAnalysisPage;
