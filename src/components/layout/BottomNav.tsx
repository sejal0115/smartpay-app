import { Home, Send, ArrowDownLeft, Receipt, CreditCard, User  } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/Index', icon: Home, label: 'Home' },
  // { to: '/send', icon: Send, label: 'Send' },
  // { to: '/request', icon: ArrowDownLeft, label: 'Request' },
  { to: '/transactions', icon: Receipt, label: 'Transactions' },
  { to: '/cards', icon: CreditCard, label: 'Cards' },
  { to: '/profile', icon: User , label: 'Profile' },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t md:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors text-muted-foreground',
                isActive && 'text-primary'
              )
            }
          >
            {({ isActive }) => (
              <>
                <div className={cn('p-1 rounded-lg transition-all', isActive && 'gradient-primary shadow-glow')}>
                  <Icon size={20} className={cn(isActive && 'text-primary-foreground')} />
                </div>
                <span className="text-[10px] font-medium">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
