import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/lib/auth-store';
import { Button } from '@/components/ui/button';
import { Book, DollarSign, FolderOpen, LogOut } from 'lucide-react';

export function Layout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { to: '/wiki', label: 'Wiki', icon: Book },
    { to: '/finance', label: 'Finance', icon: DollarSign },
    { to: '/files', label: 'Files', icon: FolderOpen },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="flex w-64 flex-col border-r bg-secondary">
        <div className="p-6">
          <h1 className="text-xl font-bold">ai-dash</h1>
          <p className="text-xs text-muted-foreground">Personal Control Center</p>
        </div>
        <nav className="flex-1 space-y-1 px-3">
          {navItems.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent"
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="border-t p-4">
          <p className="mb-2 text-xs text-muted-foreground">{user?.email}</p>
          <Button variant="ghost" size="sm" className="w-full" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
