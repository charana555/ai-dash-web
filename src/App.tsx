import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/lib/auth-store';
import { Layout } from '@/components/layout';
import { LoginPage } from '@/pages/login';
import { WikiPage, WikiPageDetail } from '@/pages/wiki';
import { FinancePage } from '@/pages/finance';
import { FileManagerPage } from '@/pages/file-manager';

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.token !== null);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Navigate to="/wiki" />} />
            <Route path="/wiki" element={<WikiPage />} />
            <Route path="/wiki/:slug" element={<WikiPageDetailWithParam />} />
            <Route path="/finance" element={<FinancePage />} />
            <Route path="/files" element={<FileManagerPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

function WikiPageDetailWithParam() {
  const slug = window.location.pathname.split('/').pop() || '';
  return <WikiPageDetail slug={slug} />;
}
