import React, { useState, useRef } from 'react';
import { CreditCard, QrCode, AlertTriangle, Camera, Upload, Loader2, AlertCircle } from 'lucide-react';
import jsQR from 'jsqr';
import { scanUpi, scanQr } from '../services/api';
import type { ScanResult } from '../services/api';
import { ResultCard } from '../components/ResultCard';

export const UpiCheckerPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upi' | 'qr'>('upi');
  const [upiId, setUpiId] = useState('');
  const [payeeName, setPayeeName] = useState('');
  const [qrFile, setQrFile] = useState<File | null>(null);
  const [qrPreview, setQrPreview] = useState<string | null>(null);
  const [decodedQr, setDecodedQr] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<ScanResult | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const QUICK_TESTS = [
    { label: 'Fake Utility Trap', vpa: 'electricity_bill_update@paytm', name: 'Electricity Office' },
    { label: 'Fake Customer Care', vpa: 'customercare_support@okhdfcbank', name: 'HDFC Support Desk' },
    { label: 'Personal Mobile VPA', vpa: '9876543210@paytm', name: 'Rohan Sharma' },
    { label: 'Standard Merchant', vpa: 'naturefresh_grocers@okaxis', name: 'NatureFresh Store' },
  ];

  const handleScanUpi = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!upiId.trim()) {
      setError('Please enter a valid UPI address (e.g. name@bank).');
      return;
    }
    setError('');
    setLoading(true);
    setResult(null);

    try {
      const res = await scanUpi(upiId.trim(), payeeName.trim());
      setResult(res);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'UPI Verification failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleQrUpload = (file: File) => {
    setError('');
    setResult(null);
    setQrFile(file);
    const url = URL.createObjectURL(file);
    setQrPreview(url);

    const img = new Image();
    img.src = url;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, img.width, img.height);
        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        if (code && code.data) {
          setDecodedQr(code.data);
        } else {
          setDecodedQr(null);
        }
      }
    };
  };

  const handleScanQrSubmit = async () => {
    if (!qrFile && !decodedQr) {
      setError('Please upload or scan a QR code image.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const formData = new FormData();
      if (qrFile) formData.append('file', qrFile);
      if (decodedQr) formData.append('qr_data', decodedQr);
      const res = await scanQr(formData);
      setResult(res);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'QR code verification failed.');
    } finally {
      setLoading(false);
    }
  };

  const startCamera = async () => {
    setError('');
    try {
      setCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        requestAnimationFrame(tickCamera);
      }
    } catch (err) {
      setError('Camera access denied or unavailable on this device.');
      setCameraActive(false);
    }
  };

  const tickCamera = () => {
    if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);
          if (code && code.data) {
            setDecodedQr(code.data);
            stopCamera();
            return;
          }
        }
      }
    }
    if (cameraActive) {
      requestAnimationFrame(tickCamera);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
    }
    setCameraActive(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-[#287C78] text-xs font-bold uppercase tracking-wider mb-1">
          <CreditCard className="h-4 w-4" />
          <span>Module 02: Payment Verification</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#172B4D]">
          UPI & QR Safety Checker
        </h1>
        <p className="text-xs sm:text-sm text-[#667085] mt-1">
          Verify payee details, detect impostor customer care handles, and spot collect-request scams before transferring money.
        </p>
      </div>

      {/* Safety Notice */}
      <div className="rounded-xl border border-[#F3DCB5] bg-[#FDF6EC] p-4 flex items-start gap-3">
        <AlertTriangle className="h-4 w-4 text-[#B7791F] shrink-0 mt-0.5" />
        <div className="text-xs text-[#344054] leading-relaxed">
          <span className="font-bold text-[#172B4D]">Important UPI Rule: </span>
          Entering your UPI PIN always <span className="font-semibold text-[#C24141]">DEDUCTS</span> money from your bank account. You NEVER need to enter your UPI PIN or scan a QR code to RECEIVE money.
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#DCE3EB] gap-4">
        <button
          onClick={() => { setActiveTab('upi'); setResult(null); }}
          className={`pb-2.5 text-xs sm:text-sm font-semibold transition border-b-2 flex items-center gap-1.5 ${
            activeTab === 'upi' ? 'border-[#287C78] text-[#287C78]' : 'border-transparent text-[#667085] hover:text-[#172B4D]'
          }`}
        >
          <CreditCard className="h-4 w-4" />
          Verify UPI Address (VPA)
        </button>
        <button
          onClick={() => { setActiveTab('qr'); setResult(null); }}
          className={`pb-2.5 text-xs sm:text-sm font-semibold transition border-b-2 flex items-center gap-1.5 ${
            activeTab === 'qr' ? 'border-[#287C78] text-[#287C78]' : 'border-transparent text-[#667085] hover:text-[#172B4D]'
          }`}
        >
          <QrCode className="h-4 w-4" />
          Decode & Verify QR Code
        </button>
      </div>

      {/* TAB 1: UPI ID Check */}
      {activeTab === 'upi' && (
        <div className="rounded-xl border border-[#DCE3EB] bg-[#FFFFFF] p-6 space-y-4 shadow-xs">
          <form onSubmit={handleScanUpi} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#344054] mb-1">
                Enter UPI ID (Virtual Payment Address)
              </label>
              <input
                type="text"
                required
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="e.g. 9876543210@paytm or electricity_support@okhdfcbank"
                className="w-full rounded-lg border border-[#DCE3EB] bg-[#FFFFFF] px-3.5 py-2.5 text-xs sm:text-sm text-[#172B4D] placeholder-[#667085] focus:border-[#287C78] focus:outline-none focus:ring-1 focus:ring-[#287C78]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#344054] mb-1">
                Claimed Payee / Business Name (Optional)
              </label>
              <input
                type="text"
                value={payeeName}
                onChange={(e) => setPayeeName(e.target.value)}
                placeholder="e.g. State Electricity Board or OLX Buyer"
                className="w-full rounded-lg border border-[#DCE3EB] bg-[#FFFFFF] px-3.5 py-2.5 text-xs sm:text-sm text-[#172B4D] placeholder-[#667085] focus:border-[#287C78] focus:outline-none focus:ring-1 focus:ring-[#287C78]"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !upiId.trim()}
              className="w-full rounded-lg bg-[#287C78] hover:bg-[#1f6360] py-3 text-xs sm:text-sm font-semibold text-[#FFFFFF] transition shadow-xs disabled:opacity-40 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Inspecting PSP & Threat Signatures...
                </>
              ) : (
                'Run UPI Safety Scan'
              )}
            </button>
          </form>

          {/* Quick Test Chips */}
          <div className="pt-3 border-t border-[#DCE3EB]">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085] block mb-2">
              Sample Test Scenarios:
            </span>
            <div className="flex flex-wrap gap-2">
              {QUICK_TESTS.map((t, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setUpiId(t.vpa);
                    setPayeeName(t.name);
                  }}
                  className="rounded-md border border-[#DCE3EB] bg-[#F5F7FA] px-2.5 py-1 text-xs text-[#344054] hover:border-[#287C78] hover:text-[#287C78] transition"
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: QR Code Check */}
      {activeTab === 'qr' && (
        <div className="rounded-xl border border-[#DCE3EB] bg-[#FFFFFF] p-6 space-y-4 shadow-xs">
          {cameraActive ? (
            <div className="text-center space-y-3">
              <div className="relative mx-auto max-w-sm rounded-xl overflow-hidden border-2 border-[#287C78]">
                <video ref={videoRef} className="w-full h-64 object-cover" />
                <canvas ref={canvasRef} className="hidden" />
              </div>
              <button
                type="button"
                onClick={stopCamera}
                className="px-4 py-2 rounded-lg bg-[#FDF1F1] border border-[#F4C4C4] text-[#C24141] text-xs font-semibold"
              >
                Stop Camera Scanner
              </button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Upload QR File */}
              <div className="rounded-xl border-2 border-dashed border-[#DCE3EB] p-6 text-center hover:border-[#287C78] transition cursor-pointer">
                <input
                  type="file"
                  id="qrUpload"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleQrUpload(e.target.files[0])}
                />
                <label htmlFor="qrUpload" className="cursor-pointer block">
                  <Upload className="h-7 w-7 text-[#287C78] mx-auto mb-2" />
                  <span className="text-xs font-bold text-[#172B4D] block">Upload QR Code Image</span>
                  <span className="text-[11px] text-[#667085]">PNG, JPG, or Screenshots</span>
                </label>
                {qrPreview && (
                  <img src={qrPreview} alt="QR" className="mt-3 max-h-32 mx-auto rounded-lg border border-[#DCE3EB]" />
                )}
              </div>

              {/* Live Device Camera Scan */}
              <div className="rounded-xl border-2 border-dashed border-[#DCE3EB] p-6 text-center hover:border-[#287C78] transition flex flex-col justify-center items-center">
                <Camera className="h-7 w-7 text-[#287C78] mb-2" />
                <span className="text-xs font-bold text-[#172B4D] block">Scan via Camera</span>
                <span className="text-[11px] text-[#667085] mb-3">Live camera decoding</span>
                <button
                  type="button"
                  onClick={startCamera}
                  className="px-3.5 py-1.5 rounded-lg bg-[#EBF4F3] border border-[#DCE3EB] text-[#287C78] text-xs font-semibold hover:bg-[#287C78] hover:text-[#FFFFFF] transition"
                >
                  Start Camera
                </button>
              </div>
            </div>
          )}

          {decodedQr && (
            <div className="rounded-lg border border-[#DCE3EB] bg-[#F5F7FA] p-3 text-xs text-[#344054]">
              <span className="font-bold text-[#172B4D] block mb-1">Decoded QR Intent:</span>
              <p className="font-mono text-[11px] break-all">{decodedQr}</p>
            </div>
          )}

          <button
            onClick={handleScanQrSubmit}
            disabled={loading || (!qrFile && !decodedQr)}
            className="w-full rounded-lg bg-[#287C78] hover:bg-[#1f6360] py-3 text-xs sm:text-sm font-semibold text-[#FFFFFF] transition shadow-xs disabled:opacity-40 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Validating Merchant & QR Intent...
              </>
            ) : (
              'Verify QR Code Security'
            )}
          </button>
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-[#F4C4C4] bg-[#FDF1F1] p-3.5 text-xs text-[#C24141] flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0 text-[#C24141]" />
          <span>{error}</span>
        </div>
      )}

      {/* Result Card */}
      {result && (
        <ResultCard
          result={result}
          onReset={() => {
            setUpiId('');
            setPayeeName('');
            setQrFile(null);
            setQrPreview(null);
            setDecodedQr(null);
            setResult(null);
          }}
        />
      )}
    </div>
  );
};
