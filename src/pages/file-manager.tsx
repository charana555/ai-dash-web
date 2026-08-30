import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { filesApi } from '@/lib/api';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function FileManagerPage() {
  const [currentPath, setCurrentPath] = useState('/');

  const { data: files, isLoading } = useQuery({
    queryKey: ['files', currentPath],
    queryFn: () => filesApi.list(currentPath),
  });

  const navigate = (path: string) => setCurrentPath(path);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">File Manager</h1>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Button variant="ghost" size="sm" onClick={() => navigate('/')}>Root</Button>
        {currentPath.split('/').filter(Boolean).map((part, i, arr) => {
          const path = '/' + arr.slice(0, i + 1).join('/');
          return (
            <span key={path} className="flex items-center gap-2">
              <span>/</span>
              <Button variant="ghost" size="sm" onClick={() => navigate(path)}>{part}</Button>
            </span>
          );
        })}
      </div>

      <Card>
        <CardHeader><CardTitle>{currentPath}</CardTitle></CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : (
            <div className="space-y-1">
              {files?.map((file) => (
                <div
                  key={file.path}
                  className="flex items-center justify-between rounded p-2 hover:bg-accent cursor-pointer"
                  onClick={() => file.type === 'directory' && navigate(file.path)}
                >
                  <div className="flex items-center gap-2">
                    <span>{file.type === 'directory' ? '📁' : '📄'}</span>
                    <span>{file.name}</span>
                  </div>
                  {file.type === 'file' && (
                    <span className="text-xs text-muted-foreground">
                      {(file.size / 1024).toFixed(1)} KB
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
