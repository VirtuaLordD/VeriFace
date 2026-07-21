import { useState } from 'react';
import ImageAnalyzer from '../components/DeepfakeDetector/ImageAnalyzer';
import TrustScorePanel from '../components/TrustScore/TrustScorePanel';
import { deepfakeAPI } from '../services/api';

const DeepfakePage = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async (formData) => {
    setIsAnalyzing(true);
    try {
      // Simulate API call for now if backend isn't ready
      // const response = await deepfakeAPI.analyzeImage(formData);
      // setResult(response.data);
      
      // Mock result
      setTimeout(() => {
        setResult({
          trust_score: 24,
          components: [
            { name: 'Facial Artifacts', score: 15, description: 'High presence of artificial blurring around jawline.' },
            { name: 'Eye Consistency', score: 30, description: 'Unnatural reflection patterns detected.' },
            { name: 'Frequency Analysis', score: 28, description: 'Generative noise patterns found in spatial frequencies.' }
          ]
        });
        setIsAnalyzing(false);
      }, 2000);
      
    } catch (error) {
      console.error("Analysis failed", error);
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Deepfake Detector</h1>
        <p className="text-gray-400">Upload images or videos to detect AI-generated alterations.</p>
      </div>

      <ImageAnalyzer onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />

      {result && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <TrustScorePanel result={result} />
        </div>
      )}
    </div>
  );
};

export default DeepfakePage;
