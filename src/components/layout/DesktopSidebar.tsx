import { Home, Send, ArrowDownLeft, PiggyBank, CreditCard, Receipt, SplitSquareVertical, Wallet, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/Index', icon: Home, label: 'Dashboard' },
  { to: '/send', icon: Send, label: 'Send Money' },
  { to: '/request', icon: ArrowDownLeft, label: 'Request' },
  { to: '/split', icon: SplitSquareVertical, label: 'Split Bills' },
  { to: '/savings', icon: PiggyBank, label: 'Savings' },
  { to: '/cards', icon: CreditCard, label: 'Cards' },
  { to: '/transactions', icon: Receipt, label: 'Transactions' },
];

export function DesktopSidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 min-h-screen border-r bg-card p-6 sticky top-0">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
          <Wallet size={20} className="text-primary-foreground" />
        </div>
        <span className="text-xl font-bold text-foreground">SmartPay</span>
      </div>

      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all',
                isActive
                  ? 'gradient-primary text-primary-foreground shadow-glow'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )
            }
          >
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <NavLink
        to="/profile"
        className={({ isActive }) =>
          cn(
            'flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all',
            isActive
              ? 'gradient-primary text-primary-foreground'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground'
          )
        }
      >
        <User size={18} />
        <span>Profile</span>
      </NavLink>
    </aside>
  );
}
