import React, { useState } from 'react';
import { Eye, Upload, AlertCircle, Loader2 } from 'lucide-react';
import { scanDeepfake } from '../services/api';
import type { ScanResult } from '../services/api';
import { ResultCard } from '../components/ResultCard';

export const DeepfakePage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [result, setResult] = useState<ScanResult | null>(null);

  const handleFileChange = (selected: File) => {
    setError('');
    setResult(null);

    // 50MB limit
    if (selected.size > 50 * 1024 * 1024) {
      setError('File size exceeds 50MB limit. Please upload a smaller sample.');
      return;
    }

    setFile(selected);
    if (selected.type.startsWith('image/')) {
      setPreviewUrl(URL.createObjectURL(selected));
    } else {
      setPreviewUrl(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleScan = async () => {
    if (!file) {
      setError('Please select an image, video, or audio file.');
      return;
    }

    setError('');
    setLoading(true);
    setProgress(15);

    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 90 ? 90 : prev + 15));
    }, 250);

    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await scanDeepfake(formData);
      clearInterval(interval);
      setProgress(100);
      setResult(res);
    } catch (err: any) {
      clearInterval(interval);
      setError(err.response?.data?.detail || 'Deepfake analysis failed. Please verify the file.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-[#287C78] text-xs font-bold uppercase tracking-wider mb-1">
          <Eye className="h-4 w-4" />
          <span>Module 01: Forensic Media Suite</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#172B4D]">
          Deepfake & Synthetic Media Detector
        </h1>
        <p className="text-xs sm:text-sm text-[#667085] mt-1">
          Inspect face-swaps, synthetic voices, diffusion noise artifacts, and optical frequency discrepancies.
        </p>
      </div>

      {/* Upload Box */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="rounded-xl border-2 border-dashed border-[#DCE3EB] hover:border-[#287C78] bg-[#FFFFFF] p-8 text-center transition cursor-pointer shadow-xs"
      >
        <input
          type="file"
          id="fileUpload"
          className="hidden"
          accept="image/*,video/*,audio/*"
          onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
        />
        <label htmlFor="fileUpload" className="cursor-pointer block">
          <div className="h-14 w-14 rounded-xl bg-[#EBF4F3] border border-[#DCE3EB] text-[#287C78] flex items-center justify-center mx-auto mb-3.5">
            <Upload className="h-6 w-6" />
          </div>
          <h3 className="font-bold text-[#172B4D] text-sm sm:text-base">
            {file ? file.name : 'Upload Media or Drag & Drop'}
          </h3>
          <p className="text-xs text-[#667085] mt-1 max-w-md mx-auto">
            Supports MP4, MOV, WEBM (Video), JPG, PNG, WEBP (Image), MP3, WAV (Audio). Max 50MB.
          </p>
        </label>

        {previewUrl && (
          <div className="mt-4 flex justify-center">
            <img src={previewUrl} alt="Preview" className="max-h-48 rounded-lg border border-[#DCE3EB] object-cover" />
          </div>
        )}

        {file && (
          <div className="mt-4 inline-flex items-center gap-2 rounded-md bg-[#F5F7FA] px-3 py-1 text-xs text-[#344054] border border-[#DCE3EB]">
            <span>Size: {(file.size / (1024 * 1024)).toFixed(2)} MB</span>
            <span>• Type: {file.type || 'Media'}</span>
          </div>
        )}
      </div>

      {error && (
        <div className="rounded-lg border border-[#F4C4C4] bg-[#FDF1F1] p-3.5 text-xs text-[#C24141] flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0 text-[#C24141]" />
          <span>{error}</span>
        </div>
      )}

      {/* Action Button & Progress */}
      <div className="space-y-3">
        {loading && (
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-[#667085]">
              <span className="flex items-center gap-1.5">
                <Loader2 className="h-3.5 w-3.5 animate-spin text-[#287C78]" />
                Extracting spectral matrices and keyframes...
              </span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-[#DCE3EB] rounded-full h-2 overflow-hidden">
              <div
                className="bg-[#287C78] h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <button
          onClick={handleScan}
          disabled={!file || loading}
          className="w-full rounded-lg bg-[#287C78] hover:bg-[#1f6360] py-3 text-xs sm:text-sm font-semibold text-[#FFFFFF] transition shadow-xs disabled:opacity-40 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Running Media Forensic Engine...
            </>
          ) : (
            'Analyze Media For Manipulations'
          )}
        </button>
      </div>

      {/* Result Card */}
      {result && (
        <ResultCard
          result={result}
          onReset={() => {
            setFile(null);
            setPreviewUrl(null);
            setResult(null);
          }}
        />
      )}
    </div>
  );
};
