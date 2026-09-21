'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useToast } from '@/components/ui/Toast';

function formatBytes(bytes: number) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export default function ImageCompressor() {
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loadedImage, setLoadedImage] = useState<HTMLImageElement | null>(null);
  const [quality, setQuality] = useState(80);
  const [maxDimension, setMaxDimension] = useState<number | ''>('');
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file', 'error');
      return;
    }
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setLoadedImage(img);
        setMaxDimension(Math.max(img.width, img.height));
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (!loadedImage || !selectedFile) return;

    let targetW = loadedImage.width;
    let targetH = loadedImage.height;
    const maxDim = typeof maxDimension === 'number' && maxDimension > 0 ? maxDimension : Math.max(targetW, targetH);

    if (targetW > maxDim || targetH > maxDim) {
      if (targetW > targetH) {
        targetH = Math.round((targetH * maxDim) / targetW);
        targetW = maxDim;
      } else {
        targetW = Math.round((targetW * maxDim) / targetH);
        targetH = maxDim;
      }
    }

    const canvas = document.createElement('canvas');
    canvas.width = targetW;
    canvas.height = targetH;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(loadedImage, 0, 0, targetW, targetH);

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        setCompressedBlob(blob);
        const url = URL.createObjectURL(blob);
        setPreviewUrl(url);
      },
      'image/jpeg',
      quality / 100
    );
  }, [loadedImage, quality, maxDimension, selectedFile]);

  const handleDownload = () => {
    if (!compressedBlob || !selectedFile) return;
    const url = URL.createObjectURL(compressedBlob);
    const a = document.createElement('a');
    const baseName = selectedFile.name.replace(/\.[^/.]+$/, '');
    a.download = `${baseName}-compressed.jpg`;
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Compressed image downloaded!');
  };

  const origSize = selectedFile ? selectedFile.size : 0;
  const newSize = compressedBlob ? compressedBlob.size : 0;
  const savedPercent = origSize > 0 && newSize > 0
    ? Math.max(0, (((origSize - newSize) / origSize) * 100)).toFixed(1)
    : '0';

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
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
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="17 8 12 3 7 8"></polyline>
          <line x1="12" y1="8" x2="12" y2="15"></line>
        </svg>
        <div className="dropzone-text">Click or drag image here to compress</div>
        <div className="dropzone-subtext">Supports JPEG, PNG, WebP (Processed entirely in browser)</div>
      </div>

      {selectedFile && (
        <div style={{ marginTop: '2rem' }}>
          <div className="tool-grid-2col">
            <div>
              <div className="form-group slider-group">
                <div className="slider-val-header">
                  <span>Compression Quality</span>
                  <span style={{ color: 'var(--accent-primary)' }}>{quality}%</span>
                </div>
                <input
                  type="range"
                  className="custom-range"
                  min="10"
                  max="100"
                  value={quality}
                  onChange={(e) => setQuality(parseInt(e.target.value))}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Max Width / Height (px)</label>
                <input
                  type="number"
                  className="form-input"
                  value={maxDimension}
                  onChange={(e) => setMaxDimension(parseInt(e.target.value) || '')}
                  placeholder="e.g. 1920"
                />
              </div>

              <div className="metrics-grid" style={{ marginTop: '1.5rem' }}>
                <div className="metric-pill">
                  <div className="metric-pill-val">{formatBytes(origSize)}</div>
                  <div className="metric-pill-label">Original Size</div>
                </div>
                <div className="metric-pill">
                  <div className="metric-pill-val" style={{ color: 'var(--accent-primary)' }}>{formatBytes(newSize)}</div>
                  <div className="metric-pill-label">Compressed Size</div>
                </div>
                <div className="metric-pill">
                  <div className="metric-pill-val" style={{ color: '#10B981' }}>{savedPercent}%</div>
                  <div className="metric-pill-label">Saved</div>
                </div>
              </div>

              <div style={{ marginTop: '1.75rem' }}>
                <button type="button" className="btn btn-primary" style={{ width: '100%' }} onClick={handleDownload}>
                  Download Compressed Image
                </button>
              </div>
            </div>

            <div>
              <span className="form-label">Live Compressed Preview</span>
              <div className="image-preview-box">
                {previewUrl && (
                  <img src={previewUrl} alt="Compressed preview" style={{ maxWidth: '100%', maxHeight: '320px', objectFit: 'contain' }} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
