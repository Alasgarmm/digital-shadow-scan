
import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileUploadProps {
  onChange: (files: File[]) => void;
  maxFiles?: number;
}

const FileUpload: React.FC<FileUploadProps> = ({ onChange, maxFiles = 3 }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };
  
  const handleFiles = (newFiles: File[]) => {
    // Filter only images
    const imageFiles = newFiles.filter(file => file.type.startsWith('image/'));
    
    // Check max files limit
    const updatedFiles = [...files];
    for (let i = 0; i < imageFiles.length; i++) {
      if (updatedFiles.length < maxFiles) {
        updatedFiles.push(imageFiles[i]);
      } else {
        break;
      }
    }
    
    setFiles(updatedFiles);
    onChange(updatedFiles);
  };

  const removeFile = (index: number) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
    onChange(updatedFiles);
  };

  return (
    <div className="w-full">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all 
                   ${dragActive ? 'border-neon-purple bg-neon-purple/10' : 'border-border hover:border-neon-purple/50 hover:bg-secondary/20'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-input')?.click()}
      >
        <input
          id="file-input"
          type="file"
          multiple
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
        <Upload className="h-10 w-10 text-neon-purple mx-auto mb-3" />
        <p className="text-lg font-medium mb-1">Drop your photos here</p>
        <p className="text-sm text-muted-foreground mb-3">or click to browse</p>
        <p className="text-xs text-muted-foreground">
          Upload up to {maxFiles} photos for scanning. Supported formats: JPG, PNG, WEBP
        </p>
      </div>
      
      {files.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-medium mb-3">{files.length} of {maxFiles} photos selected:</p>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded bg-secondary overflow-hidden mr-3">
                    <img 
                      src={URL.createObjectURL(file)} 
                      alt={`Preview ${index}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium truncate max-w-[200px]">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </div>
                </div>
                <Button
                  variant="ghost" 
                  size="icon" 
                  onClick={(e) => { e.stopPropagation(); removeFile(index); }}
                  className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
