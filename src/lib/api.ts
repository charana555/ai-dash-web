const API_BASE = '/api';

function getAuthHeader(): Record<string, string> {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json();
}

export const api = {
  get: <T>(endpoint: string) => request<T>(endpoint),
  post: <T>(endpoint: string, data?: any) =>
    request<T>(endpoint, { method: 'POST', body: data ? JSON.stringify(data) : undefined }),
  put: <T>(endpoint: string, data?: any) =>
    request<T>(endpoint, { method: 'PUT', body: data ? JSON.stringify(data) : undefined }),
  delete: <T>(endpoint: string) => request<T>(endpoint, { method: 'DELETE' }),
};

// --- Auth ---
export const authApi = {
  login: (email: string, password: string) =>
    api.post<{ accessToken: string; refreshToken: string; user: any }>('/auth/login', { email, password }),
  signup: (email: string, name: string, password: string) =>
    api.post<{ accessToken: string; refreshToken: string; user: any }>('/auth/signup', { email, name, password }),
};

// --- Wiki ---
export const wikiApi = {
  list: () => api.get<any[]>('/wiki'),
  tree: () => api.get<any[]>('/wiki/tree'),
  get: (slug: string) => api.get<any>(`/wiki/${slug}`),
  create: (data: any) => api.post<any>('/wiki', data),
  update: (slug: string, data: any) => api.put<any>(`/wiki/${slug}`, data),
  delete: (slug: string) => api.delete(`/wiki/${slug}`),
};

// --- Finance ---
export const financeApi = {
  accounts: () => api.get<any[]>('/finance/accounts'),
  createAccount: (data: any) => api.post<any>('/finance/accounts', data),
  categories: (type?: string) => api.get<any[]>(`/finance/categories${type ? `?type=${type}` : ''}`),
  transactions: (params?: Record<string, string>) => {
    const query = params ? `?${new URLSearchParams(params).toString()}` : '';
    return api.get<any[]>(`/finance/transactions${query}`);
  },
  createTransaction: (data: any) => api.post<any>('/finance/transactions', data),
  deleteTransaction: (id: string) => api.delete(`/finance/transactions/${id}`),
  summary: (from?: string, to?: string) => {
    const params = new URLSearchParams();
    if (from) params.set('from', from);
    if (to) params.set('to', to);
    const query = params.toString() ? `?${params.toString()}` : '';
    return api.get<any>(`/finance/summary${query}`);
  },
};

// --- File Manager ---
export const filesApi = {
  list: (path: string = '/') => api.get<any[]>(`/files/list?path=${encodeURIComponent(path)}`),
  move: (sourcePath: string, destPath: string) =>
    api.post<any>('/files/move', { sourcePath, destPath }),
  transfers: () => api.get<any[]>('/files/transfers'),
};
