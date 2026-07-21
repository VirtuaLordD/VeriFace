import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, X, File, Image as ImageIcon } from 'lucide-react';

const FileUpload = ({ onFileSelect, accept, maxFiles = 1, maxSize = 52428800 }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (selectedFile.type.startsWith('image/')) {
        setPreview(URL.createObjectURL(selectedFile));
      }
      onFileSelect(selectedFile);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    maxSize,
  });

  const clearFile = (e) => {
    e.stopPropagation();
    setFile(null);
    setPreview(null);
    onFileSelect(null);
  };

  return (
    <div className="w-full">
      {!file ? (
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200
            ${isDragActive ? 'border-primary bg-primary/10' : 'border-surface-light hover:border-primary-light hover:bg-surface-light'}
            ${isDragReject ? 'border-danger bg-danger/10' : ''}
          `}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className={`p-4 rounded-full ${isDragActive ? 'bg-primary/20' : 'bg-surface'}`}>
              <UploadCloud className={`w-8 h-8 ${isDragActive ? 'text-primary' : 'text-gray-400'}`} />
            </div>
            <div>
              <p className="text-lg font-medium text-white mb-1">
                {isDragActive ? 'Drop file here' : 'Drag & drop file here'}
              </p>
              <p className="text-sm text-gray-400">or click to browse</p>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Max size: {Math.round(maxSize / 1024 / 1024)}MB
            </div>
          </div>
        </div>
      ) : (
        <div className="relative border border-surface-light rounded-xl p-4 bg-surface flex items-center space-x-4">
          <div className="flex-shrink-0 w-16 h-16 bg-surface-dark rounded-lg flex items-center justify-center overflow-hidden">
            {preview ? (
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <File className="w-8 h-8 text-primary" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{file.name}</p>
            <p className="text-xs text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
          <button
            onClick={clearFile}
            className="flex-shrink-0 p-2 text-gray-400 hover:text-white hover:bg-surface-light rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
