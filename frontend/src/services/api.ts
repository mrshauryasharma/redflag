import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 30000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('redflag_token') || localStorage.getItem('scam_shield_token');
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

export const scanUpi = async (upi_id: string, payee_name?: string): Promise<ScanResult> => {
  const res = await api.post('/scan/upi', { upi_id, payee_name });
  return res.data;
};

export const scanQr = async (formData: FormData): Promise<ScanResult> => {
  const res = await api.post('/scan/qr', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

export const scanUrl = async (url: string): Promise<ScanResult> => {
  const res = await api.post('/scan/url', { url });
  return res.data;
};

export const scanMessage = async (formData: FormData): Promise<ScanResult> => {
  const res = await api.post('/scan/message', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

export const scanDeepfake = async (formData: FormData): Promise<ScanResult> => {
  const res = await api.post('/scan/deepfake', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

export const getDashboardStats = async () => {
  const res = await api.get('/dashboard/stats');
  return res.data;
};

export const getScanHistory = async (params?: { scan_type?: string; risk_level?: string; search?: string }) => {
  const res = await api.get('/scan/history', { params });
  return res.data;
};

export const getScanReport = async (scan_id: string) => {
  const res = await api.get(`/scan/report/${scan_id}`);
  return res.data;
};

export const getSimulatorScenarios = async (level?: string) => {
  const res = await api.get('/simulator/scenarios', { params: { level } });
  return res.data;
};

export const submitSimulatorAnswer = async (scenario_id: string, selected_option_index: number) => {
  const res = await api.post('/simulator/submit', { scenario_id, selected_option_index });
  return res.data;
};

export const loginUser = async (credentials: { email: string; password: string }) => {
  const res = await api.post('/auth/login', credentials);
  return res.data;
};

export const signupUser = async (data: { email: string; password: string; full_name?: string }) => {
  const res = await api.post('/auth/signup', data);
  return res.data;
};

export default api;
