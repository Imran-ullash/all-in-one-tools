'use client';

import React, { useState, useRef } from 'react';
import { useToast } from '@/components/ui/Toast';

function formatBytes(bytes: number) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export default function JpgToPng() {
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pngBlob, setPngBlob] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const handleFile = (file: File) => {
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.drawImage(img, 0, 0);

        canvas.toBlob((blob) => {
          if (!blob) return;
          setPngBlob(blob);
          const url = URL.createObjectURL(blob);
          setPreviewUrl(url);
        }, 'image/png');
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    if (!pngBlob || !selectedFile) return;
    const url = URL.createObjectURL(pngBlob);
    const a = document.createElement('a');
    const baseName = selectedFile.name.replace(/\.[^/.]+$/, '');
    a.download = `${baseName}.png`;
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Downloaded converted PNG image!');
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg"
        style={{ display: 'none' }}
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
          }
        }}
      />

      <div
        className="image-dropzone"
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
          }
        }}
      >
        <svg className="dropzone-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
        </svg>
        <div className="dropzone-text">Click or drag JPG image here</div>
        <div className="dropzone-subtext">Converts instantly to lossless PNG format</div>
      </div>

      {selectedFile && (
        <div style={{ marginTop: '2rem' }}>
          <div className="tool-grid-2col">
            <div>
              <div className="metrics-grid">
                <div className="metric-pill">
                  <div className="metric-pill-val">{formatBytes(selectedFile.size)}</div>
                  <div className="metric-pill-label">Original JPG</div>
                </div>
                <div className="metric-pill">
                  <div className="metric-pill-val" style={{ color: 'var(--accent-primary)' }}>
                    {pngBlob ? formatBytes(pngBlob.size) : '0 KB'}
                  </div>
                  <div className="metric-pill-label">Converted PNG</div>
                </div>
              </div>

              <div style={{ marginTop: '2rem' }}>
                <button type="button" className="btn btn-primary" style={{ width: '100%' }} onClick={handleDownload}>
                  Download PNG Image
                </button>
              </div>
            </div>

            <div>
              <span className="form-label">Converted PNG Preview</span>
              <div className="image-preview-box">
                {previewUrl && (
                  <img src={previewUrl} alt="PNG preview" style={{ maxWidth: '100%', maxHeight: '320px', objectFit: 'contain' }} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
