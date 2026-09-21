'use client';

import React, { useState, useRef } from 'react';
import { useToast } from '@/components/ui/Toast';

export default function ImageResizer() {
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loadedImage, setLoadedImage] = useState<HTMLImageElement | null>(null);
  const [origW, setOrigW] = useState(0);
  const [origH, setOrigH] = useState(0);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [lockAspect, setLockAspect] = useState(true);
  const [format, setFormat] = useState('image/png');
  const [previewUrl, setPreviewUrl] = useState('');

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
        setOrigW(img.width);
        setOrigH(img.height);
        setWidth(img.width);
        setHeight(img.height);
        setPreviewUrl(e.target?.result as string);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleWidthChange = (val: number) => {
    setWidth(val);
    if (lockAspect && origW > 0) {
      setHeight(Math.round((val * origH) / origW));
    }
  };

  const handleHeightChange = (val: number) => {
    setHeight(val);
    if (lockAspect && origH > 0) {
      setWidth(Math.round((val * origW) / origH));
    }
  };

  const handleDownload = () => {
    if (!loadedImage || !selectedFile) return;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    if (format === 'image/jpeg') {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);
    }

    ctx.drawImage(loadedImage, 0, 0, width, height);

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const ext = format === 'image/png' ? 'png' : format === 'image/webp' ? 'webp' : 'jpg';
        const baseName = selectedFile.name.replace(/\.[^/.]+$/, '');
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.download = `${baseName}-${width}x${height}.${ext}`;
        a.href = url;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast('Resized image downloaded!');
      },
      format,
      0.92
    );
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
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
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
        <div className="dropzone-text">Click or drag image here to resize</div>
        <div className="dropzone-subtext">Resize by exact pixels with aspect ratio preservation</div>
      </div>

      {selectedFile && (
        <div style={{ marginTop: '2rem' }}>
          <div className="tool-grid-2col">
            <div>
              <div className="form-group">
                <span className="form-label">
                  Original Dimensions: <strong style={{ color: 'var(--accent-primary)' }}>{origW} &times; {origH} px</strong>
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Width (px)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={width}
                    onChange={(e) => handleWidthChange(parseInt(e.target.value) || 1)}
                    min="1"
                    max="10000"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Height (px)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={height}
                    onChange={(e) => handleHeightChange(parseInt(e.target.value) || 1)}
                    min="1"
                    max="10000"
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginTop: '0.5rem' }}>
                <label className="switch-control">
                  <input
                    type="checkbox"
                    className="switch-input"
                    checked={lockAspect}
                    onChange={(e) => setLockAspect(e.target.checked)}
                  />
                  <span className="switch-slider"></span>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-white)' }}>Lock Aspect Ratio</span>
                </label>
              </div>

              <div className="form-group">
                <label className="form-label">Output Format</label>
                <select className="form-select" value={format} onChange={(e) => setFormat(e.target.value)}>
                  <option value="image/png">PNG (Lossless)</option>
                  <option value="image/jpeg">JPEG (.jpg)</option>
                  <option value="image/webp">WebP (Modern Web)</option>
                </select>
              </div>

              <div style={{ marginTop: '1.75rem' }}>
                <button type="button" className="btn btn-primary" style={{ width: '100%' }} onClick={handleDownload}>
                  Download Resized Image
                </button>
              </div>
            </div>

            <div>
              <span className="form-label">Preview</span>
              <div className="image-preview-box">
                {previewUrl && (
                  <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '320px', objectFit: 'contain' }} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
