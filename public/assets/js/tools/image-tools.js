/**
 * OmniTools - Image Tools Suite
 * Image Compressor, Image Resizer, JPG to PNG, PNG to JPG
 * All processing is done 100% client-side via HTML5 Canvas & Blob API
 */

document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname;

  if (document.getElementById('imgCompressorDropzone') || currentPath.includes('image-compressor')) {
    initImageCompressor();
  }
  if (document.getElementById('imgResizerDropzone') || currentPath.includes('image-resizer')) {
    initImageResizer();
  }
  if (document.getElementById('jpgToPngDropzone') || currentPath.includes('jpg-to-png')) {
    initJpgToPng();
  }
  if (document.getElementById('pngToJpgDropzone') || currentPath.includes('png-to-jpg')) {
    initPngToJpg();
  }
});

/* Helper: Setup drag and drop for any dropzone */
function setupDropzone(dropzoneEl, fileInputEl, onFileSelected) {
  if (!dropzoneEl || !fileInputEl) return;

  dropzoneEl.addEventListener('click', () => fileInputEl.click());

  fileInputEl.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelected(e.target.files[0]);
    }
  });

  ['dragenter', 'dragover'].forEach(eventName => {
    dropzoneEl.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropzoneEl.classList.add('dragover');
    });
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropzoneEl.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropzoneEl.classList.remove('dragover');
    });
  });

  dropzoneEl.addEventListener('drop', (e) => {
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelected(e.dataTransfer.files[0]);
    }
  });
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/* ==========================================================================
   1. IMAGE COMPRESSOR
   ========================================================================== */
function initImageCompressor() {
  const dropzone = document.getElementById('imgCompressorDropzone');
  const fileInput = document.getElementById('imgCompressorInput');
  const controls = document.getElementById('imgCompressorControls');
  const qualityRange = document.getElementById('compressQuality');
  const qualityVal = document.getElementById('compressQualityVal');
  const maxDimInput = document.getElementById('compressMaxDim');
  const origSizeEl = document.getElementById('compressOrigSize');
  const newSizeEl = document.getElementById('compressNewSize');
  const savingsEl = document.getElementById('compressSavings');
  const previewImg = document.getElementById('compressPreviewImg');
  const downloadBtn = document.getElementById('compressDownloadBtn');

  if (!dropzone || !fileInput) return;

  let originalFile = null;
  let loadedImage = null;
  let compressedBlob = null;

  setupDropzone(dropzone, fileInput, (file) => {
    if (!file.type.startsWith('image/')) {
      window.showToast('Please select a valid image file', 'error');
      return;
    }
    originalFile = file;
    origSizeEl.textContent = formatBytes(file.size);

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        loadedImage = img;
        controls.style.display = 'block';
        maxDimInput.value = Math.max(img.width, img.height);
        compressNow();
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });

  const compressNow = () => {
    if (!loadedImage) return;

    const quality = parseFloat(qualityRange.value) / 100;
    qualityVal.textContent = `${qualityRange.value}%`;

    const maxDim = parseInt(maxDimInput.value) || Math.max(loadedImage.width, loadedImage.height);
    let targetW = loadedImage.width;
    let targetH = loadedImage.height;

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
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(loadedImage, 0, 0, targetW, targetH);

    canvas.toBlob((blob) => {
      if (!blob) return;
      compressedBlob = blob;
      newSizeEl.textContent = formatBytes(blob.size);

      const savedPercent = Math.max(0, (((originalFile.size - blob.size) / originalFile.size) * 100)).toFixed(1);
      savingsEl.textContent = `${savedPercent}% Saved`;

      const previewUrl = URL.createObjectURL(blob);
      previewImg.src = previewUrl;
      previewImg.style.display = 'block';
    }, 'image/jpeg', quality);
  };

  qualityRange.addEventListener('input', compressNow);
  maxDimInput.addEventListener('change', compressNow);

  downloadBtn.addEventListener('click', () => {
    if (!compressedBlob) return;
    const url = URL.createObjectURL(compressedBlob);
    const a = document.createElement('a');
    const baseName = originalFile.name.replace(/\.[^/.]+$/, '');
    a.download = `${baseName}-compressed.jpg`;
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    window.showToast('Compressed image downloaded!');
  });
}

/* ==========================================================================
   2. IMAGE RESIZER
   ========================================================================== */
function initImageResizer() {
  const dropzone = document.getElementById('imgResizerDropzone');
  const fileInput = document.getElementById('imgResizerInput');
  const controls = document.getElementById('imgResizerControls');
  const widthInput = document.getElementById('resizeWidth');
  const heightInput = document.getElementById('resizeHeight');
  const lockAspect = document.getElementById('resizeLockAspect');
  const formatSelect = document.getElementById('resizeFormat');
  const origDimEl = document.getElementById('resizeOrigDim');
  const previewImg = document.getElementById('resizePreviewImg');
  const downloadBtn = document.getElementById('resizeDownloadBtn');

  if (!dropzone || !fileInput) return;

  let originalFile = null;
  let loadedImage = null;
  let aspectRatio = 1;

  setupDropzone(dropzone, fileInput, (file) => {
    if (!file.type.startsWith('image/')) {
      window.showToast('Please select a valid image file', 'error');
      return;
    }
    originalFile = file;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        loadedImage = img;
        aspectRatio = img.width / img.height;
        origDimEl.textContent = `${img.width} × ${img.height} px`;
        widthInput.value = img.width;
        heightInput.value = img.height;
        controls.style.display = 'block';
        previewImg.src = e.target.result;
        previewImg.style.display = 'block';
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });

  widthInput.addEventListener('input', () => {
    if (lockAspect.checked && aspectRatio > 0) {
      const w = parseInt(widthInput.value) || 1;
      heightInput.value = Math.round(w / aspectRatio);
    }
  });

  heightInput.addEventListener('input', () => {
    if (lockAspect.checked && aspectRatio > 0) {
      const h = parseInt(heightInput.value) || 1;
      widthInput.value = Math.round(h * aspectRatio);
    }
  });

  downloadBtn.addEventListener('click', () => {
    if (!loadedImage) return;

    const targetW = parseInt(widthInput.value) || loadedImage.width;
    const targetH = parseInt(heightInput.value) || loadedImage.height;
    const format = formatSelect.value || 'image/png';

    const canvas = document.createElement('canvas');
    canvas.width = targetW;
    canvas.height = targetH;
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // If JPEG, fill white background
    if (format === 'image/jpeg') {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, targetW, targetH);
    }

    ctx.drawImage(loadedImage, 0, 0, targetW, targetH);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const ext = format === 'image/png' ? 'png' : format === 'image/webp' ? 'webp' : 'jpg';
      const baseName = originalFile.name.replace(/\.[^/.]+$/, '');
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.download = `${baseName}-${targetW}x${targetH}.${ext}`;
      a.href = url;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      window.showToast('Resized image downloaded!');
    }, format, 0.92);
  });
}

/* ==========================================================================
   3. JPG TO PNG
   ========================================================================== */
function initJpgToPng() {
  const dropzone = document.getElementById('jpgToPngDropzone');
  const fileInput = document.getElementById('jpgToPngInput');
  const controls = document.getElementById('jpgToPngControls');
  const origSizeEl = document.getElementById('jpgOrigSize');
  const newSizeEl = document.getElementById('pngNewSize');
  const previewImg = document.getElementById('pngPreviewImg');
  const downloadBtn = document.getElementById('pngDownloadBtn');

  if (!dropzone || !fileInput) return;

  let originalFile = null;
  let pngBlob = null;

  setupDropzone(dropzone, fileInput, (file) => {
    originalFile = file;
    origSizeEl.textContent = formatBytes(file.size);

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        canvas.toBlob((blob) => {
          if (!blob) return;
          pngBlob = blob;
          newSizeEl.textContent = formatBytes(blob.size);
          const url = URL.createObjectURL(blob);
          previewImg.src = url;
          previewImg.style.display = 'block';
          controls.style.display = 'block';
        }, 'image/png');
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });

  downloadBtn.addEventListener('click', () => {
    if (!pngBlob) return;
    const url = URL.createObjectURL(pngBlob);
    const a = document.createElement('a');
    const baseName = originalFile.name.replace(/\.[^/.]+$/, '');
    a.download = `${baseName}.png`;
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    window.showToast('Downloaded converted PNG image!');
  });
}

/* ==========================================================================
   4. PNG TO JPG
   ========================================================================== */
function initPngToJpg() {
  const dropzone = document.getElementById('pngToJpgDropzone');
  const fileInput = document.getElementById('pngToJpgInput');
  const controls = document.getElementById('pngToJpgControls');
  const bgColorPicker = document.getElementById('pngJpgBgColor');
  const qualityRange = document.getElementById('pngJpgQuality');
  const qualityVal = document.getElementById('pngJpgQualityVal');
  const origSizeEl = document.getElementById('pngOrigSize');
  const newSizeEl = document.getElementById('jpgNewSize');
  const previewImg = document.getElementById('jpgPreviewImg');
  const downloadBtn = document.getElementById('jpgDownloadBtn');

  if (!dropzone || !fileInput) return;

  let originalFile = null;
  let loadedImage = null;
  let jpgBlob = null;

  setupDropzone(dropzone, fileInput, (file) => {
    originalFile = file;
    origSizeEl.textContent = formatBytes(file.size);

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        loadedImage = img;
        controls.style.display = 'block';
        convertPngToJpg();
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });

  const convertPngToJpg = () => {
    if (!loadedImage) return;

    const quality = parseFloat(qualityRange.value) / 100;
    qualityVal.textContent = `${qualityRange.value}%`;
    const bgColor = bgColorPicker.value || '#FFFFFF';

    const canvas = document.createElement('canvas');
    canvas.width = loadedImage.width;
    canvas.height = loadedImage.height;
    const ctx = canvas.getContext('2d');

    // Fill background with chosen color to replace transparency
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the PNG image
    ctx.drawImage(loadedImage, 0, 0);

    canvas.toBlob((blob) => {
      if (!blob) return;
      jpgBlob = blob;
      newSizeEl.textContent = formatBytes(blob.size);
      const url = URL.createObjectURL(blob);
      previewImg.src = url;
      previewImg.style.display = 'block';
    }, 'image/jpeg', quality);
  };

  qualityRange.addEventListener('input', convertPngToJpg);
  bgColorPicker.addEventListener('input', convertPngToJpg);

  downloadBtn.addEventListener('click', () => {
    if (!jpgBlob) return;
    const url = URL.createObjectURL(jpgBlob);
    const a = document.createElement('a');
    const baseName = originalFile.name.replace(/\.[^/.]+$/, '');
    a.download = `${baseName}.jpg`;
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    window.showToast('Downloaded converted JPG image!');
  });
}
