import { useState } from 'react';
import { Loader2, AlertTriangle } from 'lucide-react';

const TextInput = ({ onAnalyze, isAnalyzing }) => {
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const maxLength = 5000;

  const handleAnalyze = () => {
    if (text.length < 10) {
      setError('Text is too short. Please provide at least 10 characters.');
      return;
    }
    setError('');
    onAnalyze({ text });
  };

  return (
    <div className="bg-surface rounded-2xl border border-surface-light p-6 md:p-8">
      <h2 className="text-xl font-semibold text-white mb-6">Text Analysis</h2>
      
      <div className="mb-4">
        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (error) setError('');
          }}
          placeholder="Paste email, message, or article text here..."
          className="w-full h-48 bg-surface-dark border border-surface-light rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none transition-colors"
        />
        
        <div className="flex justify-between items-center mt-2">
          {error ? (
            <div className="flex items-center text-danger text-sm">
              <AlertTriangle className="w-4 h-4 mr-1" />
              {error}
            </div>
          ) : (
            <div />
          )}
          <div className={`text-sm ${text.length > maxLength ? 'text-danger' : 'text-gray-500'}`}>
            {text.length} / {maxLength}
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={handleAnalyze}
          disabled={!text || text.length > maxLength || isAnalyzing}
          className={`
            flex items-center justify-center px-6 py-3 rounded-xl font-medium text-white transition-all
            ${!text || text.length > maxLength || isAnalyzing 
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
            'Analyze Text'
          )}
        </button>
      </div>
    </div>
  );
};

export default TextInput;
