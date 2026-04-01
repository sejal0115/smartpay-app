import { ReactNode } from 'react';
import { BottomNav } from './BottomNav';
import { DesktopSidebar } from './DesktopSidebar';
import { ThemeToggle } from '../ThemeToggle';

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <div className="flex">
        {/* Desktop sidebar */}
        <DesktopSidebar />
        
        {/* Main content */}
        <main className="flex-1 pb-20 md:pb-0 min-h-screen">
          {/* Top bar with theme toggle */}
          <div className="flex items-center justify-end px-4 py-3 md:px-6">
            <ThemeToggle />
          </div>
          <div className="max-w-2xl mx-auto px-4 pb-6 md:px-6 lg:max-w-4xl">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile bottom nav */}
      <BottomNav />
    </div>
  );
}
