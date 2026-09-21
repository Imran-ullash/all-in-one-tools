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

export default function PngToJpg() {
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loadedImage, setLoadedImage] = useState<HTMLImageElement | null>(null);
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [quality, setQuality] = useState(90);
  const [jpgBlob, setJpgBlob] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const handleFile = (file: File) => {
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setLoadedImage(img);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (!loadedImage) return;

    const canvas = document.createElement('canvas');
    canvas.width = loadedImage.width;
    canvas.height = loadedImage.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(loadedImage, 0, 0);

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        setJpgBlob(blob);
        const url = URL.createObjectURL(blob);
        setPreviewUrl(url);
      },
      'image/jpeg',
      quality / 100
    );
  }, [loadedImage, bgColor, quality]);

  const handleDownload = () => {
    if (!jpgBlob || !selectedFile) return;
    const url = URL.createObjectURL(jpgBlob);
    const a = document.createElement('a');
    const baseName = selectedFile.name.replace(/\.[^/.]+$/, '');
    a.download = `${baseName}.jpg`;
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Downloaded converted JPG image!');
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png"
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
          <circle cx="10" cy="13" r="2"></circle>
          <path d="m20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 21"></path>
        </svg>
        <div className="dropzone-text">Click or drag PNG image here</div>
        <div className="dropzone-subtext">Convert PNG to lightweight JPG with custom background</div>
      </div>

      {selectedFile && (
        <div style={{ marginTop: '2rem' }}>
          <div className="tool-grid-2col">
            <div>
              <div className="form-group">
                <label htmlFor="pngJpgBgColor" className="form-label">Background Color (Replaces Transparency)</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <input
                    type="color"
                    id="pngJpgBgColor"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    style={{ width: '50px', height: '42px', borderRadius: '6px', cursor: 'pointer', background: 'transparent', border: '1px solid var(--border-color)' }}
                  />
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Default: Solid White (#FFFFFF)</span>
                </div>
              </div>

              <div className="form-group slider-group">
                <div className="slider-val-header">
                  <span>JPG Quality</span>
                  <span style={{ color: 'var(--accent-primary)' }}>{quality}%</span>
                </div>
                <input
                  type="range"
                  className="custom-range"
                  min="30"
                  max="100"
                  value={quality}
                  onChange={(e) => setQuality(parseInt(e.target.value))}
                />
              </div>

              <div className="metrics-grid">
                <div className="metric-pill">
                  <div className="metric-pill-val">{formatBytes(selectedFile.size)}</div>
                  <div className="metric-pill-label">Original PNG</div>
                </div>
                <div className="metric-pill">
                  <div className="metric-pill-val" style={{ color: 'var(--accent-primary)' }}>
                    {jpgBlob ? formatBytes(jpgBlob.size) : '0 KB'}
                  </div>
                  <div className="metric-pill-label">Converted JPG</div>
                </div>
              </div>

              <div style={{ marginTop: '1.75rem' }}>
                <button type="button" className="btn btn-primary" style={{ width: '100%' }} onClick={handleDownload}>
                  Download JPG Image
                </button>
              </div>
            </div>

            <div>
              <span className="form-label">Converted JPG Preview</span>
              <div className="image-preview-box">
                {previewUrl && (
                  <img src={previewUrl} alt="JPG preview" style={{ maxWidth: '100%', maxHeight: '320px', objectFit: 'contain' }} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
