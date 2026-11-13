import axios from 'axios';
import {
  localSignup,
  localLogin,
  localGetSimulatorScenarios,
  localSubmitSimulatorAnswer,
  localScanUpi,
  localScanQr,
  localScanUrl,
  localScanMessage,
  localScanDeepfake,
  localGetDashboardStats,
  localGetScanHistory,
  localGetScanReport,
} from './localEngine';

const api = axios.create({
  baseURL: '/api',
  timeout: 5000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('redflag_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface ScanResult {
  scan_id: string;
  risk_level: 'LOW' | 'MEDIUM' | 'HIGH';
  confidence_score: number;
  detected_indicators: string[];
  explanation_en: string;
  explanation_hi: string;
  recommended_actions: string[];
  limitations: string;
  [key: string]: any;
}

// ----------------------------------------------------------------------
// UPI Scanner
// ----------------------------------------------------------------------
export const scanUpi = async (upi_id: string, payee_name?: string): Promise<ScanResult> => {
  try {
    const res = await api.post('/scan/upi', { upi_id, payee_name });
    return res.data;
  } catch {
    return localScanUpi(upi_id, payee_name);
  }
};

// ----------------------------------------------------------------------
// QR Scanner
// ----------------------------------------------------------------------
export const scanQr = async (formData: FormData): Promise<ScanResult> => {
  try {
    const res = await api.post('/scan/qr', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  } catch {
    const rawText =
      (formData.get('qr_data') as string) ||
      (formData.get('raw_text') as string) ||
      (formData.get('qr_content') as string) ||
      '';
    if (rawText) {
      return localScanQr(rawText);
    }
    const file = formData.get('file') as File;
    const fallbackText = file ? `upi://pay?pa=merchant_${file.name.replace(/[^a-zA-Z0-9]/g, '')}@okaxis&pn=Merchant` : 'upi://pay?pa=store@okaxis';
    return localScanQr(fallbackText);
  }
};

// ----------------------------------------------------------------------
// URL Phishing Scanner
// ----------------------------------------------------------------------
export const scanUrl = async (url: string): Promise<ScanResult> => {
  try {
    const res = await api.post('/scan/url', { url });
    return res.data;
  } catch {
    return localScanUrl(url);
  }
};

// ----------------------------------------------------------------------
// Message & Voice Analyzer
// ----------------------------------------------------------------------
export const scanMessage = async (formData: FormData): Promise<ScanResult> => {
  try {
    const res = await api.post('/scan/message', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  } catch {
    const text = (formData.get('text') as string) || (formData.get('content') as string) || '';
    const file = formData.get('file') as File;
    const input = text || (file ? `Audio file inspection: ${file.name}` : 'Unknown message');
    return localScanMessage(input);
  }
};

// ----------------------------------------------------------------------
// Deepfake Scanner
// ----------------------------------------------------------------------
export const scanDeepfake = async (formData: FormData): Promise<ScanResult> => {
  try {
    const res = await api.post('/scan/deepfake', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  } catch {
    const file = formData.get('file') as File;
    const fileName = file ? file.name : 'uploaded_sample.mp4';
    const fileSize = file ? file.size : 1024 * 512;
    const fileType = file ? file.type : 'video/mp4';
    return localScanDeepfake(fileName, fileSize, fileType);
  }
};

// ----------------------------------------------------------------------
// Dashboard Stats
// ----------------------------------------------------------------------
export const getDashboardStats = async () => {
  try {
    const res = await api.get('/dashboard/stats');
    return res.data;
  } catch {
    return localGetDashboardStats();
  }
};

// ----------------------------------------------------------------------
// Scan History
// ----------------------------------------------------------------------
export const getScanHistory = async (params?: { scan_type?: string; risk_level?: string; search?: string }) => {
  try {
    const res = await api.get('/scan/history', { params });
    return res.data;
  } catch {
    return localGetScanHistory(params);
  }
};

// ----------------------------------------------------------------------
// Scan Report
// ----------------------------------------------------------------------
export const getScanReport = async (scan_id: string) => {
  try {
    const res = await api.get(`/scan/report/${scan_id}`);
    return res.data;
  } catch {
    return localGetScanReport(scan_id);
  }
};

// ----------------------------------------------------------------------
// Simulator Scenarios
// ----------------------------------------------------------------------
export const getSimulatorScenarios = async (level?: string) => {
  try {
    const res = await api.get('/simulator/scenarios', { params: { level } });
    if (res.data && Array.isArray(res.data) && res.data.length > 0) {
      return res.data;
    }
    return localGetSimulatorScenarios(level);
  } catch {
    return localGetSimulatorScenarios(level);
  }
};

// ----------------------------------------------------------------------
// Simulator Submit
// ----------------------------------------------------------------------
export const submitSimulatorAnswer = async (scenario_id: string, selected_option_index: number) => {
  try {
    const res = await api.post('/simulator/submit', { scenario_id, selected_option_index });
    return res.data;
  } catch {
    return localSubmitSimulatorAnswer(scenario_id, selected_option_index);
  }
};

// ----------------------------------------------------------------------
// Auth: Login & Signup
// ----------------------------------------------------------------------
export const loginUser = async (credentials: { email: string; password: string }) => {
  try {
    const res = await api.post('/auth/login', credentials);
    return res.data;
  } catch (err: any) {
    // If backend is not available (404/network error), use local auth
    if (!err.response || err.response.status === 404 || err.response.status >= 500 || err.code === 'ERR_NETWORK') {
      return localLogin(credentials);
    }
    throw err;
  }
};

export const signupUser = async (data: { email: string; password: string; full_name?: string }) => {
  try {
    const res = await api.post('/auth/signup', data);
    return res.data;
  } catch (err: any) {
    if (!err.response || err.response.status === 404 || err.response.status >= 500 || err.code === 'ERR_NETWORK') {
      return localSignup(data);
    }
    throw err;
  }
};

export default api;
