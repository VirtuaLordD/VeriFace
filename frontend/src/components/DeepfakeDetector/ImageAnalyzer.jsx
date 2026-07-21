import { useState } from 'react';
import FileUpload from '../common/FileUpload';
import { Loader2, AlertTriangle } from 'lucide-react';

const ImageAnalyzer = ({ onAnalyze, isAnalyzing }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const handleAnalyze = () => {
    if (!file) {
      setError('Please select a file first.');
      return;
    }
    setError('');
    const formData = new FormData();
    formData.append('file', file);
    onAnalyze(formData);
  };

  return (
    <div className="bg-surface rounded-2xl border border-surface-light p-6 md:p-8">
      <h2 className="text-xl font-semibold text-white mb-6">Upload Media for Analysis</h2>
      
      <div className="mb-6">
        <FileUpload 
          onFileSelect={setFile} 
          accept={{ 'image/*': ['.jpeg', '.jpg', '.png', '.webp'], 'video/*': ['.mp4', '.mov'] }}
        />
        {error && (
          <div className="mt-3 flex items-center text-danger text-sm">
            <AlertTriangle className="w-4 h-4 mr-1" />
            {error}
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleAnalyze}
          disabled={!file || isAnalyzing}
          className={`
            flex items-center justify-center px-6 py-3 rounded-xl font-medium text-white transition-all
            ${!file || isAnalyzing 
              ? 'bg-surface-light text-gray-400 cursor-not-allowed' 
              : 'bg-primary hover:bg-primary-light shadow-lg hover:shadow-primary/25'}
          `}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            'Scan for Deepfakes'
          )}
        </button>
      </div>
    </div>
  );
};

export default ImageAnalyzer;
